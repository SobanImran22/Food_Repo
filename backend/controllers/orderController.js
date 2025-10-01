import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ✅ Place order
const placeOrder = async (req,res)=>{
    const frontend_url= "http://localhost:5173"; 
    
    try {
        // Line items bana rahe hain stripe checkout ke liye
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"gbp",
                product_data:{ name:item.name },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }));

        // Delivery charges add kar diye
        line_items.push({
            price_data:{
                currency:"gbp",
                product_data:{ name:"Delivery Charges" },
                unit_amount:2*100
            },
            quantity:1
        });

        // ✅ Pehle stripe session create karo
        const session = await stripe.checkout.sessions.create({
            line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true`,
            cancel_url:`${frontend_url}/verify?success=false`
        });

        // ✅ Ab order create karo stripeSessionId ke sath
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
            stripeSessionId: session.id   // required field ab save ho jayegi
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        res.json({success:true,session_url:session.url});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

// ✅ Order verify karne ka kaam
const verifyOrder = async (req,res)=>{
    const { orderId } = req.body; 
    try {
        const order = await orderModel.findById(orderId);

        if (!order || !order.stripeSessionId) {
            await orderModel.findByIdAndDelete(orderId);
            return res.json({ success: false, message: "Order not found or missing session ID" });
        }

        const session = await stripe.checkout.sessions.retrieve(order.stripeSessionId);

        if (session.payment_status === 'paid') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true, status: "Processing" });
            res.json({success:true,message:"Payment Verified & Paid"})
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Payment Failed or Cancelled"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error during verification"});
    }
}

// ✅ User ke orders
const userOrders = async (req,res)=>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

// ✅ Admin ke liye list of all orders
const listOrders = async (req,res)=>{
    try {
        const orders =await orderModel.find({});
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// ✅ Order status update karna (admin panel se)
const updateStatus = async (req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}

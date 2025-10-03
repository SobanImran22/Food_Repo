import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
// add with other imports
import uploadRoute from "./routes/upload.js";



const app = express()
const port =4000

app.use(express.json())
app.use(cors())

// DB  Connection
connectDB();


// api endpoint
 app.use("/api/food",foodRouter)
 app.use("/images",express.static('uploads'))
 app.use("/api/user",userRouter)
 app.use("/api/cart",cartRouter)
 app.use("/api/order",orderRouter)

 // add upload route here
app.use("/api/upload", uploadRoute);

// optional error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

app.get("/",(req,res)=>{
    res.send("API Working ")
})

app.listen(port,()=>{
    console.log(`Server Started on http://localhost:${port}`)
})

//mongodb+srv://sajidrehan:<password>@cluster0.gbmkpac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
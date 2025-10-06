import foodModel from "../models/foodModel.js";

// add food
const addFood = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (!name || !description || !price || !category || !image) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const food = new foodModel({
      name,
      description,
      price,
      category,
      image, // 👈 ab yahan Cloudinary ka URL save hoga
    });

    await food.save();
    res.json({ success: true, message: "Food Added", food });
  } catch (error) {
    console.log("Add Food Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// All food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};





// ✅ Fix prices with rounding safely
const fixPrices = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods || foods.length === 0) {
      return res.json({ success: false, message: "No products found" });
    }

    for (let food of foods) {
      // check if price is a number
      if (typeof food.price === "number") {
        food.price = parseFloat(food.price.toFixed(2));
        await food.save();
      }
    }

    res.json({ success: true, message: "✅ All product prices fixed to 2 decimals!" });
  } catch (error) {
    console.error("Error fixing prices:", error);
    res.status(500).json({ success: false, message: error.message || "Error fixing prices" });
  }
};


export { addFood, listFood, removeFood, fixPrices };

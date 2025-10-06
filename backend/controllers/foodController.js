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





const fixPrices = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    if (!foods || foods.length === 0) {
      return res.json({ success: false, message: "No products found" });
    }

    let updatedCount = 0;

    for (let food of foods) {
      if (typeof food.price === "number") {
        const newPrice = parseFloat(food.price.toFixed(2));
        if (newPrice !== food.price) {
          console.log(`Fixing ${food.name}: ${food.price} → ${newPrice}`);
          food.price = newPrice;
          await food.save();
          updatedCount++;
        }
      }
    }

    res.json({
      success: true,
      message: `✅ Prices fixed for ${updatedCount} products!`,
    });
  } catch (error) {
    console.error("Error fixing prices:", error);
    res
      .status(500)
      .json({ success: false, message: error.message || "Error fixing prices" });
  }
};



export { addFood, listFood, removeFood, fixPrices };

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Controller function
export const uploadImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const file = req.files.image;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      folder: "food_repo",
    });

    // Delete temp file
    fs.unlinkSync(file.tempFilePath);

    res.json({ url: result.secure_url }); // 👈 return permanent URL
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Image upload failed", error: err.message });
  }
};

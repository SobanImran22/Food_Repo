// backend/controllers/uploadController.js
import cloudinary from "cloudinary";

export const uploadImage = async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const result = await cloudinary.v2.uploader.upload(req.files.image.tempFilePath, {
      folder: "food_repo",
    });

    res.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
};

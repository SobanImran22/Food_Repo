import express from "express";
import upload from "../utils/upload.js";

const router = express.Router();

router.post("/", upload.single("image"), (req, res) => {
  res.json({ url: req.file.path }); // Cloudinary ka permanent URL
});

export default router;

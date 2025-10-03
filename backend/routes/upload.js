// backend/routes/upload.js
import express from "express";
import { uploadImage } from "../controllers/uploadController.js";
import fileUpload from "express-fileupload";

const router = express.Router();

// enable file upload
router.use(fileUpload({
  useTempFiles: true
}));

// POST /api/upload
router.post("/", uploadImage);

export default router;

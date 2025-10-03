import express from "express";
import fileUpload from "express-fileupload";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

// fileUpload middleware
router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// POST /api/upload
router.post("/", uploadImage);

export default router;

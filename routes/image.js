import express from "express";
const router = express.Router();
import {
  getImages,
  getAllCharactersForImage,
} from "../controllers/imageController.js";

router.get("/", getImages);

router.get("/:id", getAllCharactersForImage);

export default router;

import express from "express";
const router = express.Router();
import { checkCoordinates } from "../controllers/characterController.js";


router.post("/", checkCoordinates )






export default router;

import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello characters route")
});






export default router;

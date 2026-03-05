import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/admincontrollers.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

/* Admin Register */
router.post("/register", registerAdmin);

/* Admin Login */
router.post("/login", loginAdmin);

/* Protected Route Example (Test) */
router.get("/profile", protect, (req, res) => {
  res.json(req.admin);
});

export default router;
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import adminRoutes from "./routes/adminRouter.js";
import itemRoutes from "./routes/itemRouter.js";

dotenv.config();
connectDB();

const app = express();

/* ---------- MIDDLEWARE ---------- */

app.use(cors()); // allow all origins
app.use(express.json());

/* serve uploaded images */
app.use("/uploads", express.static("uploads"));

/* ---------- ROUTES ---------- */

app.use("/api/admin", adminRoutes);
app.use("/api", itemRoutes);

/* test route */
app.get("/", (req, res) => {
  res.send("Lost & Found Backend Running");
});

/* ---------- SERVER ---------- */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
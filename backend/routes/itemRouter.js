// import express from "express";
// import multer from "multer";
// import Item from "../models/item.js";

// const router = express.Router();

// /* ================= MULTER SETUP ================= */

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // folder to store images
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   }
// });

// const upload = multer({ storage });

// /* ================= GET ALL ITEMS ================= */

// router.get("/items", async (req, res) => {
//   try {
//     const items = await Item.find();
//     res.json(items);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// /* ================= REPORT LOST ITEM ================= */

// router.post("/lost", upload.single("image"), async (req, res) => {
//   try {

//     const { category, description, contact } = req.body;

//     const item = new Item({
//       type: "lost",
//       category,
//       description,
//       contact,
//       image: req.file ? req.file.filename : null
//     });

//     await item.save();

//     res.json({
//       message: "Lost item reported successfully",
//       item
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// /* ================= REPORT FOUND ITEM ================= */

// router.post("/found", upload.single("image"), async (req, res) => {
//   try {

//     const { location, description, contact } = req.body;

//     const item = new Item({
//       type: "found",
//       category: "unknown",
//       location,
//       description,
//       contact,
//       image: req.file ? req.file.filename : null
//     });

//     await item.save();

//     res.json({
//       message: "Found item reported successfully",
//       item
//     });

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// export default router;
import express from "express";
import multer from "multer";
import Item from "../models/item.js";

const router = express.Router();

/* ---------- MULTER SETUP ---------- */

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* ---------- GET ALL ITEMS ---------- */

router.get("/items", async (req, res) => {
  try {

    const items = await Item.find();

    res.json(items);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ---------- REPORT LOST ITEM (IMAGE OPTIONAL) ---------- */

router.post("/lost", upload.single("image"), async (req, res) => {

  try {

    const { category, description, contact } = req.body;

    const item = new Item({
      type: "lost",
      category,
      description,
      contact,
      image: req.file ? req.file.filename : null
    });

    await item.save();

    res.json({
      message: "Lost item reported successfully",
      item
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

/* ---------- REPORT FOUND ITEM (IMAGE REQUIRED) ---------- */

router.post("/found", upload.single("image"), async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({ message: "Image is required for found item" });
    }

    const { location, description, contact } = req.body;

    const item = new Item({
      type: "found",
      category: "unknown",
      location,
      description,
      contact,
      image: req.file.filename
    });

    await item.save();

    res.json({
      message: "Found item reported successfully",
      item
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

});

export default router;
import Admin from "../models/AdminModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ================= REGISTER ADMIN ================= */
const registerAdmin = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    /* Hash password */
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* ================= LOGIN ADMIN ================= */
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    /* Compare password */
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    /* Generate JWT token */
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Admin logged in successfully",
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { registerAdmin, loginAdmin };
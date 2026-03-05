import jwt from "jsonwebtoken";
import Admin from "../models/AdminModel.js";

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.admin = await Admin.findById(decoded.id).select("-password");

      next();
    } else {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

  } catch (error) {
    return res.status(401).json({ message: "Not authorized" });
  }
};

export default protect;
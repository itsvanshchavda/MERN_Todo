import jwt from "jsonwebtoken";
import { UserData } from "../models/userData.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Please, login first" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = await UserData.findById(decoded._id);

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please login again" });
    }

    console.error("Error authenticating user:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

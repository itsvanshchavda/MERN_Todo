import { UserData } from "../models/userData.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import ErrorHandler from "../middleware/error.js";

//get login users
export const getMyProfile = (req, res) => {
  res.status(200).json({
    message: true,
    user: req.user,
  });
};
//getById function

export const getById = async (req, res) => {};

//registerUser function

export const registerUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    let user = await UserData.findOne({ email, password });

    if (user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await UserData.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    });

    return res.status(200).json({
      success: true,
      message: "User Created",
      token,
    });
  } catch (error) {
    next(error);
  }
};

//login function
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await UserData.findOne({ email });

    if (!user) {
      return next(new ErrorHandler("Register First", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return next(new ErrorHandler("Invalid password or username", 400));
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_KEY);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    });

    return res.status(200).json({
      success: true,
      message: "Welcome " + user.name,
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
    });
};

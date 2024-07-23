import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { signupSchema } from "../validate/auth";
import { comparePassword, hassPassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

export const signup = async (req, res) => {
  const { email, password, name, avatar } = req.body;
  const { error } = signupSchema.validate(req.body, { abortEarly: false });
  console.log(error);
  if (error) {
    const messages = error.details.map((item) => item.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      messages,
    });
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      messages: ["Email đã tồn tại"],
    });
  }

  const hashedPassword = await hassPassword(password);
  if (!hashedPassword) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      messages: ["Mã hóa mật khẩu lỗi"],
    });
  }
  const role = (await User.countDocuments({})) === 0 ? "admin" : "user";

  const user = await User.create({
    ...req.body,
    password: hashedPassword,
    role,
  });
  user.password = undefined;
  return res.status(StatusCodes.CREATED).json({
    success: true,
    user,
    message: "Đăng ký thành công",
  });
};
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        messages: ["Email không tồn tại"],
      });
    }

    const isMatch = await comparePassword(password, existUser.password);
    if (!isMatch) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        messages: ["Mật khẩu không chính xác"],
      });
    }

    const token = generateToken({ _id: existUser._id }, "100d");
    existUser.password = undefined;

    return res.status(StatusCodes.OK).json({
      success: true,
      user: existUser,
      accessToken: token,
      message: "Đăng Nhập thành công",
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      messages: ["Đăng Nhập thất bại"],
    });
  }
};
export const logout = async (req, res) => {};

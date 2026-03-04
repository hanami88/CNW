import type { Request, Response } from "express";
import { pool } from "../db/connectDB.js";
import jwt from "jsonwebtoken";
import { ENV } from "../../../env.js";
const JWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, ENV.SECRET_KEY) as { userId: string };
    return decoded.userId;
  } catch (error) {
    console.log("hethan");
    return null;
  }
};
class HomePage {
  login = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      if (!username.trim()) {
        return res.json({
          message: "Vui Lòng Nhập Username",
        });
      }
      if (!password.trim()) {
        return res.json({
          message: "Vui Lòng Nhập Password",
        });
      }
      const [curUser]: any = await pool.execute(
        `SELECT * FROM THANHVIEN WHERE TenDangNhap=?`,
        [username],
      );
      if (curUser.length <= 0) {
        return res.json({
          message: "Tên đăng nhập không tồn tại",
          success: false,
        });
      }
      if (curUser[0].MatKhau != password) {
        return res.json({
          message: "Sai mật khẩu",
          success: false,
        });
      }
      const accessToken = jwt.sign(
        {
          userId: curUser[0].MaTV,
        },
        ENV.SECRET_KEY,
        {
          expiresIn: "15m",
        },
      );
      const refreshToken = jwt.sign(
        {
          userId: curUser[0].MaTV,
        },
        ENV.SECRET_KEY,
        {
          expiresIn: "15d",
        },
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });
      const [curListTour]: any = await pool.execute("SELECT * FROM TOUR");
      return res.json({
        message: "Đăng Nhập Thành Công",
        success: true,
        refreshToken,
        accessToken,
        user: curUser[0],
        listTour: curListTour,
      });
    } catch (err) {
      return res.json({
        message: "Lỗi đăng nhập",
        success: false,
      });
    }
  };
  register = async (req: Request, res: Response) => {
    try {
      const {
        username,
        password,
        full_name,
        birthday,
        address,
        email,
        phone,
        gender,
      } = req.body;
      const fields = {
        username,
        password,
        full_name,
        birthday,
        address,
        email,
        phone,
        gender,
      };
      for (const [key, value] of Object.entries(fields)) {
        if (!value?.trim()) {
          return res.json({
            message: `Vui Lòng Nhập ${key}`,
            success: false,
          });
        }
      }
      const [checkUsername]: any = await pool.execute(
        `SELECT EXISTS(
      SELECT 1 FROM THANHVIEN WHERE TenDangNhap = ?
  ) AS isExist`,
        [username],
      );
      if (checkUsername[0].isExist === 1) {
        return res.json({
          message: "Tên đăng nhập đã tồn tại",
          success: false,
        });
      } else if (password.length < 6) {
        return res.json({
          message: "Mật khẩu phải có ít nhất 6 kí tự",
          success: false,
        });
      }
      await pool.execute(
        `INSERT INTO THANHVIEN 
  (TenDangNhap, MatKhau, TenTV, NgaySinh, DiaChi, Email, SoDienThoai, GioiTinh)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          username,
          password,
          full_name,
          birthday,
          address,
          email,
          phone,
          gender,
        ],
      );
      return res.json({
        message: "Đăng ký thành công",
        success: true,
      });
    } catch (err) {
      console.log("Lỗi đăng ký:", err);
      return res.json({
        message: "Đăng ký thất bại",
        success: false,
      });
    }
  };
  checkUser = async (req: Request, res: Response) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return res.json({
          message: "Chưa Đăng Nhập",
          success: false,
        });
      }
      const userId = JWT(refreshToken);
      const [curUser]: any = await pool.execute(
        "SELECT * FROM THANHVIEN WHERE MaTV=?",
        [userId ?? null],
      );
      const newAccessToken = jwt.sign(
        {
          userId: userId,
        },
        ENV.SECRET_KEY,
        {
          expiresIn: "15m",
        },
      );
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 15 * 60 * 1000,
      });
      const [curListTour]: any = await pool.execute("SELECT * FROM TOUR");
      return res.json({
        success: true,
        user: curUser[0],
        listTour: curListTour,
      });
    } else {
      const userId = JWT(accessToken);
      const [curUser]: any = await pool.execute(
        "SELECT * FROM THANHVIEN WHERE MaTV=?",
        [userId],
      );
      const [curListTour]: any = await pool.execute("SELECT * FROM TOUR");
      return res.json({
        success: true,
        user: curUser[0],
        listTour: curListTour,
      });
    }
  };
  logout = async (req: Request, res: Response) => {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      return res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
}
export default new HomePage();

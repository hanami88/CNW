import type { Request, Response } from "express";
import { pool } from "../db/connectDB.js";
import jwt from "jsonwebtoken";
import { ENV } from "../../../env.js";
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
      const [user]: any = await pool.execute(
        `SELECT * FROM THANHVIEN WHERE TenDangNhap=?`,
        [username],
      );
      if (user.length <= 0) {
        return res.json({
          message: "Tên đăng nhập không tồn tại",
          success: false,
        });
      }
      if (user[0].MatKhau != password) {
        return res.json({
          message: "Sai mật khẩu",
          success: false,
        });
      }
      console.log();
      const accessToken = jwt.sign(
        {
          userId: user[0].MaTV,
        },
        ENV.SECRET_KEY,
        {
          expiresIn: "15m",
        },
      );
      const refreshToken = jwt.sign(
        {
          userId: user[0].MaTV,
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
        maxAge: 15 * 60 * 1000,
      });
      return res.json({
        message: "Đăng Nhập Thành Công",
        success: true,
        refreshToken,
        accessToken,
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
      const decoded = jwt.verify(refreshToken, ENV.SECRET_KEY) as {
        userId: string;
      };
      const userId = decoded.userId;
      const [curUser]: any = await pool.execute(
        "SELECT * FROM THANHVIEN WHERE MaTV=?",
        [userId ?? null],
      );
      const newAccessToken = jwt.sign(
        {
          id: userId,
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
      return res.json({
        success: true,
        user: curUser[0],
      });
    } else {
      const decoded = jwt.verify(accessToken, ENV.SECRET_KEY) as {
        userId: string;
      };
      const userId = decoded.userId;
      const [curUser]: any = await pool.execute(
        "SELECT * FROM THANHVIEN WHERE MaTV=?",
        [userId],
      );
      return res.json({
        success: true,
        user: curUser[0],
      });
    }
  };
}
export default new HomePage();

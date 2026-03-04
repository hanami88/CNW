import type { Request, Response } from "express";
import { pool } from "../db/connectDB.js";
import { ENV } from "../../../env.js";
import jwt from "jsonwebtoken";
const JWT = (token: string) => {
  try {
    const decoded = jwt.verify(token, ENV.SECRET_KEY) as { userId: string };
    return decoded.userId;
  } catch (error) {
    return null;
  }
};
class MemberController {
  createTour = async (req: Request, res: Response) => {
    try {
      const {
        name,
        place,
        date_start,
        date_end,
        date_over,
        numberOfMembers,
        travel,
        cost,
        tour,
        phamvi,
      } = req.body;
      const userId = JWT(req.cookies.accessToken);
      const [MaPV]: any = await pool.execute(
        `SELECT MaPV FROM PHAMVI WHERE TenPV=?`,
        [phamvi],
      );
      const [MaLoai]: any = await pool.execute(
        `SELECT MaLoai FROM LOAITOUR WHERE TenLoai=?`,
        [tour],
      );
      await pool.execute(
        `INSERT INTO TOUR 
    (MaTVTaoTour, MaPV, MaLoai, TenTour, DiaDiem, NgayKhoiHanh, NgayVe, NgayKTDangKy, SoLuongNguoiToiDa, LichTrinh, ChiPhi)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          MaPV[0].MaPV,
          MaLoai[0].MaLoai,
          name,
          place,
          date_start,
          date_end,
          date_over,
          numberOfMembers,
          travel,
          cost,
        ],
      );
      res.json({ message: "Tạo Tour Thành Công", success: true });
    } catch (err) {
      console.log(err);
      res.json({ message: "Tạo Tour KO Thành Công", success: false });
    }
  };
}
export default new MemberController();

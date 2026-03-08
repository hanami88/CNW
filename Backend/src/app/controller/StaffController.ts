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
class StaffController {
  approve = async (req: Request, res: Response) => {
    try {
      const userId = JWT(req.cookies.accessToken);
      const { id } = req.body;
      await pool.execute(
        `UPDATE THAMGIATOUR 
   SET TrangThaiPD = 'Đã Phê Duyệt',
       MaNVPheDuyet = ?
   WHERE MaDangKy = ?`,
        [userId, id],
      );
      res.json({ message: "thanh cong approve", success: true });
    } catch (err) {
      console.log(err);
      res.json({ message: "Loi approve", success: false });
    }
  };
  reject = async (req: Request, res: Response) => {
    try {
      const userId = JWT(req.cookies.accessToken);
      const { id, reason } = req.body;
      await pool.execute(
        `UPDATE THAMGIATOUR 
   SET TrangThaiPD = 'Không Phê Duyệt',
      MaNVPheDuyet = ?,LyDoTuChoi=?,
   WHERE MaDangKy = ?`,
        [userId, reason, id],
      );
      res.json({ message: "thanh cong reject", success: true });
    } catch (err) {
      console.log(err);
      res.json({ message: "Loi reject", success: false });
    }
  };
}
export default new StaffController();

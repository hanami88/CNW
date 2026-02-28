import type { Request, Response } from "express";
import { pool } from "../db/connectDB.js";
class HomePage {
  login = (req: Request, res: Response): Response => {
    const { username, password } = req.body;
    return res.json({
      message: "Login page",
    });
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
        gender,
      } = req.body;
      const result = await pool.query("SELECT * FROM THANHVIEN");
      console.log(result);
    } catch (err) {
      console.log("Loi Dang ky : " + err);
    }
    return res.json({
      message: "Login page",
    });
  };
}
export default new HomePage();

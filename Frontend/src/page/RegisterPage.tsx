import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function RegisterPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [full_name, setFull_name] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const navigate = useNavigate();
  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/register", {
        username,
        password,
        full_name,
        birthday,
        address,
        email,
        phone,
        gender,
      });
      if (res.data.success) {
        alert("Đăng Ký Thành Công");
        navigate("/login");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log("Lỗi Đăng Ký:", err);
    }
  };
  return (
    <>
      <form onSubmit={register}>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Tên đăng nhập"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          type="password"
        />
        <input
          value={full_name}
          onChange={(e) => setFull_name(e.target.value)}
          placeholder="Họ và tên"
        />
        <input
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Địa chỉ"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
        />
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Chọn giới tính</option>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>
        <button type="submit">Đăng ký</button>
      </form>

      <Link to="/login">Đăng Nhập</Link>
    </>
  );
}

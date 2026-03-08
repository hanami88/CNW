import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function LoginPage({
  setUser,
  setListTour,
}: {
  setUser: any;
  setListTour: any;
}) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        {
          username,
          password,
        },
        { withCredentials: true },
      );
      if (res.data.success) {
        alert(res.data.message);
        setUser(res.data.user);
        setListTour(res.data.listTour);
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log("Loi Dang Nhap : " + err);
    }
  };
  return (
    <form action="" onSubmit={login}>
      <label htmlFor="username">Tên đăng nhập</label>
      <input
        type="text"
        name="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="">Mật khẩu</label>
      <input
        type="text"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Đăng nhập </button>
      <Link to="/register">Đăng Ký </Link>
    </form>
  );
}

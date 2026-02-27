import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <form action="">
      <label htmlFor="username">Tên đăng nhập</label>
      <input type="text" name="username" />
      <label htmlFor="">Mật khẩu</label>
      <input type="text" name="password" />
      <button>Đăng nhập </button>
      <Link to="/register">Đăng Ký </Link>
    </form>
  );
}

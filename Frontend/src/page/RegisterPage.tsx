import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <>
      <form action="">
        <label htmlFor="username">Tên đăng nhập</label>
        <input type="text" name="username" />
        <label htmlFor="">Mật khẩu</label>
        <input type="text" name="password" />
        <label htmlFor="name">Họ và tên</label>
        <input type="text" name="name" />
        <label htmlFor="birthday">Ngày sinh</label>
        <input type="date" name="birthday" id="" />
        <label htmlFor="adress">Địa chỉ </label>
        <input type="text" name="adress" id="" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="" />
        <label htmlFor="gender">Giới tính</label>
        <select name="gender" id="">
          <option value="">Nam</option>
          <option value="">Nữ</option>
        </select>
      </form>
      <Link to="/login">Đăng Nhập</Link>
    </>
  );
}

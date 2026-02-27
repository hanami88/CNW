import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Nav() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        gap: "16px",
        justifyContent: "center",
      }}
    >
      <Link to="/register-tour">Tạo Tour</Link>
      <Link to="/list-tour">Danh Sách Tour</Link>
    </nav>
  );
}

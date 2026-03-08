import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterTour() {
  const { tourId, TenTour } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/member/register-tour`,
        {
          tourId,
          quantity,
        },
        { withCredentials: true },
      );
      if (res.data.success) {
        alert("Đăng ký thành công (chờ phê duyệt)");
        navigate("/");
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.log("Loi Dang ky Tour :" + err);
    }
  };
  return (
    <div style={{ padding: 20 }}>
      <h2>Đăng ký Tour (Tên Tour : {TenTour})</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tên thành viên:</label>
          <br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>Số lượng người:</label>
          <br />
          <input
            type="number"
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
        </div>

        <button style={{ marginTop: 15 }} type="submit">
          Gửi đăng ký
        </button>
      </form>
    </div>
  );
}

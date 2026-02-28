import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterTour() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Đăng ký tour:", {
      tourId: id,
      name,
      quantity,
    });

    alert("Đăng ký thành công (chờ phê duyệt)");
    navigate("/register-tour");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Đăng ký Tour (ID: {id})</h2>
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

import { useNavigate } from "react-router-dom";
export interface Tour {
  id: number;
  name: string;
  location: string;
  cost: number;
  maxParticipants: number;
}
const tours: Tour[] = [
  {
    id: 1,
    name: "Tour Đà Lạt",
    location: "Đà Lạt",
    cost: 3000000,
    maxParticipants: 20,
  },
  {
    id: 2,
    name: "Tour Nhật Bản",
    location: "Tokyo",
    cost: 25000000,
    maxParticipants: 15,
  },
];

export default function TourList() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách Tour</h2>

      {tours.map((tour) => (
        <div
          key={tour.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{tour.name}</h3>
          <p>Địa điểm: {tour.location}</p>
          <p>Chi phí: {tour.cost.toLocaleString()} VNĐ</p>
          <p>Số lượng tối đa: {tour.maxParticipants}</p>

          <button onClick={() => navigate(`/register-tour`)}>Đăng ký</button>
        </div>
      ))}
    </div>
  );
}

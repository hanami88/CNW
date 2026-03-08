import { useNavigate } from "react-router-dom";
export default function TourList({ listTour }: { listTour: any }) {
  const navigate = useNavigate();
  if (!listTour) {
    return <div>loading</div>;
  }
  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách Tour</h2>
      {listTour.map((tour: any) => (
        <div
          key={tour.MaTour}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h3>{tour.TenTour}</h3>
          <p>Địa điểm: {tour.DiaDiem}</p>
          <p>Ngày Khởi Hành: {tour.SoLuongNguoiToiDa}</p>
          <p>Ngày Về: {tour.SoLuongNguoiToiDa}</p>
          <p>Ngày Kết thúc đăng ký : {tour.SoLuongNguoiToiDa}</p>
          <p>Số lượng tối đa: {tour.SoLuongNguoiToiDa}</p>
          <p>Lịch Trình: {tour.LichTrinh}</p>
          <p>Chi phí: {tour.ChiPhi.toLocaleString()} VNĐ</p>
          <button
            onClick={() =>
              navigate(`/register-tour/${tour.MaTour}/${tour.TenTour}`)
            }
          >
            Đăng ký
          </button>
        </div>
      ))}
    </div>
  );
}

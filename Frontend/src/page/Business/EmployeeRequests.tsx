import { useState } from "react";
import axios from "axios";

interface TourRequest {
  MaDangKy: number;
  MaTVDangKyThamGia: number;
  MaTour: number;
  SoLuongNguoiDK: number;
  TrangThaiPD: "Chờ Phê Duyệt" | "Đã Phê Duyệt" | "Không Phê Duyệt";
  LyDoTuChoi?: string;
}

interface Props {
  listTour: TourRequest[];
}

export default function EmployeeRequests({ listTour }: Props) {
  const [requests, setRequests] = useState<TourRequest[]>(listTour || []);
  const [reasons, setReasons] = useState<{ [key: number]: string }>({});

  const handleApprove = async (id: number) => {
    try {
      await axios.put(
        `http://localhost:3000/api/business/approve`,
        { id },
        { withCredentials: true },
      );
      setRequests((prev) =>
        prev.map((req) =>
          req.MaDangKy === id
            ? { ...req, TrangThaiPD: "Đã Phê Duyệt", LyDoTuChoi: undefined }
            : req,
        ),
      );
    } catch (err) {
      alert("Lỗi phê duyệt");
    }
  };

  const handleReject = async (id: number) => {
    const reason = reasons[id];
    if (!reason) {
      alert("Vui lòng nhập lý do");
      return;
    }

    try {
      await axios.put(`http://localhost:3000/api/business/reject`, {
        reason,
        id,
      });
      setRequests((prev) =>
        prev.map((req) =>
          req.MaDangKy === id
            ? { ...req, TrangThaiPD: "Không Phê Duyệt", LyDoTuChoi: reason }
            : req,
        ),
      );
    } catch (err) {
      alert("Lỗi từ chối");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách yêu cầu đăng ký</h2>

      {requests.map((req) => (
        <div
          key={req.MaDangKy}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <p>
            <strong>Mã đăng ký:</strong> {req.MaDangKy}
          </p>

          <p>
            <strong>Mã thành viên:</strong> {req.MaTVDangKyThamGia}
          </p>

          <p>
            <strong>Mã tour:</strong> {req.MaTour}
          </p>

          <p>
            <strong>Số lượng:</strong> {req.SoLuongNguoiDK}
          </p>

          <p>
            <strong>Trạng thái:</strong> {req.TrangThaiPD}
          </p>

          {req.TrangThaiPD === "Chờ Phê Duyệt" && (
            <>
              <textarea
                placeholder="Nhập lý do nếu từ chối..."
                value={reasons[req.MaDangKy] || ""}
                onChange={(e) =>
                  setReasons({
                    ...reasons,
                    [req.MaDangKy]: e.target.value,
                  })
                }
                style={{ width: "100%", height: 60 }}
              />

              <div style={{ marginTop: 10 }}>
                <button onClick={() => handleApprove(req.MaDangKy)}>
                  Phê duyệt
                </button>

                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleReject(req.MaDangKy)}
                >
                  Không phê duyệt
                </button>
              </div>
            </>
          )}

          {req.TrangThaiPD === "Không Phê Duyệt" && (
            <p>
              <strong>Lý do:</strong> {req.LyDoTuChoi}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

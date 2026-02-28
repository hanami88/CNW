import { useState } from "react";

interface Registration {
  id: number;
  memberName: string;
  tourName: string;
  quantity: number;
  status: "chưa phê duyệt" | "đã phê duyệt" | "không phê duyệt";
  rejectReason?: string;
}

const mockData: Registration[] = [
  {
    id: 1,
    memberName: "Nguyễn Văn A",
    tourName: "Tour Đà Lạt",
    quantity: 2,
    status: "chưa phê duyệt",
  },
  {
    id: 2,
    memberName: "Trần Thị B",
    tourName: "Tour Nhật Bản",
    quantity: 1,
    status: "chưa phê duyệt",
  },
];

export default function EmployeeRequests() {
  const [requests, setRequests] = useState<Registration[]>(mockData);
  const [reasons, setReasons] = useState<{ [key: number]: string }>({});

  const handleApprove = (id: number) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: "đã phê duyệt", rejectReason: undefined }
          : req,
      ),
    );
  };

  const handleReject = (id: number) => {
    const reason = reasons[id];
    if (!reason) {
      alert("Vui lòng nhập lý do từ chối");
      return;
    }

    setRequests((prev) =>
      prev.map((req) =>
        req.id === id
          ? { ...req, status: "không phê duyệt", rejectReason: reason }
          : req,
      ),
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Danh sách yêu cầu đăng ký</h2>

      {requests.map((req) => (
        <div
          key={req.id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <p>
            <strong>Thành viên:</strong> {req.memberName}
          </p>
          <p>
            <strong>Tour:</strong> {req.tourName}
          </p>
          <p>
            <strong>Số lượng:</strong> {req.quantity}
          </p>
          <p>
            <strong>Trạng thái:</strong> {req.status}
          </p>

          {req.status === "chưa phê duyệt" && (
            <>
              <div style={{ marginTop: 10 }}>
                <textarea
                  placeholder="Nhập lý do nếu từ chối..."
                  value={reasons[req.id] || ""}
                  onChange={(e) =>
                    setReasons({ ...reasons, [req.id]: e.target.value })
                  }
                  style={{ width: "100%", height: 60 }}
                />
              </div>

              <div style={{ marginTop: 10 }}>
                <button onClick={() => handleApprove(req.id)}>Phê duyệt</button>

                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => handleReject(req.id)}
                >
                  Không phê duyệt
                </button>
              </div>
            </>
          )}

          {req.status === "không phê duyệt" && (
            <p>
              <strong>Lý do từ chối:</strong> {req.rejectReason}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

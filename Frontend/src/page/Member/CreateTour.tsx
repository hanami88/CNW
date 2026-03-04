import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateTour() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    date_start: "",
    date_end: "",
    date_over: "",
    numberOfMembers: 0,
    travel: "",
    cost: "",
    tour: "Tour Dài Ngày",
    phamvi: "Trong Nước",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "numberOfMembers" ? Number(value) : value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/member/createTour`,
        formData,
        { withCredentials: true },
      );
      if (res.data.success) {
        alert("Tạo tour thành công!");
        navigate("/list-tour");
      } else {
        alert(res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Lỗi khi tạo tour");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Tên tour</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Địa điểm</label>
      <input
        type="text"
        name="place"
        value={formData.place}
        onChange={handleChange}
        required
      />

      <label>Ngày khởi hành</label>
      <input
        type="date"
        name="date_start"
        value={formData.date_start}
        onChange={handleChange}
        required
      />

      <label>Ngày về</label>
      <input
        type="date"
        name="date_end"
        value={formData.date_end}
        onChange={handleChange}
        required
      />

      <label>Ngày hết hạn đăng ký</label>
      <input
        type="date"
        name="date_over"
        value={formData.date_over}
        onChange={handleChange}
        required
      />

      <label>Số lượng người tối đa</label>
      <input
        type="number"
        name="numberOfMembers"
        value={formData.numberOfMembers}
        onChange={handleChange}
        required
      />

      <label>Lịch trình</label>
      <input
        type="text"
        name="travel"
        value={formData.travel}
        onChange={handleChange}
        required
      />

      <label>Chi phí</label>
      <input
        type="text"
        name="cost"
        value={formData.cost}
        onChange={handleChange}
        required
      />

      <label>Loại tour</label>
      <select name="tour" value={formData.tour} onChange={handleChange}>
        <option value="Tour Dài Ngày">Tour dài ngày</option>
        <option value="Tour Ngắn Ngày">Tour ngắn ngày</option>
        <option value="Tour Nghỉ Dưỡng">Tour nghỉ dưỡng</option>
      </select>

      <label>Phạm vi</label>
      <select name="phamvi" value={formData.phamvi} onChange={handleChange}>
        <option value="Trong Nước">Trong nước</option>
        <option value="Châu Á">Châu Á</option>
        <option value="Châu Âu">Châu Âu</option>
      </select>

      <button type="submit">Tạo tour</button>
    </form>
  );
}

export default function CreateTour() {
  return (
    <form action="">
      <label htmlFor="name">Tên tour</label>
      <input type="text" name="name" />
      <label htmlFor="place">Địa điểm</label>
      <input type="text" name="place" />
      <label htmlFor="date-start">Ngày khởi hành</label>
      <input type="date" name="date-start" />
      <label htmlFor="date-end">Ngày về </label>
      <input type="date" name="date-end" />
      <label htmlFor="date-over">Ngày hết hạn đăng ký </label>
      <input type="date" name="date-over" />
      <label htmlFor="numberOfMembers">Số lượng người tối đa</label>
      <input type="number" name="numberOfMembers" />
      <label htmlFor="travel">lịch trình </label>
      <input type="text" name="travel" />
      <label htmlFor="cost">Chi phí </label>
      <input type="text" name="cost" />
      <label htmlFor="tour">Loại tour </label>
      <select name="tour" id="">
        <option value="dai">tour dài ngày </option>
        <option value="ngan">tour ngắn ngày </option>
        <option value="nghiduong">tour nghỉ dưỡng</option>
      </select>
      <label htmlFor="phamvi">Phạm vi</label>
      <select name="phamvi" id="">
        <option value="trongNuoc">Trong nước</option>
        <option value="chauA">Châu Á</option>
        <option value="chauAu">Châu Âu</option>
      </select>
      <button>Tạo tour</button>
    </form>
  );
}

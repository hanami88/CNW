import "./App.css";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import CreateTour from "./page/Member/CreateTour";
import HomePage from "./page/HomePage";
import ListTour from "./page/Member/ListTour";
import RegisterTour from "./page/Member/RegisterTour";
import EmployeeRequests from "./page/Business/EmployeeRequests";
import { Routes, Route, useNavigate } from "react-router-dom";
import useCheckUser from "./hooks/checkUser.ts";
import { useState } from "react";
import axios from "axios";
function App() {
  const [user, setUser] = useState<any>(null);
  const [listTour, setListTour] = useState<any>(null);
  const navigate = useNavigate();
  useCheckUser(setUser, setListTour);
  return (
    <>
      {user && (
        <button
          onClick={async () => {
            const res = await axios.get("http://localhost:3000/api/logout", {
              withCredentials: true,
            });
            if (res.data.success) {
              setUser(null);
              navigate("/");
            }
          }}
        >
          Đăng Xuất
        </button>
      )}
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route
          path="/login"
          element={<LoginPage setUser={setUser} setListTour={setListTour} />}
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-tour" element={<CreateTour />} />
        <Route path="/list-tour" element={<ListTour listTour={listTour} />} />
        <Route
          path="/register-tour/:tourId/:TenTour"
          element={<RegisterTour />}
        />
        <Route path="/employee-request" element={<EmployeeRequests />} />
      </Routes>
    </>
  );
}

export default App;

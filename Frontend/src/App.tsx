import "./App.css";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import CreateTour from "./page/Member/CreateTour";
import HomePage from "./page/HomePage";
import ListTour from "./page/Member/ListTour";
import RegisterTour from "./page/Member/RegisterTour";
import EmployeeRequests from "./page/Business/EmployeeRequests";
import { Routes, Route } from "react-router-dom";
import useCheckUser from "./middleware/checkUser.ts";
import { useState } from "react";
function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  useCheckUser(setUser, setLoading);
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-tour" element={<CreateTour />} />
        <Route path="/list-tour" element={<ListTour />} />
        <Route path="/register-tour" element={<RegisterTour />} />
        <Route path="/employee-request" element={<EmployeeRequests />} />
      </Routes>
    </>
  );
}

export default App;

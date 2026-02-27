import "./App.css";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import CreateTour from "./page/Member/CreateTour";
import HomePage from "./page/HomePage";
import ListTour from "./page/ListTour";
import RegisterTour from "./page/Member/RegisterTour";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/create-tour" element={<CreateTour />} />
        <Route path="/home-page" element={<HomePage />} />
        <Route path="/list-tour" element={<ListTour />} />
        <Route path="/register-tour" element={<RegisterTour />} />
      </Routes>
    </>
  );
}

export default App;

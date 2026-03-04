import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function useCheckUser(setUser: any, setListTour: any) {
  const navigate = useNavigate();
  useEffect(() => {
    const axiosData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/checkUser`,
          {
            withCredentials: true,
          },
        );
        if (res.data.success) {
          setUser(res.data.user);
          setListTour(res.data.listTour);
          navigate("/");
        }
      } catch (err) {
        navigate("/login");
      }
    };
    axiosData();
  }, []);
}

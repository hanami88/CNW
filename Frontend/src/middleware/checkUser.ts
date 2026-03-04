import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useCheckUser(setUser: any, setLoading: any) {
  const navigate = useNavigate();

  useEffect(() => {
    const axiosData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/checkUser", {
          withCredentials: true,
        });
        if (res.data.success) {
          setUser(res.data.user);
          setLoading(true);
        } else {
          navigate("/");
        }
      } catch (err) {
        navigate("/login");
      }
    };

    axiosData();
  }, []);
}

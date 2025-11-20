import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contextApi/createContext";
import { useContext } from "react";
export const useAxiosInterceptor = () => {
  const navigate = useNavigate();
  const {setIsAuthenticated}=useContext(AuthContext);
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          setIsAuthenticated(false);
          navigate("/login", { replace: true }); // ✅ navigate using react-router
        }
        return Promise.reject(error);
      }
    );

    // Cleanup: remove interceptor on unmount
    return () => axios.interceptors.response.eject(interceptor);
  }, [navigate]);
};

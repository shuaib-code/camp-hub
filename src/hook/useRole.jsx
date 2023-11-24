import { useEffect, useState } from "react";
import axiosPublic from "../config/axios.config";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const email = user?.email;
  useEffect(() => {
    if (user) {
      axiosPublic.post("/role", { email }).then((r) => setRole(r.data[0].role));
    }
  }, [user]);

  return role ? role : null;
};

export default useRole;

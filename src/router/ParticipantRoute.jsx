import useAuth from "../hook/useAuth";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../config/axios.config";

const ParticipantRoute = ({ children }) => {
  const { user, reloading } = useAuth();
  const { data: role, isLoading } = useQuery({
    queryKey: ["finSpecificRolemp", reloading],
    queryFn: async () => {
      const res = await axiosPublic.get(`/role?email=${user.email}`);

      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <motion.div
          animate={{
            scale: [1, 1.1, 0.9, 1.1, 0.9, 1],
            rotate: [0, 0, 270, 270, 0],
            borderRadius: ["20%", "20%", "50%", "50%", "20%"],
          }}
        >
          <div className="w-28 h-28 border-4 rounded-3xl border-primary">
            <Loader />
          </div>
        </motion.div>
      </div>
    );
  }

  const getRole = role?.length ? role[0] : [];
  return user && getRole.role === "participant" ? (
    children
  ) : (
    <Navigate to="/"></Navigate>
  );
};

export default ParticipantRoute;

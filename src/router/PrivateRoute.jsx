import useAuth from "../hook/useAuth";
import { Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, reloading } = useAuth();
  const location = useLocation();
  if (reloading) {
    return (
      <>
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
      </>
    );
  }
  return user ? (
    children
  ) : (
    <Navigate state={location.pathname} to="/login"></Navigate>
  );
};

export default PrivateRoute;

import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="font-slab">
      <Outlet />
      <Toaster position="top-center" />
    </div>
  );
};

export default Dashboard;

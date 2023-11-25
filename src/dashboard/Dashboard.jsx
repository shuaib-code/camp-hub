import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="font-slab">
      <Outlet />
    </div>
  );
};

export default Dashboard;

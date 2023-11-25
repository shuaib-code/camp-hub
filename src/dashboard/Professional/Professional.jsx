import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";

const Professional = () => {
  return (
    <div className="flex">
      <Helmet>
        <title>Dashboard | Professional</title>
      </Helmet>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Professional;

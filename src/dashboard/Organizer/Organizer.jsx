import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";

const Organizer = () => {
  return (
    <div className="flex">
      <Helmet>
        <title>Dashboard | Organizer</title>
      </Helmet>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Organizer;

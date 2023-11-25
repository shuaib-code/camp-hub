import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import SideBar from "../SideBar";

const Participant = () => {
  return (
    <div className="flex">
      <Helmet>
        <title>Dashboard | Participant</title>
      </Helmet>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Participant;

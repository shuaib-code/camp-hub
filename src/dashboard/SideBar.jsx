import { Link } from "react-router-dom";
import useAuth from "../hook/useAuth";
import SideNav from "./SideNav";
import { BiArrowBack } from "react-icons/bi";

const SideBar = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-dash pr-2">
      <div className="flex-row justify-center items-center mx-5 pt-4 pb-3 mb-2 border-b-2 border-primary">
        <Link to="/">
          <button className="flex justify-center items-center gap-2 font-medium text-sm">
            <BiArrowBack className="text-lg"></BiArrowBack> Home
          </button>
        </Link>
        <p className="text-2xl font-semibold mt-5">DashBoard</p>
      </div>
      <SideNav />
    </div>
  );
};

export default SideBar;

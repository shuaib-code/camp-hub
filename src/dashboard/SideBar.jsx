import useAuth from "../hook/useAuth";
import SideNav from "./SideNav";

const SideBar = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-dash">
      <div className="mx-5">
        <h1>DashBoard</h1>
        <img src={user?.photoURL} className="w-8 h-8 rounded-full" />
      </div>
      <SideNav />
    </div>
  );
};

export default SideBar;

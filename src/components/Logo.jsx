import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";
const Logo = () => {
  return (
    <Link to="/">
      <div className="flex justify-center items-center space-x-1">
        {/* <img src={logo} className="w-6" /> */}
        <p className="text-xl font-plusJakartaSans font-semibold">
          Camp<span className="font-bold text-primary">HUB</span>
        </p>
      </div>
    </Link>
  );
};

export default Logo;

import toast from "react-hot-toast";
import useAuth from "../../hook/useAuth";

const PopClick = ({ pop, setPop, show }) => {
  const { user, logOut } = useAuth();
  if (!user) {
    return null;
  }
  return (
    <div
      className={`${
        pop ? "border-2" : "border-0"
      } relative border-primary rounded-full ${
        show ? "hidden md:flex lg:flex" : "flex md:hidden lg:hidden"
      }`}
    >
      <img
        onClick={() => setPop(!pop)}
        src={user?.photoURL}
        className="w-8 h-8 rounded-full object-cover"
        referrerPolicy="no-referrer"
      />
      <div
        className={`${
          pop ? "absolute" : "hidden"
        }  bg-gray-100 py-3 px-7 z-10 rounded-lg right-0 top-8`}
      >
        <button
          className="btn-primary"
          onClick={() => logOut().then(toast.success("Logout successfull."))}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default PopClick;

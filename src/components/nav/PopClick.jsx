import useAuth from "../../hook/useAuth";
import Swal from "sweetalert2";

const PopClick = ({ show }) => {
  const { user, logOut } = useAuth();
  if (!user) {
    return null;
  }
  const logout = () => {
    Swal.fire({
      title: "Are you sure you want to Logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16B364",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          Swal.fire({
            title: "Logged Out!",
            icon: "success",
          });
        });
      }
    });
  };
  return (
    <div
      className={`relative border-primary rounded-full ${
        show ? "hidden md:flex lg:flex" : "flex md:hidden lg:hidden"
      }`}
    >
      <img
        onClick={logout}
        src={user?.photoURL}
        className="w-8 h-8 rounded-full object-cover"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default PopClick;

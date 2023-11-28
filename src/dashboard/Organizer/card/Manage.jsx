import Swal from "sweetalert2";
import useCamp from "../../../hook/useCamp";
import EditCampModal from "./EditCampModal";
import { MdDelete } from "react-icons/md";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const Manage = ({ camp, i }) => {
  const axiosSecure = useAxiosSecure();
  const { refetch } = useCamp();
  const { campName, date, _id } = camp;
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16B364",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/deletecamp?id=${_id}`).then(() => refetch());
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div
      className={`${
        i % 2 === 0 ? "bg-gray-100" : "bg-white"
      } flex items-center justify-between py-2 px-3 rounded-sm space-x-4`}
    >
      <p className="table-text">{campName}</p>
      <p className="table-text">{date}</p>
      <EditCampModal camp={camp} />
      <button className="btn-danger" onClick={handleDelete}>
        <MdDelete></MdDelete>
      </button>
    </div>
  );
};

export default Manage;

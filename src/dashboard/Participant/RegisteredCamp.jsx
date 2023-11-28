import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../config/axios.config";
import useAuth from "../../hook/useAuth";
import Loader from "../../components/Loader";
import DataTable, { createTheme } from "react-data-table-component";
import PaymentModal from "../../components/PaymentModal";
import { MdOutlineCancel } from "react-icons/md";
import Swal from "sweetalert2";

const RegisteredCamp = () => {
  const { user } = useAuth();
  const registerd = useQuery({
    queryKey: ["particimpantRegistered", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/findpartcipantregistered?email=${user.email}`
      );

      return res.data;
    },
  });
  const handleDelete = async (id) => {
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
        axiosPublic.delete(`/registercampdelete?id=${id}`).then((r) => {
          if (r.data.deletedCount) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            registerd.refetch();
          }
        });
      }
    });
  };
  if (registerd.isLoading) {
    return (
      <div className="py-12 w-full">
        <Loader />
      </div>
    );
  }
  const columns = [
    {
      name: "Camp Name",
      selector: (row) => row.campName,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
    {
      name: "Fee",
      width: "60px",
      selector: (row) => row.fee,
    },
    {
      name: "Payment",
      selector: (row) => row.pay,
      width: "100px",
      cell: ({ pay, fee, id }) =>
        pay == 1 ? (
          <p>Paid</p>
        ) : (
          <PaymentModal fee={fee} id={id} refech={registerd.refetch} />
        ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      width: "110px",
      cell: ({ status }) => <p>{status == 1 ? "Confirmed" : "Pending"}</p>,
    },
    {
      name: "Cancel",
      selector: (row) => row.status,
      width: "100px",
      cell: ({ pay, deleteId }) => (
        <button
          disabled={pay === "1"}
          className={`${pay == "1" ? "cursor-not-allowed" : null} btn-danger`}
          onClick={() => handleDelete(deleteId)}
        >
          <MdOutlineCancel />
        </button>
      ),
    },
  ];
  const data = registerd?.data?.map((e) => ({
    campName: e.campName,
    date: e.date,
    fee: e.fee,
    pay: e.pay,
    status: e.status,
    id: e,
    deleteId: e._id,
  }));
  const customStyles = {
    headCells: {
      style: {
        color: "#16B364",
        fontWeight: "700",
        fontSize: "16px",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        fontWeight: "500",
        backgroundColor: "transparent",
      },
    },
  };
  createTheme(
    "solarized",
    {
      text: {
        primary: "black",
      },
      background: {
        default: "transparent",
      },
      context: {
        background: "#fff",
        text: "#FFFFFF",
      },
      divider: {
        default: "#E5E4E2",
      },
      // action: {
      //   button: "rgba(0,0,0,.54)",
      //   hover: "rgba(0,0,0,.08)",
      //   disabled: "rgba(0,0,0,.12)",
      // },
    },
    "dark"
  );

  return (
    <div className="px-2 mx-auto">
      <h1 className="form-title">Registered Camp</h1>
      <h6 className="form-text">
        Total Registerd Camp: {registerd?.data?.length}
      </h6>
      <div className="rounded-xl mt-7 border">
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          theme="solarized"
        />
      </div>
    </div>
  );
};

export default RegisteredCamp;

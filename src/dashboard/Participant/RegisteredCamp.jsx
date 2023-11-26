import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../config/axios.config";
import useAuth from "../../hook/useAuth";
import Loader from "../../components/Loader";
import DataTable, { createTheme } from "react-data-table-component";

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
  if (registerd.isLoading) {
    return (
      <div className="py-12">
        <Loader />
      </div>
    );
  }
  const handlePay = (fee) => {
    console.log(fee);
  };
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
      cell: ({ pay, fee }) =>
        pay == 1 ? (
          <p>Paid</p>
        ) : (
          <button onClick={() => handlePay(fee)} className="btn-small">
            Pay
          </button>
        ),
    },
    {
      name: "Status",
      selector: (row) => row.status,
      width: "110px",
      cell: ({ status }) => <p>{status == 1 ? "Confirmed" : "Pending"}</p>,
    },
  ];
  const data = registerd?.data?.map((e) => ({
    campName: e.campName,
    date: e.date,
    fee: e.fee,
    pay: e.pay,
    status: e.status,
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
    <div className="px-2">
      <h1>Registered Capms</h1>
      <div className="rounded-xl mt-7">
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

import EditCampModal from "./EditCampModal";

const Manage = ({ camp, i }) => {
  const { campName, date, _id } = camp;
  return (
    <div
      className={`${
        i % 2 === 0 ? "bg-gray-100" : "bg-white"
      } flex items-center justify-between py-2 px-3 rounded-sm space-x-4`}
    >
      <p className="table-text">{campName}</p>
      <p className="table-text">{date}</p>
      <EditCampModal camp={camp} />
      <button className="btn-danger">Delete</button>
    </div>
  );
};

export default Manage;

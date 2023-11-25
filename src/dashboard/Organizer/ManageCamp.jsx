import useCamp from "../../hook/useCamp";
import Manage from "./card/Manage";

const ManageCamp = () => {
  const { allCamp } = useCamp();
  return (
    <div className="w-full">
      <p className="form-title">Manage Camp</p>
      <div className="grid grid-cols-1 px-2 mt-5">
        {allCamp?.map((e, i) => (
          <Manage key={e._id} camp={e} i={i} />
        ))}
      </div>
    </div>
  );
};

export default ManageCamp;

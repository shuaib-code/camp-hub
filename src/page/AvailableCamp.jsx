import useAllCamp from "../hook/useAllCamp";
import Loader from "../components/Loader";
import AvailableCampCard from "../components/card/AvailableCampCard";

const AvailableCamp = () => {
  const { allCamp, isLoading } = useAllCamp();
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <h1 className="form-title text-black">Available Camp</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-2 mt-8">
        {allCamp.map((e) => (
          <AvailableCampCard key={e._id} camp={e} />
        ))}
      </div>
    </div>
  );
};

export default AvailableCamp;

import useAllCamp from "../hook/useAllCamp";
import Loader from "../components/Loader";
import AvailableCampCard from "../components/card/AvailableCampCard";
import { Link } from "react-router-dom";

const PopulerMedicalCamp = () => {
  const { allCamp, isLoading } = useAllCamp();
  if (isLoading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    );
  }
  const camp = allCamp.slice(0, 6);
  return (
    <div className="mt-12 mb-6">
      <h1 className="form-title text-black">Populer Medical Camp</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-2 mt-8">
        {camp.map((e) => (
          <AvailableCampCard key={e._id} camp={e} />
        ))}
      </div>
      <div className="mt-5 flex justify-center">
        <Link to="/availableCamp" className="btn-primary">
          See all Camps
        </Link>
      </div>
    </div>
  );
};

export default PopulerMedicalCamp;

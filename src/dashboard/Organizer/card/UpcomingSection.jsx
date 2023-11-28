import axiosPublic from "../../../config/axios.config";
import Loader from "../../../components/Loader";
import { useQuery } from "@tanstack/react-query";
import CampUpcomingCard from "./CampUpcomingCard";

const UpcomingSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["UpcomingCamp"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getupcomingcamp`);

      return res.data;
    },
  });
  if (isLoading) {
    return (
      <div className="py-14">
        <Loader />
      </div>
    );
  }
  return (
    <div className="py-5">
      <h1 className="form-title pb-4">Upcoming camp</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {data?.map((e) => (
          <CampUpcomingCard camp={e} key={e._id} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingSection;

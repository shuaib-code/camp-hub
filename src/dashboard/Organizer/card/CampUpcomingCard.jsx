import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../../config/axios.config";
import Loader from "../../../components/Loader";

const CampUpcomingCard = ({ camp }) => {
  const { image, campName, date, time, _id } = camp;
  const count = useQuery({
    queryKey: ["findAllCadsfsdmpCounter", _id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getupcomingcamp?id=${_id}`);

      return res.data;
    },
  });
  if (count.isLoading) {
    return (
      <div className="py-12">
        <Loader />
      </div>
    );
  }
  return (
    <div className=" bg-dash rounded-lg shadow-md">
      <img
        className="rounded-lg border-2 border-primary object-cover w-full h-60"
        src={image}
        alt=""
      />

      <div className="p-5">
        <h2 className="text-lg font-semibold">{campName}</h2>
        <p>
          <span className="font-semibold">Date: </span>
          {date}
        </p>
        <p>
          <span className="font-semibold">Time: </span> {time}
        </p>
        <div className="mt-4 flex justify-end items-center gap-2">
          <Link to={`/upcoming-camp-details/${_id}`}>
            <button className="btn-small">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CampUpcomingCard;

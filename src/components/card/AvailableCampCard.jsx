import { Link } from "react-router-dom";
import RegisterModal from "../RegisterModal";
import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../config/axios.config";
import Loader from "../Loader";
import useAuth from "../../hook/useAuth";
import useRole from "../../hook/useRole";

const AvailableCampCard = ({ camp }) => {
  const { image, campName, date, time, fee, location, target, _id } = camp;
  const { user } = useAuth();
  const role = useRole();
  const count = useQuery({
    queryKey: ["findAllCampCounter", _id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/findpartcipant?campId=${_id}`);

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
    <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg object-cover w-full h-60"
        src={image}
        alt=""
      />

      <div className="p-5">
        <h2 className="text-lg font-semibold">{campName}</h2>
        <p>Camp Fee: {fee}</p>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
        <p>Audience: {target}</p>
        <p>Venue: {location}</p>
        <p>
          Participant:{" "}
          <span className="font-semibold">{camp?.count?.length}</span>
        </p>
        <div className="mt-4 flex justify-end items-center gap-2">
          {user?.email ? (
            role === "participant" ? (
              <RegisterModal camp={camp} refetch={count.refetch} />
            ) : null
          ) : null}
          <Link to={`/camp-details/${_id}`}>
            <button className="btn-small bg-sky-600">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AvailableCampCard;

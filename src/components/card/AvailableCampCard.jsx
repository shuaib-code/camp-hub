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
    <div className=" bg-dash rounded-lg shadow-md">
      <img className="rounded-lg object-cover w-full h-60" src={image} alt="" />

      <div className="p-5">
        <h2 className="text-lg font-semibold">{campName}</h2>
        <p>
          {" "}
          <span className="font-semibold">Camp Fee:</span> {fee}
        </p>
        <p>
          <span className="font-semibold">Date:</span> {date}
        </p>
        <p>
          <span className="font-semibold">Time:</span> {time}
        </p>
        <p>
          <span className="font-semibold">Audience:</span> {target}
        </p>
        <p>
          <span className="font-semibold">Venue:</span> {location}
        </p>
        <p>
          <span className="font-semibold">Participant:</span>{" "}
          <span className="font-semibold">{camp?.count?.length}</span>
        </p>
        <div className="mt-4 flex justify-end items-center gap-2">
          {user?.email ? (
            role === "participant" ? (
              <RegisterModal camp={camp} refetch={count.refetch} />
            ) : null
          ) : null}
          <Link to={`/camp-details/${_id}`}>
            <button className="btn-small">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AvailableCampCard;

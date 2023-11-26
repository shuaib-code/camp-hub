import { useParams } from "react-router-dom";
import axiosPublic from "../config/axios.config";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import RegisterModal from "../components/RegisterModal";

const CampDetails = () => {
  const { campId } = useParams();
  const camp = useQuery({
    queryKey: ["CampDetails"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/findcamp?campId=${campId}`);

      return res.data;
    },
  });
  const count = useQuery({
    queryKey: ["findAllCamp", campId],
    queryFn: async () => {
      const res = await axiosPublic.get(`/findpartcipant?campId=${campId}`);

      return res.data;
    },
  });
  if (camp.isLoading) {
    return <Loader />;
  }
  if (count.isLoading) {
    return <Loader />;
  }
  const {
    campName,
    image,
    date,
    time,
    location,
    target,
    des,
    fee,
    professional,
    service,
  } = camp.data[0];
  return (
    <div className=" bg-white border border-gray-200 rounded-lg w-full">
      <img className="rounded-t-lg w-full" src={image} alt="" />

      <div className="p-5 space-y-1">
        <h2 className="text-lg font-semibold">{campName}</h2>
        <p>Camp Fee: {fee}</p>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
        <p>Target Audience: {target}</p>
        <p>Venue: {location}</p>
        <p>Healthcare Professional: Dr. {professional}</p>
        <p>Specialised Service: {service}</p>
        <p>
          Participant: <span className="font-semibold">{count.data.count}</span>
        </p>
        <p className="pt-2">{des}</p>
      </div>
      <div className="p-4 flex justify-end items-center gap-2">
        <RegisterModal camp={camp.data[0]} refetch={count.refetch} />
      </div>
    </div>
  );
};

export default CampDetails;

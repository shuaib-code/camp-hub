import { useParams } from "react-router-dom";
import axiosPublic from "../config/axios.config";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import useRole from "../hook/useRole";
import Swal from "sweetalert2";
import useAuth from "../hook/useAuth";

const UpcomingCampDetails = () => {
  const role = useRole();
  const { campId } = useParams();
  const { user } = useAuth();
  const {
    data: camp,
    isLoading: campLoading,
    refetch,
  } = useQuery({
    queryKey: ["UpcomingCampDetails"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/getupcomingcamp?id=${campId}`);

      return res.data;
    },
  });
  const { data, isLoading } = useQuery({
    queryKey: ["UpcomingCampDetailshdsfs", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/role?email=${user.email}`);

      return res.data;
    },
  });
  if (campLoading && isLoading) {
    return <Loader />;
  }
  const part = async (_id) => {
    const { _id: id } = data[0];
    Swal.fire({
      title: "Upcoming camp",
      text: "Do you really want to join?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16B364",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Join",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .post(`/upcomingpart?id=${_id}&part=${id}`)
          .then(() => refetch());

        Swal.fire({
          title: "Joined",
          text: "You joined successfully!",
          icon: "success",
        });
      }
    });
  };
  const pro = async (_id) => {
    const { _id: id } = data[0];
    Swal.fire({
      title: "Upcoming camp",
      text: "Are you really interested?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16B364",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I am",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .post(`/upcomingpro?id=${_id}&pro=${id}`)
          .then(() => refetch());

        Swal.fire({
          title: "Submitted",
          text: "You submition is being proccesed by organizer successfully!",
          icon: "success",
        });
      }
    });
  };
  const organizer = async () => {
    console.log("organizer");
  };
  return camp?.map((e, i) => (
    <div key={i} className=" bg-white border border-gray-200 rounded-lg w-full">
      <img className="rounded-t-lg w-full" src={e.image} alt="" />

      <div className="p-5 space-y-1">
        <h2 className="text-lg font-semibold">{e.campName}</h2>
        <p>Camp Fee: {e.fee}</p>
        <p>Date: {e.date}</p>
        <p>Time: {e.time}</p>
        <p>Target Audience: {e.target}</p>
        <p>Venue: {e.location}</p>
        <p>Healthcare Professional Intersted: {e.professional.length}</p>
        <p>Participant Joined: {e.participant.length}</p>
        <p>Specialised Service: {e.service}</p>
        <p className="pt-2">{e.des}</p>
      </div>
      <div className="p-4 flex justify-end items-center gap-2">
        {role === "participant" ? (
          <button onClick={() => part(e._id)} className="btn-primary">
            Join Upcoming Camp
          </button>
        ) : null}
        {role === "professional" ? (
          <button onClick={() => pro(e._id)} className="btn-primary">
            Interested
          </button>
        ) : null}
        {role === "organizer" ? (
          e.professional.length == 5 && e.participant.length == 10 ? (
            <button onClick={organizer} className="btn-primary">
              Publish
            </button>
          ) : (
            <button className="btn-danger cursor-not-allowed">
              Not Publishable
            </button>
          )
        ) : null}
      </div>
    </div>
  ));
};

export default UpcomingCampDetails;

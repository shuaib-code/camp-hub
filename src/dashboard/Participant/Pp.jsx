import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../config/axios.config";
import Loader from "../../components/Loader";
import useAuth from "../../hook/useAuth";
import Pmodal from "./Pmodal";

const Pp = () => {
  const { user } = useAuth();
  const profile = useQuery({
    queryKey: ["participantrProfile", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/p?email=${user.email}`);

      return res.data;
    },
  });
  if (profile.isLoading) {
    return (
      <div className="py-12 w-full">
        <Loader />
      </div>
    );
  }
  return (
    <div className="w-full">
      <h1>Proile organizer</h1>
      <Pmodal
        profile={profile?.data?.length ? profile?.data[0] : []}
        refetch={profile.refetch}
      ></Pmodal>
    </div>
  );
};

export default Pp;

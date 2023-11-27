import { useQuery } from "@tanstack/react-query";
import OpModal from "./OpModal";
import axiosPublic from "../../config/axios.config";
import Loader from "../../components/Loader";
import useAuth from "../../hook/useAuth";

const Op = () => {
  const { user } = useAuth();
  const profile = useQuery({
    queryKey: ["pOrganizerProfile", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/op?email=${user.email}`);

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
      <OpModal
        profile={profile?.data?.length ? profile?.data[0] : []}
        refetch={profile.refetch}
      ></OpModal>
    </div>
  );
};

export default Op;

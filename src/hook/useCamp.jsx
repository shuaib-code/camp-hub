import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../config/axios.config";
import useAuth from "./useAuth";

const useCamp = () => {
  const { user } = useAuth();
  const {
    refetch,
    data: allCamp = [],
    isLoading,
  } = useQuery({
    queryKey: ["findAllCamp", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/findcamp?email=${user.email}`);

      return res.data;
    },
  });
  return { allCamp, refetch, isLoading };
};

export default useCamp;

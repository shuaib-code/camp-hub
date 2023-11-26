import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../config/axios.config";

const useAllCamp = () => {
  const {
    refetch,
    data: allCamp = [],
    isLoading,
  } = useQuery({
    queryKey: ["findAllCampwithoutEmail"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/findcamp`);

      return res.data;
    },
  });
  return { allCamp, refetch, isLoading };
};

export default useAllCamp;

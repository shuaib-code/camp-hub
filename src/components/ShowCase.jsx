import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../config/axios.config";
import Loader from "./Loader";

const ShowCase = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["showcase"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/showcase`);

      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }
  return (
    <div className="bg-dash py-4 px-2 rounded-md">
      <h1 className="mb-5 form-title">Know More About camp</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-xl gap-6 mx-auto">
        {data?.map((e, i) => (
          <div
            key={i}
            className="text-center border-2 rounded-md p-7 border-primary"
          >
            <h5 className="text-6xl mb-3 text-primary">{e.c}</h5>
            <p className="text-black font-semibold">{e.n}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowCase;

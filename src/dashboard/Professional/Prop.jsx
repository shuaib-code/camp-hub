import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../../config/axios.config";
import Loader from "../../components/Loader";
import useAuth from "../../hook/useAuth";
import ProModal from "./ProModal";

const Prop = () => {
  const { user } = useAuth();
  const profile = useQuery({
    queryKey: ["participantrProfile", user?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/pp?email=${user.email}`);

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
  let data = profile?.data.length ? profile.data[0] : [];
  return (
    <div className="w-full">
      <h1 className="form-title">Participant Profile</h1>
      <div className="w-full px-4 mt-5">
        <div className="block text-sm text-gray-500 bg-white border border-gray-200 rounded">
          <div className="p-3">
            <div className="flex items-center justify-between mb-2">
              <img
                className="w-10 h-10 rounded-full"
                src={user.photoURL}
                referrerPolicy="false"
              />
              <div>
                <ProModal
                  profile={profile?.data?.length ? profile?.data[0] : []}
                  refetch={profile.refetch}
                ></ProModal>
              </div>
            </div>
            <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
              {user.displayName}
            </p>
            <p className="mb-3 text-sm font-normal">{user.email}</p>
            <p className="text-sm">
              <span className="text-gray-700 font-medium">Twetter:</span>{" "}
              {data?.twitter || "not found"}
            </p>
            <p className="text-sm">
              <span className="text-gray-700 font-medium">Phone:</span>{" "}
              {data?.phone || "not found"}
            </p>
            <p className="text-sm">
              <span className="text-gray-700 font-medium">Linkedin:</span>{" "}
              {data?.linkedin || "not found"}
            </p>
            <p className="text-sm">
              <span className="text-gray-700 font-medium">Specialty:</span>{" "}
              {data?.specialty || "not found"}
            </p>
            <p className="mb-3 text-sm">
              <span className="text-gray-700 font-medium">Certifiacation:</span>{" "}
              {data?.certification || "not found"}
            </p>
          </div>
          <div data-popper-arrow></div>
        </div>
      </div>
    </div>
  );
};

export default Prop;

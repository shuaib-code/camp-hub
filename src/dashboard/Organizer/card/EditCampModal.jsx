import { useState } from "react";
import Loader from "../../../components/Loader";
import toast from "react-hot-toast";
import axiosPublic from "../../../config/axios.config";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hook/useAuth";
import useCamp from "../../../hook/useCamp";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const EditCampModal = ({ camp }) => {
  const axiosSecure = useAxiosSecure();
  const { refetch } = useCamp();
  const { campName, date, location, des, time, target, service, fee, _id } =
    camp;
  const [modal, setModal] = useState(0);
  const [submit, setSubmit] = useState(1);
  const { user } = useAuth();
  const professional = useQuery({
    queryKey: ["getProfessinalSelcet"],
    queryFn: () => axiosPublic.get("/selectprofessional").then((r) => r.data),
  });
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    const imgFile = { image: data.image[0] };
    const imgURl = await axiosPublic.post(import.meta.env.VITE_ImgBB, imgFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (imgURl.data.success) {
      data.image = imgURl.data.data.display_url;
      data.email = user.email;
    } else {
      toast.error("Something went worng with image.");
    }
    axiosSecure.patch(`/updatecamp?id=${_id}`, data).then((r) => {
      r.data._id ? toast.success("Camp Added Successfully") : null;
      reset();
      setSubmit(1);
      setModal(0);
      refetch();
    });

    console.log(data);
  };
  const formData = [
    { label: "Camp Name", field: "campName", value: `${campName}` },
    { label: "Camp Fee", field: "fee", value: `${fee}` },
    { label: "Date", field: "date", value: `${date}` },
    { label: "Time", field: "time", value: `${time}` },
    { label: "Venue Location", field: "location", value: `${location}` },
    { label: "Specialized Service", field: "service", value: `${service}` },
    { label: "Target Audience", field: "target", value: `${target}` },
  ];
  if (professional.isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <button
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="btn-small"
        type="button"
        onClick={() => setModal(1)}
      >
        Update
      </button>

      {/* <!-- Main modal --> */}
      <div
        id="default-modal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${
          modal ? "block" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Update this Camp Information
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
                onClick={() => setModal(0)}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-4 md:p-5">
              <div className="">
                <form className="space-y-1" onSubmit={handleSubmit(onSubmit)}>
                  {formData.map((e) => (
                    <label className="block" key={e.field}>
                      <span className="block text-sm font-medium text-slate-700">
                        {e.label}
                      </span>
                      <input
                        defaultValue={e.value}
                        className="form-input"
                        type="text"
                        placeholder={`Enter ${e.label}`}
                        {...register(e.field, { required: true })}
                      />
                    </label>
                  ))}
                  <label className="block">
                    <span className="block text-sm font-medium text-slate-700">
                      Select Image
                    </span>
                    <input
                      className="mt-2 rounded-lg border"
                      type="file"
                      {...register("image", { required: true })}
                    />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-medium text-slate-700">
                      Description
                    </span>
                    <textarea
                      defaultValue={des}
                      className="form-input"
                      rows="6"
                      {...register("des", { required: true })}
                    />
                  </label>
                  <label className="block">
                    <span className="block text-sm font-medium text-slate-700">
                      Select Healthcare Professional
                    </span>
                    <select
                      className="form-input"
                      {...register("professional", { required: true })}
                    >
                      {professional?.data?.map((e) => (
                        <option key={e._id} value={e._id}>
                          {e.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="grid pb-5 pt-3">
                    <input
                      onClick={() => setSubmit(0)}
                      className="btn-primary"
                      type="submit"
                      value={`${submit ? "Submit" : "Submiting..."}`}
                    />
                  </div>
                </form>
              </div>
            </div>
            {/* <!-- Modal footer -->
            <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                          <button
                              
                data-modal-hide="default-modal"
                type="button"
                className="btn-primary"
              >
                Update
              </button>
              <button
                data-modal-hide="default-modal"
                type="button"
                className="ms-3 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                Cancel
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCampModal;

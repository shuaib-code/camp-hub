import { useForm } from "react-hook-form";
import axiosPublic from "../../config/axios.config";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const AddCamp = () => {
  const [submit, setSubmit] = useState(1);
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
    } else {
      toast.error("Something went worng with image.");
    }
    axiosPublic.post("/addcamp", data).then((r) => {
      r.data._id ? toast.success("Camp Added Successfully") : null;
      reset();
      setSubmit(1);
    });

    console.log(data);
  };
  const formData = [
    { label: "Camp Name", field: "campName" },
    { label: "Camp Fee", field: "fee" },
    { label: "Date", field: "date" },
    { label: "Time", field: "time" },
    { label: "Venue Location", field: "location" },
    { label: "Specialized Service", field: "service" },
    { label: "Target Audience", field: "target" },
  ];
  if (professional.isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <p className="form-title">Add new Camp</p>
      <div className="mx-2 md:px-10 lg:mx-20 mt-9">
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          {formData.map((e) => (
            <label className="block" key={e.field}>
              <span className="block text-sm font-medium text-slate-700">
                {e.label}
              </span>
              <input
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
          <div className="grid pb-5">
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
  );
};

export default AddCamp;

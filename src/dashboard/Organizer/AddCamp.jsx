import { useForm } from "react-hook-form";
import axiosPublic from "../../config/axios.config";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";
import useProfessional from "../../hook/useProfessional";

const AddCamp = () => {
  const { register, handleSubmit } = useForm();
  const professional = useProfessional();
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
    console.log(data);
  };
  console.log(professional);
  const formData = [
    { label: "Camp Name", field: "campName" },
    { label: "Camp Fee", field: "fee" },
    { label: "Date", field: "date" },
    { label: "Time", field: "time" },
    { label: "Venue Location", field: "location" },
    { label: "Specialized Service", field: "service" },
    { label: "Target Audience", field: "target" },
  ];
  if (import.meta.env.VITE_ImgBB) {
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
              Select Image form Device
            </span>
            <input
              className="mt-2 rounded-lg border"
              type="file"
              {...register("image", { required: true })}
            />
          </label>
          <label className="block">
            <span className="block text-sm font-medium text-slate-700">
              Select Healthcare Professional
            </span>
            <select
              className="form-input"
              {...register("Title", { required: true })}
            >
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Dr">Dr</option>
            </select>
          </label>
          <div className="grid pb-5">
            <input className="btn-primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCamp;

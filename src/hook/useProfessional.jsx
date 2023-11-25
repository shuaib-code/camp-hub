import axiosPublic from "../config/axios.config";

const useProfessional = () => {
  axiosPublic.get("/selectprofessional").then((r) => console.log(r.data));
  return "dsdf";
};

export default useProfessional;

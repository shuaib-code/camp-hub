import { useQuery } from "@tanstack/react-query";
import axiosPublic from "../config/axios.config";
import Loader from "../components/Loader";
import ScrollCarousel from "scroll-carousel-react";
import TestimonialCar from "./card/TestimonialCar";

const Testimonial = () => {
  const feedback = useQuery({
    queryKey: ["particimpantRegisteredpaymetHistroy"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/feedback`);

      return res.data;
    },
  });
  if (feedback.isLoading) {
    return (
      <div className="py-12 w-full">
        <Loader />
      </div>
    );
  }
  return (
    <div className="py-10">
      <h1 className="text-3xl text-center font-bold">Testimonial</h1>
      <p className="form-text">
        Feedback for Camp participant. What participant say about our camp!
      </p>
      <div className="mt-7">
        <ScrollCarousel speed={10}>
          {feedback?.data?.map((e, i) => (
            <TestimonialCar key={i} feedback={e} />
          ))}
        </ScrollCarousel>
      </div>
    </div>
  );
};

export default Testimonial;

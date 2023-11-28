import { Helmet } from "react-helmet";
import HomeBanner from "../components/banner/HomeBanner";
import Testimonial from "../components/Testimonial";
import PopulerMedicalCamp from "../components/PopulerMedicalCamp";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>CampHUB | Home</title>
      </Helmet>
      <HomeBanner />
      <PopulerMedicalCamp />
      <Testimonial />
    </div>
  );
};

export default Home;

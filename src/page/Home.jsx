import { Helmet } from "react-helmet";
import HomeBanner from "../components/banner/HomeBanner";
import Testimonial from "../components/Testimonial";
import PopulerMedicalCamp from "../components/PopulerMedicalCamp";
import ShowCase from "../components/ShowCase";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>CampHUB | Home</title>
      </Helmet>
      <HomeBanner />
      <PopulerMedicalCamp />
      <ShowCase />
      <Testimonial />
    </div>
  );
};

export default Home;

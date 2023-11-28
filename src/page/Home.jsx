import { Helmet } from "react-helmet";
import HomeBanner from "../components/banner/HomeBanner";
import Testimonial from "../components/Testimonial";
import PopulerMedicalCamp from "../components/PopulerMedicalCamp";
import ShowCase from "../components/ShowCase";
import UpcomingSection from "../dashboard/Organizer/card/UpcomingSection";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>CampHUB | Home</title>
      </Helmet>
      <HomeBanner />
      <PopulerMedicalCamp />
      <ShowCase />
      <UpcomingSection />
      <Testimonial />
    </div>
  );
};

export default Home;

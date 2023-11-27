import { Helmet } from "react-helmet";
import HomeBanner from "../components/banner/HomeBanner";
import Testimonial from "../components/Testimonial";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>CampHUB | Home</title>
      </Helmet>
      <HomeBanner />
      <Testimonial />
    </div>
  );
};

export default Home;

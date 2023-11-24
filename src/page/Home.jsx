import { Helmet } from "react-helmet";
import HomeBanner from "../components/banner/HomeBanner";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>CampHUB | Home</title>
      </Helmet>
      <HomeBanner />
    </div>
  );
};

export default Home;

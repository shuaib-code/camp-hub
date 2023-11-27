import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

const HomeBanner = () => {
  return (
    <div className="bg-bottom bg-fixed rounded h-96 bg-[url('https://img.freepik.com/free-photo/flat-lay-health-still-life-arrangement-with-copy-space_23-2148854064.jpg?w=1380&t=st=1701071677~exp=1701072277~hmac=7d217d1ecd2c49a38e6af255209bc63b552b2098a9521d2b453fc88ffdab2514')]">
      <div className="flex items-center rounded justify-center h-96 bg-[#0000006d]">
        <div className="space-y-2">
          <p className="text-white/80 font-medium text-lg italic text-center">
            <TypeAnimation
              sequence={[
                // Same substring at the start will only be typed out once, initially
                "Seamless.",
                1000, // wait 1s before replacing "Mice" with "Hamsters"
                "Smart.",
                1000,
                "Secure.",
                1000,
              ]}
              wrapper="span"
              speed={200}
              style={{ fontSize: "16px", display: "inline-block" }}
              repeat={Infinity}
            />
          </p>
          <h1 className="text-3xl text-center text-white font-semibold">
            Camp<span className="text-primary">HUB</span>: Transforming
            Healthcare Event Management
          </h1>
          <p className="text-center text-gray-50">
            Experience the Future of Medical Camps with CampHUB!
          </p>
          <div className="flex justify-center pt-7">
            <Link to="/availableCamp">
              <button className="btn-small">Explore CampHUB</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;

const WelcomeBanner = () => {
  return (
    <div className="bg-[#1C2536] md:h-screen lg:h-screen bg-no-repeat bg-[url('https://material-kit-pro-react.devias.io/assets/gradient-bg.svg')]">
      <div className="p-5 py-10 flex-row justify-center items-center md:p-20 lg:p-64 space-y-11">
        <h1 className="text-4xl font-bold text-white">
          Welcome to Camp <span className="text-primary">HUB</span>
        </h1>
        <p className="text-gray-400">
          CampHUB is your all-in-one solution for seamless medical camp
          management. From streamlined registrations to real-time scheduling and
          comprehensive reporting, CampHUB ensures every healthcare event is a
          success.
        </p>
        <p className="text-white font-medium">
          Join to our Camp
          <span className="text-primary">HUB</span>
        </p>
      </div>
    </div>
  );
};

export default WelcomeBanner;

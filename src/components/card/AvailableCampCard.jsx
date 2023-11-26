import RegisterModal from "../RegisterModal";

const AvailableCampCard = ({ camp }) => {
  const { image, campName, date, time, fee, location, target, _id } = camp;
  return (
    <div className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img className="rounded-t-lg" src={image} alt="" />

      <div className="p-5">
        <h2 className="text-lg font-semibold">{campName}</h2>
        <p>Camp Fee: {fee}</p>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
        <p>Audience: {target}</p>
        <p>Venue: {location}</p>
        <div className="mt-4 flex justify-end">
          <RegisterModal camp={camp} />
        </div>
      </div>
    </div>
  );
};

export default AvailableCampCard;

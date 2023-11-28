import moment from "moment";
import ReactStars from "react-rating-stars-component";

const TestimonialCar = ({ feedback }) => {
  const { campName, image, name, date, ratings, feedback: review } = feedback;
  let nubmberOfPage = parseInt(ratings);
  if (nubmberOfPage > 5) {
    nubmberOfPage = 5;
  }
  const fromNow = moment(date).fromNow();
  return (
    <div className="w-80 border p-4 rounded-lg border-primary">
      <figure className="">
        <div className="flex items-center mb-4 text-yellow-300">
          <ReactStars
            count={5}
            value={nubmberOfPage}
            edit={false}
            size={24}
            activeColor="#16B364"
          />
        </div>
        <blockquote>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {review}
          </p>
        </blockquote>
        <p>{campName}</p>
        <figcaption className="flex items-center mt-6 space-x-3 rtl:space-x-reverse">
          <img
            className="w-6 h-6 rounded-full"
            src={image}
            alt="profile picture"
          />
          <div className="flex items-center divide-x-2 rtl:divide-x-reverse divide-gray-300 dark:divide-gray-700">
            <cite className="pe-3 font-medium text-gray-900 dark:text-white">
              {name}
            </cite>
            <cite className="ps-3 text-sm text-gray-500 dark:text-gray-400">
              {fromNow}
            </cite>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default TestimonialCar;

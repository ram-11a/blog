import Image from "/public/kashi.jpg";
import { Link, Links } from "react-router-dom";
import { BentoTilt } from "./Effects";

const FeaturedPosts = () => {
  return (
    <div className="mt-0 md:mt-3 flex flex-col lg:flex-row gap-8">
      {/* Featured post */}

      <div className="w-full lg:w-1/2 flex flex-col gap-4">
        {/* image */}

        <img
          src="public\kashi.jpg"
          alt=""
          className="rounded-3xl object-cover"
        />

        {/* details */}
        <div className="flex items-center gap-4">
          <Link className="text-blue-800 lg:text-lg">History</Link>
          <span className="text-gray-600">2 days ago</span>
        </div>
        {/* title */}
        <Link
          to="/test"
          className="text-xl lg:text-3xl font-semibold lg:font-bold"
        >
          This is the most imp post
        </Link>
      </div>
    </div>
  );
};

export default FeaturedPosts;

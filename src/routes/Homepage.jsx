import { Link } from "react-router-dom";
import FeaturedPosts from "../components/FeaturedPosts";
import PostList from "../components/PostList";

const Homepage = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Breadcrumbs */}
      <div className="flex gap-4">
        <span>•</span>
        <span>•</span>
        <span>•</span>
      </div>
      {/* Intro */}
      <div className="flex items-center justify-between">
        {/*titles */}
        <div className="">
          <h1 className="text-green-950 text-2xl md:text-5xl lg:text-6xl  font-semibold">
            <div>
              <i>"Writing is the painting of the voice."</i>{" "}
            </div>
          </h1>
        </div>
      </div>
      {/* Featured posts */}
      <FeaturedPosts />
      {/* Posts */}
      <div>
        <h1 className="my-12 text-2xl text-gray-600">Recent Posts</h1>
        <PostList />
      </div>
    </div>
  );
};

export default Homepage;

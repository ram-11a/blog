import { Link, useParams } from "react-router-dom";
import PostMenuActions from "../components/PostMenuActions";
import { useQuery } from "@tanstack/react-query";
import Search from "../components/Search";
import axios from "axios";
import { format } from "timeago.js";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "Loading...";
  if (error) return "Something went wrong!" + error.message;
  if (!data) return "Post not found!";

  return (
    <div className="flex flex-col gap-8 md:px-40">
      {/* Content */}
      <div className="flex flex-col md:flex-row gap-12">
        {/* Title Image and details */}
        <div className="flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span>Written By</span>
            <Link>{data.user.username}</Link>
            <span>on</span>
            <Link>{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <div>
            <img src="temple.jpg" alt="" className="rounded-2xl md:w-1/2" />
          </div>

          {/* text */}
          <div
            className="lg:text-lg flex flex-col gap-6 text-justify"
            dangerouslySetInnerHTML={{ __html: data.content }}
          ></div>
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-20 py-20 ">
          <div className="px-4 py-4 bg-white bg-opacity-30 shadow-lg rounded-2xl">
            <h1 className="mb-4 text-sm font-medium">Author</h1>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-8">
                <img
                  src={data.user.img}
                  className="w-12 h-12 rounded-full object-cover"
                  width="48"
                  height="48"
                />
                <Link>{data.user.username}</Link>
              </div>
              <div className="">
                <p className="text-sm text-gray-500">🖊️ Contributor </p>
              </div>
            </div>
            <PostMenuActions post={data} />
            <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
            <div className="flex flex-col gap-2 text-sm">
              <Link className="underline">All</Link>
              <Link className="underline">History</Link>
              <Link className="underline">Dharma</Link>
              <Link className="underline">Priya</Link>
            </div>
            <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;

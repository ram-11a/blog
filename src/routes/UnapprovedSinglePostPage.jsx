import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { format } from "timeago.js";
import AdminPostMenuActions from "../components/admin/AdminPostMenuActions";

const fetchPost = async (slug) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/admin/posts/${slug}`
  );
  return res.data;
};

const UnapprovedSinglePostPage = () => {
  const { slug } = useParams();
  const { data, error, isLoading } = useQuery({
    queryKey: ["unapprovedPost", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isLoading) return "Loading...";
  if (error) return "Something went wrong!";

  return (
    <div className="flex flex-col gap-8 md:px-40">
      <div className="flex flex-col md:flex-row gap-12">
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
          <div className="lg:text-lg flex flex-col gap-6 text-justify">
            {data.content}
          </div>
          <AdminPostMenuActions post={data} />
        </div>
      </div>
    </div>
  );
};

export default UnapprovedSinglePostPage;

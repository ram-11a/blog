import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { BentoTilt } from "../Effects";

const UnapprovedPostListItem = ({ post }) => {
  return (
    <BentoTilt>
      <div className="bg-white bg-opacity-30 shadow-lg rounded-2xl p-6 flex flex-col xl:flex-row gap-8">
        {/* image */}
        <div className="md:hidden xl:block xl:w-1/3">
          <Link to={`/admin/posts/${post.slug}`}>
            <img src="temple.jpg" alt="" className="rounded-2xl object-cover" />
          </Link>
        </div>
        {/* details */}
        <div className="flex flex-col gap-4 xl:w-2/3">
          <Link
            to={`/admin/posts/${post.slug}`}
            className="text-4xl font-semibold"
          >
            {post.title}
          </Link>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>By</span>
            <Link className="text-blue-800">{post.user.username}</Link>
            <span>On</span>
            <Link className="text-blue-800">{post.category}</Link>
            <span>{format(post.createdAt)}</span>
          </div>
          <p>{post.desc}</p>
          <Link
            to={`/admin/posts/${post.slug}`}
            className="underline text-blue-800 text-sm"
          >
            Read More
          </Link>
        </div>
      </div>
    </BentoTilt>
  );
};

export default UnapprovedPostListItem;

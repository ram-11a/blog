import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { BentoTilt } from "./Effects";

const PostListItem = ({ post }) => {
  return (
    <BentoTilt>
      <div className="bg-white bg-opacity-30 shadow-lg rounded-2xl overflow-hidden flex flex-col h-[400px]">
        {/* image */}
        <Link to={`/${post.slug}`} className="flex-1 relative">
          <img
            src="temple.jpg"
            alt=""
            className="w-full h-full object-cover"
            style={{ minHeight: 0, minWidth: 0, height: "100%", width: "100%" }}
          />
          {/* Overlay for text */}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="text-white text-2xl font-semibold mb-2">
              {post.title}
            </div>
            <div className="flex items-center gap-2 text-gray-200 text-sm mb-2">
              <span>By</span>
              <span className="text-blue-200">{post.user.username}</span>
              <span>On</span>
              <span className="text-blue-200">{post.category}</span>
              <span>{format(post.createdAt)}</span>
            </div>
            <p className="text-gray-100 text-sm mb-1 line-clamp-2">
              {post.desc}
            </p>
            <Link
              to={`/${post.slug}`}
              className="underline text-blue-200 text-xs"
            >
              Read More
            </Link>
          </div>
        </Link>
      </div>
    </BentoTilt>
  );
};

export default PostListItem;

import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPosts = async (pageParam) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 9 },
  });
  return res.data;
};

const PostList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, pages) =>
        lastPage.hasMore ? pages.length + 1 : undefined,
      keepPreviousData: true,
    });

  if (status === "loading") return "Loading...";
  if (status === "error") return "Something went wrong!";

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {allPosts.map((post) => (
          <PostListItem key={post._id} post={post} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        {hasNextPage ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              fetchNextPage();
            }}
            disabled={isFetchingNextPage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        ) : (
          <p className="text-gray-500">End</p>
        )}
      </div>
    </div>
  );
};

export default PostList;

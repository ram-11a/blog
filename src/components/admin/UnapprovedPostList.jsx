import UnapprovedPostListItem from "./UnapprovedPostListItem";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
// import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

const fetchPosts = async (pageParam, searchParams) => {
  // const searchParamsObj = Object.fromEntries([...searchParams]);

  // console.log(searchParamsObj);

  const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/posts`, {
    params: { page: pageParam, limit: 10 },
  });
  return res.data;
};

const UnapprovedPostList = () => {
  // const [searchParams, setSearchParams] = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
    keepPreviousData: true,
  });

  // console.log(data);

  if (status === "loading") return "Loading...";
  if (status === "error") return "Something went wrong!";

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <div className="flex flex-col gap-12 mb-8">
      {allPosts.map((post) => (
        <UnapprovedPostListItem key={post._id} post={post} />
      ))}
      <div className="flex justify-center mt-4">
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

export default UnapprovedPostList;

import Post from "@/components/post";
import { useGetUserPostsQuery } from "@/redux/api";
import React from "react";

interface Props {
  userId?: number;
}

export default function UserPosts({ userId }: Props) {
  const {
    data: posts,
    isLoading,
    error,
  } = useGetUserPostsQuery(`${userId}`, {
    skip: !userId,
  });

  if (isLoading) {
    return <div className="text-center py-8">Loading Posts...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">Something Went wrong</div>
    );
  }

  if (!posts?.length) return <div className="text-center py-8">No posts.</div>;

  return (
    <>
      <h2 className="text-xl font-black mb-4">User Posts ({posts.length})</h2>
      <div className="grid grid-cols-2 gap-4">
        {posts?.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}

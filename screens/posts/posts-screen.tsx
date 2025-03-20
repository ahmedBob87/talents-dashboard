"use client";

import React from "react";
import { useGetPostsQuery } from "@/redux/api";
import Post from "@/components/post";

export default function PostList() {
  const { data: posts, isLoading, error } = useGetPostsQuery();

  if (isLoading) {
    return <div className="text-center py-8">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">Something Went wrong</div>
    );
  }

  if (!posts?.length)
    return <div className="text-center py-8">No Posts yet</div>;

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

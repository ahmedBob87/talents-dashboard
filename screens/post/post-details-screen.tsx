"use client";

import CommentForm from "@/components/comments-form";
import CommentList from "@/components/comments-list";
import { useGetPostByIdQuery, useGetUserByIdQuery } from "@/redux/api";
import Link from "next/link";
import PostUser from "./components/post-user";

export default function PostDetailPage({ id }: { id: string }) {
  const {
    data: post,
    isLoading: isLoadingPost,
    error: postError,
  } = useGetPostByIdQuery(id);

  if (isLoadingPost)
    return <div className="text-center py-8">Loading post...</div>;

  if (postError)
    return (
      <div className="text-center text-red-500 py-8">Error loading post</div>
    );

  return (
    <div className="mt-4">
      <Link
        href="/posts"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Posts
      </Link>

      <h1 className="text-3xl font-bold capitalize mb-2">{post.title}</h1>

      <PostUser userId={post.userId} />

      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <p className="text-lg whitespace-pre-line">{post.body}</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <CommentList postId={id} />
      </div>

      <CommentForm postId={id} />
    </div>
  );
}

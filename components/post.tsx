import { IPost } from "@/redux/api";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

interface Props {
  post: IPost;
}

export default function Post(props: Props) {
  const { post } = props;

  if (!post) return null;

  return (
    <div
      key={post.id}
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
    >
      <h2 className="text-lg font-bold capitalize mb-2 truncate">
        {post.title}
      </h2>
      <p className="text-gray-600 mb-4 line-clamp-3">{post.body}</p>
      <Link href={`/posts/${post.id}`}>
        <Button className="cursor-pointer">View Details</Button>
      </Link>
    </div>
  );
}

import PostDetailPage from "@/screens/post/post-details-screen";
import React from "react";

type Params = Promise<{ id: string }>;

async function PostPage({ params }: { params: Params }) {
  const { id } = await params;
  return <PostDetailPage id={id} />;
}

export default PostPage;

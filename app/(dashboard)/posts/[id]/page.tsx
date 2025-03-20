import PostDetailPage from "@/screens/post/post-details-screen";
import React from "react";

function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;
  return <PostDetailPage id={id} />;
}

export default PostPage;

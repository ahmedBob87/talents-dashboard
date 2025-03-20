"use client";

import { useGetUserByIdQuery, useGetUserPostsQuery } from "@/redux/api";
import Link from "next/link";
import UserCard from "./components/user-card";
import UserPosts from "./components/user-posts";

export default function SingleUserScreen({ id }: { id: string }) {
  const { data, isLoading, error } = useGetUserByIdQuery(id);

  if (isLoading) {
    return <div className="text-center py-8">Loading User...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">Something Went wrong</div>
    );
  }

  if (!data)
    return <div className="text-center text-red-500 py-8">No user</div>;

  return (
    <div className="mt-4">
      <Link
        href="/users"
        className="text-blue-500 hover:underline mb-4 inline-block"
      >
        &larr; Back to Users
      </Link>

      <UserCard user={data} />
      <UserPosts userId={data.id} />
    </div>
  );
}

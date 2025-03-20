"use client";
import { useGetUsersQuery } from "@/redux/api";
import React from "react";
import { UserCard } from "./ components/user-card";

export default function UserList() {
  const { data: users, isLoading, error } = useGetUsersQuery();

  if (isLoading)
    return <div className="text-center py-8">Loading users...</div>;

  if (error)
    return (
      <div className="text-center text-red-500 py-8">Error loading users</div>
    );

  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="grid gap-4 md:grid-cols-2 ">
        {users?.map((user) => (
          <UserCard user={user} key={user.id} />
        ))}
      </div>
    </div>
  );
}

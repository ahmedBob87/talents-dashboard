import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  tagTypes: ["Post", "User", "Comment"],
  endpoints: (builder) => ({
    getPosts: builder.query<IPost[], void>({
      query: () => "/posts",
      providesTags: (result: any) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({ type: "Post", id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),

    getUserById: builder.query<IUser, string>({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),

    getUsers: builder.query<IUser[], void>({
      query: () => "/users",
      providesTags: (result: any) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({ type: "User", id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    getUserPosts: builder.query<IPost[], string>({
      query: (id) => `/users/${id}/posts`,
      providesTags: (result: any) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({ type: "Post", id })),
              { type: "Post", id: "LIST" },
            ]
          : [{ type: "Post", id: "LIST" }],
    }),

    getCommentsByPostId: builder.query({
      query: (postId) => `/posts/${postId}/comments`,
      providesTags: (result, error, postId) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({
                type: "Comment",
                id,
              })),
              { type: "Comment", id: `POST_${postId}` },
            ]
          : [{ type: "Comment", id: `POST_${postId}` }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetUserByIdQuery,
  useGetUsersQuery,
  useGetUserPostsQuery,
  useGetCommentsByPostIdQuery,
} = api;

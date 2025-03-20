import { useGetUserByIdQuery } from "@/redux/api";

interface Props {
  userId: string;
}

export default function PostUser(props: Props) {
  const { userId } = props;

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserByIdQuery(userId, {
    skip: !userId,
  });
  if (isLoading)
    return (
      <div className="mb-4 bg-slate-100 p-4 rounded-lg animate-pulse">
        Loading user...
      </div>
    );
  if (!user || error) return null;

  return (
    <div className="mb-4 bg-slate-100 p-4 rounded-lg">
      <h2 className="font-medium text-lg">Posted by</h2>
      <p className="font-bold">{user.name}</p>
      <p className="text-gray-600">{user.email}</p>
    </div>
  );
}

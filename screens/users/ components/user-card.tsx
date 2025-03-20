import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IUser } from "@/redux/api";
import Image from "next/image";
import Link from "next/link";

interface Props {
  user: IUser;
}

export function UserCard(props: Props) {
  const { user } = props;

  return (
    <Card className="p-2 ">
      <CardHeader className="px-2 py-0 gap-0">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image
              src="/user-icon.png"
              width={50}
              height={50}
              alt={user.name}
            />
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>@{user.username}</CardDescription>
            </div>
          </div>
          <Button size="sm" className="cursor-pointer">
            <Link href={`/users/${user.id}`}>View Details</Link>
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}

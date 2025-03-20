import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IUser } from "@/redux/api";
import Image from "next/image";
import { buildAddress } from "@/lib/build-address";

interface Props {
  user: IUser;
}

export default function UserCard(props: Props) {
  const { user } = props;

  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex gap-2 items-center">
          <Image src="/user-icon.png" width={50} height={50} alt={user.name} />
          <div>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>@{user.username}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="text-sm grid gap-1">
        <CardRow label="Email" text={user.email} />
        <CardRow label="phone" text={user.phone} />
        <CardRow label="address" text={buildAddress(user.address)} />
        <CardRow label="zipCode" text={user.address.zipcode} />
        <CardRow label="website" text={user.website} />
        <CardRow label="Company" text={user.company.name} />
      </CardContent>
    </Card>
  );
}

function CardRow({ label, text }: { label: string; text: string }) {
  return (
    <div className="grid grid-cols-4 ">
      <span className="text-gray-500  capitalize">{label} </span>
      <span className="col-span-3">{text}</span>
    </div>
  );
}

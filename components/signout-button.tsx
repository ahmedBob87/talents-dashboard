"use client";

import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignoutButton() {
  const { data: session } = useSession();

  return (
    <>
      {session?.user && (
        <Button variant='secondary' className="cursor-pointer" size='sm' onClick={() => signOut({ callbackUrl: "/" })} >
          Sign out
        </Button>
      )}
    </>
  );
}

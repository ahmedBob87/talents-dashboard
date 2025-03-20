import SignoutButton from "@/components/signout-button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="py-4 sticky top-0 bg-white shadow">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <Link href="/posts">Posts</Link>
              <Link href="/users">Users</Link>
            </div>
            <SignoutButton />
          </div>
        </div>
      </div>

      <div className="container mx-auto">{children}</div>
    </>
  );
}

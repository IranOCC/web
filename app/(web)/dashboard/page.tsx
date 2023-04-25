"use client";

import { signOut, useSession } from "next-auth/react";

export default function Page() {
  const { data } = useSession();
  return (
    <div>
      Dashboard
      <br />
      {data?.accessToken}
      <br />
      <button
        className="bg-red-500"
        onClick={async () => {
          await signOut({ callbackUrl: "/", redirect: true });
        }}
      >
        Logout
      </button>
    </div>
  );
}

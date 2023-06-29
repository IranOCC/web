"use client";

import { signOut } from "next-auth/react";

export default function Page() {
  return (
    <h1 className="m-2 text-4xl font-bold text-red-500 text-center">
      Panel Profile
      <button
        className="bg-red-100"
        onClick={async () => {
          await signOut({ callbackUrl: "/", redirect: true });
        }}
      >
        Logout
      </button>
    </h1>
  );
}

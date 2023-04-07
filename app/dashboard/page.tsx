"use client";

import { signOut } from "next-auth/react";

export default function Page() {
  return (
    <div>
      Dashboard
      <br />
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

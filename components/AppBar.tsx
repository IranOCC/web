"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

const AppBar = () => {
  return (
    <>
      <Link href="/">Home</Link>
      <br />
      <Link href="/admin">Admin</Link>
      <br />
      <Link href="/blog">Blog</Link>
      <br />
      <Link href="/user">User</Link>
      <br />
      <button onClick={() => signIn()}>Login</button>
      <br />
      <button
        onClick={async () => {
          const a = await signOut({ callbackUrl: "/", redirect: true });
          console.log(a);
        }}
      >
        Logout
      </button>
      <br />
    </>
  );
};

export default AppBar;

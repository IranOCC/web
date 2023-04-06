"use client";

import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";

const Page = () => {
  const { status, data: session } = useSession();

  const apiService = useAxiosAuth();
  return (
    <>
      admin
      <br />
      {status}
      {session?.user.firstName}
      <br />
      {session?.accessToken}
      <br />
      <button
        onClick={() => {
          apiService.get("/auth");
        }}
      >
        Click me
      </button>
    </>
  );
};

export default Page;

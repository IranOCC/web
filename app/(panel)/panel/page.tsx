"use client";

import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Page() {
  const { data: session, update } = useSession();
  const api = useAxiosAuth();
  const getMe = async () => {
    const me = await api.get("/auth").catch();
    await update({ user: me.data });
  };

  return (
    <>
      <pre dir="ltr" className="break-words whitespace-normal">
        {JSON.stringify(session)}
      </pre>
      <button onClick={getMe}>Update ME</button>
    </>
  );
}

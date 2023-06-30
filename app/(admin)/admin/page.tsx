"use client";

import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import { useContext, useEffect } from "react";

export default function Page() {
  const { user } = useContext(CurrentUserContext) as CurrentUserContextType;

  return (
    <>
      <pre dir="ltr" className="break-words whitespace-normal">
        {JSON.stringify(user)}
      </pre>
    </>
  );
}

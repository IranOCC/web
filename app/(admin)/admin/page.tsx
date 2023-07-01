"use client";

import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import { useContext, useEffect } from "react";

export default function Page() {
  const { user } = useContext(CurrentUserContext) as CurrentUserContextType;

  return (
    <>
      <div className="text-center">داشبورد</div>
    </>
  );
}

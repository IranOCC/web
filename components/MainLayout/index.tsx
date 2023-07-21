"use client";

import { ReactNode, useContext, useEffect } from "react";
import { ThemeContext, ThemeContextType } from "@/context/theme.context";
import { LoadingContext, LoadingContextType } from "@/context/loading.context";
import { useSession } from "next-auth/react";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import CompleteProfileModal from "../Modals/CompleteProfileModal";
import RolesConflictModal from "../Modals/RolesConflictModal";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { darkMode } = useContext(ThemeContext) as ThemeContextType;
  const { hideLoading } = useContext(LoadingContext) as LoadingContextType;
  const { setUser } = useContext(CurrentUserContext) as CurrentUserContextType;

  const { status: sessionStatus } = useSession();
  const api = useAxiosAuth();
  const getMe = async () => {
    try {
      const me = await api.get("/auth");
      setUser(me.data);
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };

  useEffect(() => {
    if (sessionStatus === "authenticated") getMe();
    else if (sessionStatus === "unauthenticated") hideLoading();
  }, [sessionStatus]);

  return (
    <body lang="fa" dir="rtl" className={"font-rubik select-none scroll-smooth bg-gray-300/50 selection:bg-yellow-200 selection:text-yellow-900 print:hidden" + (darkMode ? " dark" : "")}>
      {children}
      <CompleteProfileModal />
      <RolesConflictModal />
    </body>
  );
};

export default MainLayout;

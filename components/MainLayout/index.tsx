"use client";

import { ReactNode, useContext, useEffect } from "react";
import { ThemeContext, ThemeContextType } from "@/context/theme.context";
import { LoadingContext, LoadingContextType } from "@/context/loading.context";
import { useSession } from "next-auth/react";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import CompleteProfileModal from "../Modals/CompleteProfileModal";
import RolesConflictModal from "../Modals/RolesConflictModal";
import Loading from "../Loading";
import LoginModal from "../Modals/LoginModal";
import { NextUIProvider } from "@nextui-org/react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { darkMode } = useContext(ThemeContext) as ThemeContextType;
  const { hideLoading, isLoading } = useContext(LoadingContext) as LoadingContextType;
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
    <body lang="fa" dir="rtl" className={"select-none scroll-smooth bg-gray-300/50 selection:bg-yellow-200 selection:text-yellow-900 print:hidden" + (darkMode ? " dark" : "")}>
      <NextUIProvider className="h-full">
        {isLoading ? <Loading /> : children}
        <CompleteProfileModal />
        <RolesConflictModal />
        <LoginModal />
      </NextUIProvider>
    </body>
  );
};

export default MainLayout;

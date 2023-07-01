"use client";

import { ReactNode, useContext, useEffect } from "react";
import { ThemeContext, ThemeContextType } from "@/context/theme.context";
import { LoadingContext, LoadingContextType } from "@/context/loading.context";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import Modal from "../Modals";
import CompleteProfileModal from "../Modals/CompleteProfileModal";

const MainLayout = ({ children }: { children: ReactNode }) => {
  const { darkMode } = useContext(ThemeContext) as ThemeContextType;
  const { hideLoading } = useContext(LoadingContext) as LoadingContextType;
  const { user, setUser } = useContext(CurrentUserContext) as CurrentUserContextType;

  const { status: sessionStatus } = useSession();
  const api = useAxiosAuth();
  const getMe = async () => {
    try {
      const me = await api.get("/auth");
      setUser(me.data);
      hideLoading();
    } catch (error) {
      await signOut();
      hideLoading();
    }
  };
  useEffect(() => {
    if (sessionStatus === "authenticated") getMe();
    else if (sessionStatus === "unauthenticated") hideLoading();
  }, [sessionStatus]);

  return (
    <body lang="fa" dir="rtl" className={"select-none bg-gray-200 selection:bg-yellow-200 selection:text-yellow-900 font-rubik print:hidden scroll-smooth" + (darkMode ? " dark" : "")}>
      {children}
      <CompleteProfileModal />
      {/*  */}
    </body>
  );
};

export default MainLayout;

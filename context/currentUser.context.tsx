"use client";

import { User } from "@/types/interfaces";
import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect } from "react";

export type CurrentUserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const CurrentUserContext = React.createContext<CurrentUserContextType | null>(null);

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, _setCurrentUser] = React.useState<User | null>(null);
  return (
    <CurrentUserContext.Provider value={{ user: currentUser, setUser: _setCurrentUser }}>
      {children}
      {/*  */}
    </CurrentUserContext.Provider>
  );
};

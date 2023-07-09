"use client";

import { UserRoles } from "@/types/enum";
import { Session, User } from "@/types/interfaces";
import { useSession } from "next-auth/react";
import React, { ReactNode, useEffect } from "react";

export type CurrentUserContextType = {
  user: User | null;
  roles?: UserRoles[];
  isSuperAdmin: boolean;
  isAdmin: boolean;
  isAgent: boolean;
  isAuthor: boolean;
  isUser: boolean;
  setUser: (user: User | null) => void;
};

export const CurrentUserContext = React.createContext<CurrentUserContextType | null>(null);

// @ DON'T GET USER ROLES FROM CURRENT USER, GET IT FROM SESSION ONLY FOR SYNCING WITH JWT
export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [currentUser, _setCurrentUser] = React.useState<User | null>(null);

  const value = {
    user: currentUser,
    roles: session?.user.roles,
    isSuperAdmin: !!session?.user?.roles.includes(UserRoles.SuperAdmin),
    isAdmin: !!session?.user?.roles.includes(UserRoles.Admin),
    isAgent: !!session?.user?.roles.includes(UserRoles.Agent),
    isAuthor: !!session?.user?.roles.includes(UserRoles.Author),
    isUser: !!session?.user?.roles.includes(UserRoles.User),
    setUser: _setCurrentUser,
  };

  return (
    <>
      <CurrentUserContext.Provider value={value}>
        {children}
        {/*  */}
      </CurrentUserContext.Provider>
    </>
  );
};

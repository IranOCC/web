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

  const _sUser = session?.user as User;
  const value = {
    user: currentUser,
    roles: _sUser?.roles,
    isSuperAdmin: !!_sUser?.roles.includes(UserRoles.SuperAdmin),
    isAdmin: !!_sUser?.roles.includes(UserRoles.Admin),
    isAgent: !!_sUser?.roles.includes(UserRoles.Agent),
    isAuthor: !!_sUser?.roles.includes(UserRoles.Author),
    isUser: !!_sUser?.roles.includes(UserRoles.User),
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

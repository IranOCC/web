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
// For a bug in session we use current user
// instead we sign out if session roles not equal with real roles
export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [currentUser, _setCurrentUser] = React.useState<User | null>(null);

  // const _sUser = session?.user as User;
  const value = {
    user: currentUser,
    roles: currentUser?.roles,
    isSuperAdmin: !!currentUser?.roles.includes(UserRoles.SuperAdmin),
    isAdmin: !!currentUser?.roles.includes(UserRoles.Admin),
    isAgent: !!currentUser?.roles.includes(UserRoles.Agent),
    isAuthor: !!currentUser?.roles.includes(UserRoles.Author),
    isUser: !!currentUser?.roles.includes(UserRoles.User),
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

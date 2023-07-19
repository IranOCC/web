"use client";

import React, { ReactNode } from "react";

export type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children, initial }: { children: ReactNode; initial?: { dark: boolean } }) => {
  const [darkMode, setDarkMode] = React.useState<boolean>(initial?.dark || false);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
      {/*  */}
    </ThemeContext.Provider>
  );
};

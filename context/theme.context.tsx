"use client";

import { NextFont } from "next/dist/compiled/@next/font";
import React, { ReactNode } from "react";

export type ThemeContextType = {
  darkMode: boolean;
  toggleTheme: () => void;

  fontFamily: NextFont | null;
  setFontFamily: (f: NextFont) => void;
};

export const ThemeContext = React.createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children, initial }: { children: ReactNode; initial?: { dark: boolean; fontFamily: NextFont } }) => {
  const [darkMode, setDarkMode] = React.useState<boolean>(initial?.dark || false);
  const [fontFamily, setFontFamily] = React.useState<NextFont | null>(initial?.fontFamily || null);

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  return <ThemeContext.Provider value={{ darkMode, toggleTheme, fontFamily, setFontFamily }}>{children}</ThemeContext.Provider>;
};

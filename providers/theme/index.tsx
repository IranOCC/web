import { createContext, ReactNode, useContext, useState } from "react";

const Context = createContext({});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState("light");
  const state = {
    theme,
  };
  const dispatch = {
    setTheme,
  };
  return <Context.Provider value={{ ...state, ...dispatch }}>{children}</Context.Provider>;
}

export function useThemeContext() {
  return useContext(Context);
}

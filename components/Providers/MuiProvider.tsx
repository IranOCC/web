"use client";

import { createTheme, ThemeProvider } from "@mui/material";
import { ReactNode } from "react";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const MuiProvider = ({ children, style }: { children: ReactNode; style: any }) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "rgb(255 230 0)",
      },
    },
    direction: "rtl",
    typography: { ...style },
  });

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        {/*  */}
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
};

export default MuiProvider;

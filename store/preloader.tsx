"use client";

import { useRef } from "react";
import { store } from ".";
import { setToken } from "@/store/auth";

function Preloader({ token }: { token: string | null }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setToken(token));
    loaded.current = true;
  }
  return null;
}

export default Preloader;

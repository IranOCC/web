"use client";

import { store } from "@/store";
import { setSettings } from "@/store/settings";
import { Settings } from "@/types/interfaces";
import { useRef } from "react";

function Preloader({ settings }: { settings: Settings }) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setSettings(settings));
    loaded.current = true;
  }
  return null;
}

export default Preloader;

"use client";

import { useContext } from "react";
import { LoadingContext, LoadingContextType } from "@/context/loading.context";
import styles from "./style.module.css";

const Loading = () => {
  const { isLoading, label } = useContext(LoadingContext) as LoadingContextType;
  if (!isLoading) return null;
  return (
    <div className={styles.loader_wrap}>
      <div className={styles.loader_content}>
        <div className={styles.loader_inner}>
          <svg>
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
                <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2" result="gooey" />
                <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
              </filter>
            </defs>
          </svg>
        </div>
        {label && <span className={styles.loader_text}>{label}</span>}
      </div>
    </div>
  );
};
export default Loading;

const LoadingWithoutBg = ({ label }: any) => {
  return (
    <div className={styles.loader_content}>
      <div className={styles.loader_inner}>
        <svg>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
              <feColorMatrix in="blur" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2" result="gooey" />
              <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
            </filter>
          </defs>
        </svg>
      </div>
      {label && <span className={styles.loader_text}>{label}</span>}
    </div>
  );
};
export { LoadingWithoutBg };

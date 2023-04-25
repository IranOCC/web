import styles from "./style.module.css";

const Loading = ({ label = "در حال بارگذاری ..." }: { label?: string }) => {
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

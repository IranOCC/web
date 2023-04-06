import styles from "./style.module.css";
import Image from "next/image";
import LogoImage from "@/assets/images/logo.png";

const Logo = () => {
  return (
    <div className={styles.logo_holder}>
      <a href="/">
        <Image src={LogoImage} alt="Web logo" height={30} />
      </a>
    </div>
  );
};

export default Logo;

import styles from "./style.module.css";
import { Menu } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell, faGlobe } from "@fortawesome/free-solid-svg-icons";

const UserCenter = () => {
  return (
    <>
      <Menu
        mode="horizontal"
        selectable={false}
        style={{ width: 200, borderBottom: 0 }}
        items={[
          {
            key: "1",
            label: "ورود",
            icon: <FontAwesomeIcon icon={faUser} size="1x" color="#3270FC" />,
          },
          {
            key: "2",
            // label: "",
            icon: <FontAwesomeIcon icon={faBell} size="1x" color="#3270FC" />,
          },
          {
            key: "12",
            // label: "",
            icon: <FontAwesomeIcon icon={faGlobe} size="1x" color="#3270FC" />,
          },
        ]}
      />
    </>
  );
};

export default UserCenter;

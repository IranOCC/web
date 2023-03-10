import styles from "./style.module.css";
import { Menu } from "antd";

const MainMenu = () => {
  const menuItems = [
    {
      _id: "1",
      title: "خانه",
      href: "/",
      children: [
        {
          _id: "2",
          title: "خانه",
          href: "/",
        },
        {
          _id: "3",
          title: "منوی یک",
          href: "/",
        },
        {
          _id: "4",
          title: "منوی دو",
          href: "/",
        },
        {
          _id: "5",
          title: "منوی سه",
          href: "/",
        },
      ],
    },
    {
      _id: "6",
      title: "لیست ها",
      href: "/",
      children: [
        {
          _id: "7",
          title: "خانه",
          href: "/",
        },
        {
          _id: "8",
          title: "منوی یک",
          href: "/",
        },
        {
          _id: "9",
          title: "منوی دو",
          href: "/",
        },
        {
          _id: "10",
          title: "منوی سه",
          href: "/",
          children: [
            {
              _id: "11",
              title: "زیر مجموعه",
              href: "/",
            },
          ],
        },
      ],
    },
    {
      _id: "12",
      title: "خبر",
      href: "/",
    },
    {
      _id: "13",
      title: "صفحات",
      href: "/",
      children: [
        {
          _id: "14",
          title: "خانه",
          href: "/",
        },
        {
          _id: "15",
          title: "منوی یک",
          href: "/",
        },
        {
          _id: "16",
          title: "منوی دو",
          href: "/",
        },
        {
          _id: "17",
          title: "منوی سه",
          href: "/",
        },
      ],
    },
  ];

  return (
    <>
      <Menu
        mode="horizontal"
        forceSubMenuRender
        inlineCollapsed={false}
        // selectable={false}
        style={{ width: 500, borderBottom: 0 }}
        items={menuItems?.map(({ _id, title, href, children }, index) => {
          return {
            key: _id,
            label: title,
            children: children?.map(({ _id, title, href, children }, index) => {
              return {
                key: _id,
                label: title,
                children: children?.map(({ _id, title, href }, index) => {
                  return {
                    key: _id,
                    label: title,
                  };
                }),
              };
            }),
          };
        })}
      />
    </>
  );
};

export default MainMenu;

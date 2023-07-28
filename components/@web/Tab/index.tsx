import Tab from "@/components/Tab";
import { ReactNode } from "react";

const WebTab = ({ data }: IProps) => {
  return (
    <Tab
      data={data}
      clx={{
        container: "py-3 !px-0",
        buttonList: "justify-between md:justify-center",
        button: "!w-full md:!w-auto px-4 !text-black !font-extrabold border-none",
        activeButton: "!font-extrabold rounded-t-xl !bg-white !text-black md:underline underline-offset-8 decoration-secondary decoration-2",
        notActiveButton: "!bg-transparent",
        panelList: "bg-white md:bg-transparent !mt-0 md:!mt-2 p-3 overflow-hidden",
        panel: "text-sm min-h-[20rem] overflow-x-hidden w-full h-full",
      }}
    />
  );
};

export default WebTab;

type IProps = {
  data: {
    //
    title: ReactNode;
    content: ReactNode;
    disabled?: boolean;
    clx?: { button?: string; panel?: string };
  }[];
};

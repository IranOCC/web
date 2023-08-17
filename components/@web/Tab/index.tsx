import Tab from "@/components/Tab";
import { ReactNode } from "react";

const WebTab = ({ data }: IProps) => {
  return (
    <Tab
      data={data}
      clx={{
        container: "py-3 !px-0 flex-1 flex flex-col",
        buttonList: "justify-between sticky top-0 z-20 bg-gray-200  md:bg-white md:justify-center",
        button: "!w-full md:!w-auto px-4 !text-black !font-extrabold border-none",
        activeButton: "!font-extrabold rounded-t-xl !bg-white !text-black md:underline underline-offset-8 decoration-secondary decoration-2",
        notActiveButton: "!bg-transparent",
        panelList: "bg-white rounded-b-xl md:bg-transparent !mt-0 md:!mt-2 p-3 flex-1",
        panel: "text-sm min-h-[20rem] w-full",
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

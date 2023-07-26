// @ts-ignore
import { Tab as TabComponent } from "@headlessui/react";
import React, { ReactNode } from "react";

const Tab = ({ data, clx }: IProps) => {
  return (
    <div className={[clx?.container, "w-full px-2 sm:px-0"].join(" ")}>
      <TabComponent.Group>
        <TabComponent.List className={[clx?.buttonList, "flex w-full space-x-1 space-x-reverse"].join(" ")}>
          {data.map(({ title }, idx) => (
            <TabComponent
              key={idx}
              className={({ selected }: { selected: boolean }) =>
                [
                  clx?.button,
                  "w-full border border-gray-200 py-2.5 text-sm font-medium leading-5",
                  "focus:outline-none focus:ring-0",
                  "text-slate-800 bg-white",
                  selected ? ["!bg-secondary !text-white", clx?.activeButton].join(" ") : "",
                  //
                ].join(" ")
              }
            >
              {title}
            </TabComponent>
          ))}
        </TabComponent.List>
        <TabComponent.Panels className={[clx?.panelList, "mt-2"].join(" ")}>
          {data.map(({ content }, idx) => (
            <TabComponent.Panel
              //
              key={idx}
              className={[clx?.panel, "ring-offset-0 focus:outline-none focus:ring-0"].join(" ")}
            >
              {content}
            </TabComponent.Panel>
          ))}
        </TabComponent.Panels>
      </TabComponent.Group>
    </div>
  );
};

export default Tab;

type IProps = {
  data: {
    //
    title: ReactNode;
    content: ReactNode;
    disabled?: boolean;
  }[];
  clx?: { container?: string; buttonList?: string; activeButton?: string; button?: string; panelList?: string; panel?: string };
};

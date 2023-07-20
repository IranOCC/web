// @ts-ignore
import { Tab } from "@headlessui/react";
import React, { ReactNode } from "react";

const PanelTab = ({ data }: IProps) => {
  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex w-full space-x-1 space-x-reverse">
          {data.map(({ title }, idx) => (
            <Tab
              key={idx}
              className={({ selected }: { selected: boolean }) =>
                [
                  //
                  "w-full border border-gray-200 py-2.5 text-sm font-medium leading-5",
                  "focus:outline-none focus:ring-0",
                  selected ? "bg-secondary text-white" : "text-slate-800 bg-white",
                  //
                ].join(" ")
              }
            >
              {title}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {data.map(({ content }, idx) => (
            <Tab.Panel
              //
              key={idx}
              className={"ring-offset-0 focus:outline-none focus:ring-0"}
            >
              {content}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default PanelTab;

type IProps = {
  data: { title: ReactNode; content: ReactNode; disabled?: boolean }[];
};

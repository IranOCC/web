import { Tab } from "@headlessui/react";
import { Card, Col, Row } from "antd";
import React, { ReactNode, useState } from "react";

const PanelTab = ({ data }: IProps) => {
  return (
    <div className="w-full px-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="w-full space-x-1 space-x-reverse flex">
          {data.map(({ title }, idx) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                [
                  //
                  "w-full py-2.5 text-sm font-medium leading-5 border-gray-200 border",
                  "focus:outline-none focus:ring-0",
                  selected ? "bg-blue-500 text-white" : "bg-white text-slate-800",
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

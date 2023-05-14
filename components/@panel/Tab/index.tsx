import { Tab } from "@headlessui/react";
import { Card, Col, Row } from "antd";
import React, { ReactNode, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const PanelTab = ({ data }: IProps) => {
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  return (
    <div className="w-full p-2 sm:px-0">
      <Tab.Group>
        <Tab.List className="w-full space-x-1 space-x-reverse flex">
          {data.map(({ title }, idx) => (
            <Tab
              key={idx}
              className={({ selected }) =>
                [
                  //
                  "w-full py-2.5 text-sm font-medium leading-5 border-gray-200 border",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected ? "bg-blue-600 text-white" : "bg-white text-slate-800",
                  //
                ].join(" ")
              }
              children={title}
            />
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {data.map(({ content }, idx) => (
            <Tab.Panel
              //
              key={idx}
              className={"ring-offset-0 focus:outline-none focus:ring-0"}
              children={content}
            />
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

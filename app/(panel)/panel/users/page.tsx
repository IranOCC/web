"use client";

import PanelTable from "@/components/@panel/Table";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { ReactNode } from "react";

// export const metadata = {
//   title: "کاربران",
// };

interface DataType {
  key: number;
  name: string;
  age: number;
  address: string;
  description: string;
  detail: ReactNode;
}

const columns: ColumnsType<DataType> = [
  {
    title: "نام",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: "Address",
    dataIndex: "address",
    filters: [
      {
        text: "London",
        value: "London",
      },
      {
        text: "New York",
        value: "New York",
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value as string) === 0,
  },
  {
    title: "Action",
    key: "action",
    sorter: false,
    render: () => (
      <Space size="middle">
        <a>Delete</a>
        <a>
          <Space>More actions ${">"}</Space>
        </a>
      </Space>
    ),
  },
];

export default function Page() {
  const data: DataType[] = [];
  for (let i = 1; i <= 40; i++) {
    data.push({
      key: i,
      name: "John Brown",
      age: Number(`${i}2`),
      address: `New York No. ${i} Lake Park`,
      description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
      detail: "Hello world!",
    });
  }

  return (
    <>
      <div className="p-4">
        <PanelTable<DataType>
          //
          headerTitle={() => "My title"}
          footerTitle={() => "My Footer"}
          data={data}
          columns={columns}
        />
      </div>
    </>
  );
}

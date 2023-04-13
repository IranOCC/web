"use client";

import PanelTable from "@/components/@panel/Table";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Space } from "antd";
import { ColumnsType } from "antd/es/table";
import { ReactNode } from "react";

interface DataType {
  key: string;
  fullName: string;
  phone: number;
  email: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "نام",
    dataIndex: "fullName",
  },
  {
    title: "شماره موبایل",
    dataIndex: "phone",
  },
  {
    title: "ایمیل",
    dataIndex: "email",
  },
  // {
  //   title: "نام",
  //   dataIndex: "name",
  // },
  // {
  //   title: "Age",
  //   dataIndex: "age",
  //   sorter: (a, b) => a.age - b.age,
  // },
  // {
  //   title: "Address",
  //   dataIndex: "address",
  //   filters: [
  //     {
  //       text: "London",
  //       value: "London",
  //     },
  //     {
  //       text: "New York",
  //       value: "New York",
  //     },
  //   ],
  //   onFilter: (value, record) => record.address.indexOf(value as string) === 0,
  // },
  // {
  //   title: "Action",
  //   key: "action",
  //   sorter: false,
  //   render: () => (
  //     <Space size="middle">
  //       <a>Delete</a>
  //       <a>
  //         <Space>More actions ${">"}</Space>
  //       </a>
  //     </Space>
  //   ),
  // },
];

export default function Page() {
  return (
    <>
      <div className="p-4">
        <PanelTable<DataType>
          //
          endpoint="users"
          headerTitle={() => <h1 className="font-medium text-lg">لیست کاربران</h1>}
          columns={columns}
        />
      </div>
    </>
  );
}

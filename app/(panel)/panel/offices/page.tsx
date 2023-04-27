"use client";

import PanelTable from "@/components/@panel/Table";
import Loading from "@/components/Loading";
import { axiosAuth } from "@/lib/axios";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode, useEffect } from "react";

interface DataType {
  _id: string;
  fullName: string;
  phone: number;
  email: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: "نام",
    dataIndex: "name",
    // sorter: (a, b) => a.fullName - b.fullName,
  },
  {
    title: "مدیریت",
    dataIndex: ["management", "fullName"],
  },
  {
    title: "شماره",
    dataIndex: ["phone", "value"],
    render: (phone: string) => {
      return (
        <div dir="ltr" className="float-right">
          {phone}
        </div>
      );
    },
  },
  {
    title: "ایمیل",
    dataIndex: "email",
    render: (email: string) => {
      return (
        <div dir="ltr" className="float-right">
          {email}
        </div>
      );
    },
  },
  {
    title: "کارکنان",
    dataIndex: "personnelCount",
  },
  {
    title: "املاک",
    dataIndex: "estateCount",
  },
  {
    title: "پست ها",
    dataIndex: "postCount",
  },
  {
    title: "وضعیت",
    dataIndex: "active",
  },
  {
    title: "",
    key: "action",
    dataIndex: "_id",
    render: (id) => (
      <Space size="middle">
        <a>حذف</a>
        <Link href={`/panel/offices/${id}`}>ویرایش</Link>
      </Space>
    ),
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
  // filters: [
  //   {
  //     text: "London",
  //     value: "London",
  //   },
  //   {
  //     text: "New York",
  //     value: "New York",
  //   },
  // ],
  //   onFilter: (value, record) => record.address.indexOf(value as string) === 0,
  // },
];

export default function Page() {
  return (
    <>
      <div className="p-4">
        <PanelTable<DataType>
          //
          endpoint="office"
          headerTitle={() => <h1 className="font-medium text-lg">لیست شعبه ها</h1>}
          columns={columns}
        />
      </div>
    </>
  );
}

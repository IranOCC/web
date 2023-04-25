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
    dataIndex: "fullName",
    // sorter: (a, b) => a.fullName - b.fullName,
  },
  {
    title: "شماره موبایل",
    dataIndex: "phoneNumber",
  },
  {
    title: "ایمیل",
    dataIndex: "emailAddress",
  },
  {
    title: "وضعیت",
    dataIndex: "status",
    filters: [
      {
        text: "Active",
        value: "Active",
      },
      {
        text: "Not Active",
        value: "NotActive",
      },
      {
        text: "Deleted",
        value: "Deleted",
      },
    ],
    render: (status: string[]) => {
      return <Tag color="default">{status}</Tag>;
    },
  },
  {
    title: "نقش ها",
    dataIndex: "roles",
    filters: [
      {
        text: "Super Admin",
        value: "SuperAdmin",
      },
      {
        text: "Admin",
        value: "Admin",
      },
      {
        text: "Agent",
        value: "Agent",
      },
      {
        text: "Author",
        value: "Author",
      },
      {
        text: "User",
        value: "User",
      },
    ],
    // onFilter: (value, record) => record.address.indexOf(value as string) === 0,
    render: (roles: string[]) => {
      return roles.map((tag) => {
        return (
          <Tag color="blue" key={tag}>
            {tag}
          </Tag>
        );
      });
    },
  },
  {
    title: "مدیریت",
    key: "action",
    dataIndex: "_id",
    render: (id) => (
      <Space size="middle">
        <a>حذف</a>
        <Link href={`/panel/users/${id}`}>ویرایش</Link>
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
          endpoint="user"
          headerTitle={() => <h1 className="font-medium text-lg">لیست کاربران</h1>}
          columns={columns}
        />
      </div>
    </>
  );
}

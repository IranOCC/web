"use client";

import PanelTable from "@/components/@panel/Table";
import Loading from "@/components/Loading";
import { axiosAuth } from "@/lib/axios";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Phone, Email } from "@/types/interfaces";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";

interface DataType {
  _id: string;
  fullName: string;
  phone: Phone;
  email: Email;
  active: boolean;
  verified: boolean;
}

const columns: ColumnsType<DataType> = [
  {
    title: "نام",
    dataIndex: "fullName",
    render: (fullName: string, record) => {
      return (
        <div className="flex items-center">
          {record.verified && <VerifiedIcon className="text-blue-600" fontSize="small" />}
          <span className="ms-1">{fullName}</span>
        </div>
      );
    },
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
    dataIndex: ["email", "value"],
    render: (email: string) => {
      return (
        <div dir="ltr" className="float-right">
          {email}
        </div>
      );
    },
  },
  {
    title: "وضعیت",
    dataIndex: "status",
    render: (status: string[]) => {
      return <Tag color="default">{status}</Tag>;
    },
  },
  {
    title: "نقش ها",
    dataIndex: "roles",
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
    title: "فعالسازی",
    dataIndex: "active",
    render: (active: boolean) => <span className={"font-bold " + (!!active ? "text-green-500" : "text-red-500")}>{!active ? "غیرفعال" : "فعال"}</span>,
  },
  {
    title: "",
    key: "action",
    dataIndex: "_id",
    render: (id) => (
      <Space size="middle">
        <a>حذف</a>
        <Link href={`/panel/users/${id}`}>ویرایش</Link>
      </Space>
    ),
  },
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

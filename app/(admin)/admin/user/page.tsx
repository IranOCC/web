"use client";

import PanelTable from "@/components/@panel/Table";
import Loading from "@/components/Loading";
import { axiosAuth } from "@/lib/axios";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Phone, Email, User } from "@/types/interfaces";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode, useEffect } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";

const columns: ColumnsType<User> = [
  {
    title: "نام",
    dataIndex: "fullName",
    render: (fullName: string, record) => {
      return (
        <div className="flex items-center">
          {record.verified && <VerifiedIcon className="text-blue-600" fontSize="small" />}
          <span className="ms-1">{fullName || "-"}</span>
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
          {phone || "-"}
        </div>
      );
    },
    responsive: ["md"],
  },
  {
    title: "ایمیل",
    dataIndex: ["email", "value"],
    render: (email: string) => {
      return (
        <div dir="ltr" className="float-right">
          {email || "-"}
        </div>
      );
    },
    responsive: ["xxl"],
  },
  {
    title: "نقش ها",
    dataIndex: "roles",
    responsive: ["xl"],
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
    responsive: ["lg"],
    render: (active: boolean) => <span className={"font-bold " + (!!active ? "text-green-500" : "text-red-500")}>{!active ? "غیرفعال" : "فعال"}</span>,
  },
];

export default function Page() {
  return (
    <>
      <div className="p-4">
        <PanelTable<User>
          //
          endpoint="user"
          headerTitle="لیست کاربران"
          columns={columns}
          deletable
          editable
        />
      </div>
    </>
  );
}

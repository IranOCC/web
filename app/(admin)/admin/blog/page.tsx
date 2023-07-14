"use client";

import PanelTable from "@/components/@panel/Table";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Estate } from "@/types/interfaces";
import moment from "jalali-moment";

const columns: ColumnsType<Estate> = [
  {
    title: "نام",
    dataIndex: "title",
    render: (title, record) => {
      return (
        <div className="flex flex-col">
          <p>{title}</p>
          <pre className="text-blue-400">{record.slug}</pre>
        </div>
      );
    },
  },
  {
    title: "شعبه",
    dataIndex: ["office", "name"],
    responsive: ["lg"],
  },
  {
    title: "نویسنده",
    dataIndex: ["createdBy", "fullName"],
    responsive: ["lg"],
  },
  {
    title: "تایید کننده",
    dataIndex: ["confirmedBy", "fullName"],
    responsive: ["xl"],
    render: (value) => {
      return value || "-";
    },
  },
  {
    title: "وضعیت انتشار",
    dataIndex: "status",
    responsive: ["md"],
    render: (status: string) => {
      return (
        <Tag color="blue" key={status}>
          {status}
        </Tag>
      );
    },
  },
  {
    title: "زمان ایجاد",
    dataIndex: "createdAt",
    responsive: ["xl"],
    render: (value) => {
      return value ? moment(value).locale("fa").format("DD MMM YYYY HH:mm:ss") : "-";
    },
  },
  {
    title: "زمان تایید و انتشار",
    dataIndex: "publishedAt",
    responsive: ["xl"],
    render: (value) => {
      return value ? moment(value).locale("fa").format("DD MMM YYYY HH:mm:ss") : "-";
    },
  },
];

export default function Page() {
  return (
    <>
      <div className="p-4">
        <PanelTable<Estate>
          //
          endpoint="blog/post"
          headerTitle="لیست پست ها"
          columns={columns}
          deletable
          editable
        />
      </div>
    </>
  );
}

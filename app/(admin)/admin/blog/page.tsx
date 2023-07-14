"use client";

import PanelTable from "@/components/@panel/Table";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Estate } from "@/types/interfaces";

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
  // {
  //   title: "کد ملک",
  //   dataIndex: "code",
  //   responsive: ["sm"],
  //   render: (code: string) => {
  //     return (
  //       <Tag color="orange" key={code}>
  //         {code}
  //       </Tag>
  //     );
  //   },
  // },
  // {
  //   title: "دسته ",
  //   dataIndex: ["category", "title"],
  //   responsive: ["lg"],
  // },
  // {
  //   title: "مالک",
  //   dataIndex: ["owner", "fullName"],
  //   responsive: ["xxl"],
  // },
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
  },
  {
    title: "زمان تایید و انتشار",
    dataIndex: "publishedAt",
    responsive: ["xl"],
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

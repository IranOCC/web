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
  {
    title: "نویسنده",
    dataIndex: ["createdBy", "fullName"],
    responsive: ["lg"],
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
];

export default function Page() {
  return (
    <>
      <div className="p-4">
        <PanelTable<Estate>
          //
          endpoint="page"
          headerTitle="لیست صفحات"
          columns={columns}
          deletable
          editable
        />
      </div>
    </>
  );
}

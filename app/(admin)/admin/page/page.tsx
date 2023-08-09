"use client";

import PanelTable from "@/components/@panel/Table";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { Estate, User } from "@/types/interfaces";
import moment from "jalali-moment";

const columns: ColumnsType<Estate> = [
  {
    title: "نام",
    dataIndex: "title",
    render: (title, record) => {
      return (
        <div className="flex flex-col">
          <p>{title}</p>
          <pre className="max-w-full truncate text-blue-400">{record.slug}</pre>
        </div>
      );
    },
  },
  {
    title: "ثبت",
    responsive: ["lg"],
    render: (value, { createdAt, createdBy }) => {
      return (
        <div className="flex flex-col">
          {!!createdBy && <span>{(createdBy as User)?.fullName}</span>}
          {!!createdAt && <span>{moment(createdAt).locale("fa").format("DD MMM YYYY HH:mm:ss")}</span>}
        </div>
      );
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
];

export default function Page() {
  return (
    <>
      <div className="p-4 pt-0">
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

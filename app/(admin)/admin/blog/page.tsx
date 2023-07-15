"use client";

import PanelTable from "@/components/@panel/Table";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import { BlogPost, Estate, User } from "@/types/interfaces";
import moment from "jalali-moment";

const columns: ColumnsType<BlogPost> = [
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
    title: "ثبت کننده",
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
    title: "تایید کننده",
    responsive: ["xl"],
    render: (value, { confirmedAt, confirmedBy, isConfirmed }) => {
      if (!isConfirmed)
        return (
          <Tag color="red" key="not-confirmed">
            تایید نشده
          </Tag>
        );
      return (
        <div className="flex flex-col">
          {!!confirmedBy && <span>{(confirmedBy as User)?.fullName}</span>}
          {!!confirmedAt && <span>{moment(confirmedAt).locale("fa").format("DD MMM YYYY HH:mm:ss")}</span>}
        </div>
      );
    },
  },
  {
    title: "نویسنده",
    dataIndex: ["author", "fullName"],
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
      <div className="p-4">
        <PanelTable<BlogPost>
          //
          endpoint="blog/post"
          headerTitle="لیست پست ها"
          columns={columns}
          deletable
          editable
          extraOperations={(id: string) => [
            {
              key: "confirmPublish",
              label: <Link href="#">تایید و انتشار</Link>,
            },
          ]}
        />
      </div>
    </>
  );
}

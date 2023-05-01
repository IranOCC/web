"use client";

import PanelTable from "@/components/@panel/Table";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import { User, Phone, Email } from "@/types/interfaces";

interface DataType {
  _id: string;
  name: string;
  management: User;
  phone: Phone;
  email: Email;
  membersCount: number;
  estatesCount: number;
  postsCount: number;
  active: boolean;
  verified: boolean;
}

const columns: ColumnsType<DataType> = [
  {
    title: "نام",
    dataIndex: "name",
    render: (name: string, record) => {
      return (
        <div className="flex items-center">
          {record.verified && <VerifiedIcon className="text-blue-600" fontSize="small" />}
          <span className="ms-1">{name}</span>
        </div>
      );
    },
  },
  {
    title: "مدیر",
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
    title: "اعضا",
    dataIndex: "membersCount",
  },
  {
    title: "املاک",
    dataIndex: "estatesCount",
  },
  {
    title: "پست ها",
    dataIndex: "postsCount",
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
        <Link href={`/panel/offices/${id}`}>ویرایش</Link>
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
          endpoint="office"
          headerTitle={() => <h1 className="font-medium text-lg">لیست شعبه ها</h1>}
          columns={columns}
        />
      </div>
    </>
  );
}

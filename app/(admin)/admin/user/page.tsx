"use client";

import PanelTable from "@/components/@panel/Table";
import { User, StorageFile } from "@/types/interfaces";
import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Image from "next/image";
import VerifiedIcon from "@mui/icons-material/Verified";

const columns: ColumnsType<User> = [
  {
    title: "نام",
    dataIndex: "fullName",
    render: (fullName: string, record) => {
      const avatar = record?.avatar as StorageFile;
      return (
        <div className="flex items-center">
          {!!avatar?.path && <Image src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + avatar.path} alt={avatar.alt} width={40} height={40} className="aspect-square h-10 w-10 rounded-full me-3" />}
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
      <div className="p-4 pt-0">
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

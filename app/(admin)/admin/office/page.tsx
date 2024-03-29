"use client";

import PanelTable from "@/components/@panel/Table";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Phone, Email, Office, StorageFile } from "@/types/interfaces";
import Image from "next/image";

const columns: ColumnsType<Office> = [
  {
    title: "نام",
    dataIndex: "name",
    render: (name: string, record) => {
      const logo = record?.logo as StorageFile;
      return (
        <div className="flex items-center">
          {!!logo?.path && <Image src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + logo.path} alt={logo.alt} width={100} height={100} className="me-3 aspect-square h-20 min-h-[5rem] w-20 min-w-[5rem] rounded-full" />}
          {record.verified && <VerifiedIcon className="text-blue-600" fontSize="small" />}
          <span className="ms-1">{name || "-"}</span>
        </div>
      );
    },
  },
  {
    title: "مدیر",
    dataIndex: ["management", "fullName"],
    responsive: ["lg"],
    render: (name: string, record) => {
      return <div className="float-right">{name || "-"}</div>;
    },
  },
  // {
  //   title: "شماره",
  //   dataIndex: ["phone", "value"],
  //   render: (phone: string) => {
  //     return (
  //       <div dir="ltr" className="float-right">
  //         {phone || "-"}
  //       </div>
  //     );
  //   },
  //   responsive: ["md"],
  // },
  // {
  //   title: "ایمیل",
  //   dataIndex: ["email", "value"],
  //   render: (email: string) => {
  //     return (
  //       <div dir="ltr" className="float-right">
  //         {email || "-"}
  //       </div>
  //     );
  //   },
  //   responsive: ["xxl"],
  // },
  {
    title: "اعضا",
    dataIndex: "membersCount",
    responsive: ["xl"],
    render: (count?: number) => count || 0,
  },
  {
    title: "املاک تایید شده",
    dataIndex: ["estates", "confirmed"],
    responsive: ["xl"],
    render: (count?: number) => count || 0,
  },
  {
    title: "املاک رد شده",
    dataIndex: ["estates", "rejected"],
    responsive: ["xl"],
    render: (count?: number) => count || 0,
  },
  {
    title: "املاک در انتظار",
    dataIndex: ["estates", "pending"],
    responsive: ["xl"],
    render: (count?: number) => count || 0,
  },
  {
    title: "فعالسازی",
    dataIndex: "active",
    responsive: ["xxl"],
    render: (active: boolean) => <span className={"font-bold " + (!!active ? "text-green-500" : "text-red-500")}>{!active ? "غیرفعال" : "فعال"}</span>,
  },
];

export default function Page() {
  return (
    <>
      <div className="p-4 pt-0">
        <PanelTable<Office>
          //
          endpoint="office"
          headerTitle="لیست شعبه ها"
          columns={columns}
          deletable
          editable
          extraOperations={(id?: string) => [
            {
              key: "members",
              label: <Link href={`/admin/office/${id}/members`}>مدیریت اعضا</Link>,
            },
          ]}
        />
      </div>
    </>
  );
}

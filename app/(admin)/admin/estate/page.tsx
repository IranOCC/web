"use client";

import PanelTable from "@/components/@panel/Table";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import { User, Phone, Email, Office } from "@/types/interfaces";

const columns: ColumnsType<Office> = [
  {
    title: "نام",
    dataIndex: "name",
  },

  {
    title: "وضعیت انتشار",
    dataIndex: "status",
    responsive: ["lg"],
    render: (active: boolean) => <span className={"font-bold " + (!!active ? "text-green-500" : "text-red-500")}>{!active ? "غیرفعال" : "فعال"}</span>,
  },
];

export default function Page() {
  return (
    <>
      <div className="p-4">
        <PanelTable<Office>
          //
          endpoint="estate"
          headerTitle="لیست املاک"
          columns={columns}
          deletable
          editable
        />
      </div>
    </>
  );
}

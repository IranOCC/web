"use client";

import PanelTable from "@/components/@panel/Table";
import { Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Estate, User } from "@/types/interfaces";
import moment from "jalali-moment";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { useState } from "react";

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
    title: "کد ملک",
    dataIndex: "code",
    responsive: ["sm"],
    render: (code: string) => {
      return (
        <Tag color="orange" key={code}>
          {code}
        </Tag>
      );
    },
  },
  {
    title: "دسته ملک",
    dataIndex: ["category", "title"],
    responsive: ["lg"],
  },
  {
    title: "شعبه",
    dataIndex: ["office", "name"],
    responsive: ["lg"],
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
    title: "تایید",
    dataIndex: "isConfirmed",
    responsive: ["xl"],
    render: (isConfirmed, { confirmedAt, confirmedBy }) => {
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
    title: "صاحب ملک",
    dataIndex: ["owner", "fullName"],
    responsive: ["md"],
  },
  {
    title: "وضعیت انتشار",
    dataIndex: "status",
    responsive: ["md"],
    render: (status: string, { publishedAt }) => {
      return (
        <Tag color="blue" key={status}>
          {status}
        </Tag>
      );
    },
  },
];

export default function Page() {
  const [updateTable, setUpdateTable] = useState([false]);
  const [loading, setLoading] = useState(false);

  const api = useAxiosAuth();
  const confirmPublish = async (id: string) => {
    setLoading(true);
    try {
      await api.patch(`/admin/estate/confirm/${id}`);
      toast.success("انتشار ملک تایید شد");
      setUpdateTable([true]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const rejectPublish = async (id: string) => {
    setLoading(true);
    try {
      await api.patch(`/admin/estate/reject/${id}`);
      toast.success("انتشار ملک رد شد");
      setUpdateTable([true]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-4">
        <PanelTable<Estate>
          //
          endpoint="estate"
          headerTitle="لیست املاک"
          columns={columns}
          deletable
          editable
          update={updateTable}
          loading={loading}
          extraOperations={(id?: string, record?: any) => {
            if (record?.isConfirmed) {
              return [
                {
                  key: "rejectPublish",
                  label: (
                    <Link href="#" onClick={() => rejectPublish(id!)}>
                      لغو انتشار
                    </Link>
                  ),
                },
              ];
            }
            return [
              {
                key: "confirmPublish",
                label: (
                  <Link href="#" onClick={() => confirmPublish(id!)}>
                    تایید انتشار
                  </Link>
                ),
              },
            ];
          }}
        />
      </div>
    </>
  );
}

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
import { Button, Chip, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { ConfirmRejectModal } from "@/components/@web/Features/Estate/ConfirmRejectModal";

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
    title: "کد ملک",
    dataIndex: "code",
    responsive: ["sm"],
    render: (code: string) => {
      if (!code) return "-";
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
    title: "تایید یا رد",
    dataIndex: "isConfirmed",
    responsive: ["xl"],
    render: (_, { isConfirmed, confirmedAt, confirmedBy, isRejected, rejectedAt, rejectedBy, rejectedReason }) => {
      if (!isConfirmed && !isRejected) {
        return (
          <Chip variant="dot" size="sm" color="warning">
            در انتظار
          </Chip>
        );
      }

      if (isRejected) {
        return (
          <div className="flex flex-col">
            <Chip variant="dot" size="sm" color="danger">
              رد شده
            </Chip>
            {!!rejectedBy && <span>{(rejectedBy as User)?.fullName}</span>}
            {!!rejectedAt && <span>{moment(rejectedAt).locale("fa").format("DD MMM YYYY HH:mm:ss")}</span>}
            {!!rejectedReason && <span>{rejectedReason}</span>}
          </div>
        );
      }
      if (isConfirmed) {
        return (
          <div className="flex flex-col">
            <Chip variant="dot" size="sm" color="success">
              تایید شده
            </Chip>
            {!!confirmedBy && <span>{(confirmedBy as User)?.fullName}</span>}
            {!!confirmedAt && <span>{moment(confirmedAt).locale("fa").format("DD MMM YYYY HH:mm:ss")}</span>}
          </div>
        );
      }
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
  const [confirmRejectModal, setConfirmRejectModal] = useState<{ id: string; type: "reject" | "confirm" }>();

  const confirmPublish = async (id: string) => {
    setConfirmRejectModal({ id, type: "confirm" });
  };

  const rejectPublish = async (id: string) => {
    setConfirmRejectModal({ id, type: "reject" });
  };

  const viewProperty = async (id: string) => {
    // setConfirmRejectModal({ id, type: "reject" });
  };
  return (
    <>
      <div className="p-4 pt-0">
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
            return [
              {
                key: "rejectPublish",
                label: (
                  <Link href="#" onClick={() => rejectPublish(id!)}>
                    رد ملک
                  </Link>
                ),
              },
              {
                key: "confirmPublish",
                label: (
                  <Link href="#" onClick={() => confirmPublish(id!)}>
                    تایید و انتشار
                  </Link>
                ),
              },
              {
                key: "viewProperty",
                label: (
                  <Link href={`/property/${record.slug}`} onClick={() => viewProperty(id!)}>
                    مشاهده ملک
                  </Link>
                ),
              },
            ];
          }}
        />
      </div>
      <ConfirmRejectModal
        //
        id={confirmRejectModal?.id}
        type={confirmRejectModal?.type}
        isOpen={!!confirmRejectModal}
        setClose={() => setConfirmRejectModal(undefined)}
        update={() => setUpdateTable([true])}
      />
    </>
  );
}

"use client";

import PanelTable from "@/components/@panel/Table";
import Loading from "@/components/Loading";
import { axiosAuth } from "@/lib/axios";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { Phone, Email, User, Office } from "@/types/interfaces";
import { Popconfirm, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useParams } from "next/navigation";
import { toast } from "@/lib/toast";
import Modal from "@/components/Modals";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";

const columns: ColumnsType<User> = [
  {
    title: "نام",
    dataIndex: "fullName",
    render: (fullName: string, record) => {
      return (
        <div className="flex items-center">
          {record.verified && <VerifiedIcon className="text-blue-600" fontSize="small" />}
          <span className="ms-1">{fullName}</span>
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
    title: "نقش ها",
    dataIndex: "roles",
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
];

export default function Page() {
  const params = useParams();
  const id_or_add = params?.id_or_add as string;
  const ID = id_or_add;

  const api = useAxiosAuth();
  const kickFromOffice = async (members: User[] | string[] | User | string) => {
    try {
      await api.delete(`office/${ID}/member`, { params: { members } });
      toast.success("با موفقیت حذف گردید");
      window.location.href = window.location.pathname;
    } catch (error) {
      console.log(error);
    }
  };

  const [addModalOpen, setAddModalOpen] = useState(false);
  const addToOffice = async (members: User[] | string[] | User | string) => {
    try {
      await api.post(`/office/${ID}/member`, members);
      toast.success("با موفقیت اضافه گردید");
    } catch (error) {}
  };

  return (
    <>
      <div className="p-4">
        <PanelTable<User>
          //
          endpoint={`office/${ID}/member`}
          headerTitle={() => (
            <div className="flex justify-between items-center w-full">
              <h1 className="font-medium text-lg">لیست اعضای شعبه</h1>
              <Button onClick={() => setAddModalOpen(true)} title="افزودن عضو" fill={false} noSpace />
            </div>
          )}
          columns={columns}
          extraOperations={(id: string) => [
            {
              key: "kick",
              label: (
                <Popconfirm title="حذف شود؟" okText="بله" cancelText="خیر" okType="link" onConfirm={() => kickFromOffice(id)}>
                  <a>حذف از آفیس</a>
                </Popconfirm>
              ),
            },
          ]}
        />
        <Modal
          //
          title="افزودن عضو"
          open={addModalOpen}
          setOpen={setAddModalOpen}
        >
          <Select
            //
            control={null}
            name="members"
            // error={errors.users?.message}
            // loading={isSubmitting}
            placeholder="انتخاب کنید"
            apiPath="/user/assignList"
            searchable
            noSpace
            multiple
            // tagsMode
            containerClassName="col-span-full"
          />
        </Modal>
      </div>
    </>
  );
}

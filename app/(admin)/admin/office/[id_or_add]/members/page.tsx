"use client";

import PanelTable from "@/components/@panel/Table";
import { OfficeMember } from "@/types/interfaces";
import { Popconfirm, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useParams } from "next/navigation";
import { toast } from "@/lib/toast";
import Modal from "@/components/Modals";
import { Button } from "@/components/@panel/Button";
import { Select } from "@/components/@panel/Select";
import OfficeAddMembersModal from "@/components/@panel/Features/Office/OfficeAddMembersModal";

const columns: ColumnsType<OfficeMember> = [
  {
    title: "نام",
    dataIndex: "fullName",
    render: (fullName: string, record) => {
      return (
        <div className="flex items-center">
          {record.verified && <VerifiedIcon className="text-blue-600" fontSize="small" />}
          <span className="mx-1">{fullName}</span>
          {record.isManagement && <Tag color="#389e0d">مدیر</Tag>}
        </div>
      );
    },
  },
  {
    title: "نقش ها",
    dataIndex: "roles",
    responsive: ["xl"],
    render: (roles: string[]) => {
      return roles?.map((tag) => {
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

  const [addModalOpen, setAddModalOpen] = useState(false);

  return (
    <>
      <div className="p-4 pt-0">
        <PanelTable<OfficeMember>
          //
          endpoint={`office/${ID}/member`}
          tableToolsList={[
            {
              key: "addMember",
              label: (
                <Link onClick={() => setAddModalOpen(true)} href="#">
                  افزودن عضو
                </Link>
              ),
            },
          ]}
          headerTitle="لیست اعضای شعبه"
          columns={columns}
          deletable
          // extraOperations={(id: string) => [
          //   {
          //     key: "kick",
          //     label: (
          //       <Popconfirm title="حذف شود؟" okText="بله" cancelText="خیر" okType="link" onConfirm={() => removeMember(id)}>
          //         <a>حذف از آفیس</a>
          //       </Popconfirm>
          //     ),
          //   },
          // ]}
        />
      </div>
      <OfficeAddMembersModal
        //
        open={addModalOpen}
        setOpen={setAddModalOpen}
        officeID={ID}
      />
    </>
  );
}

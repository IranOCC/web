"use client";

import { Office, Phone, StorageFile, User, WebEstate } from "@/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import FeaturesList from "./FeaturesList";
import { Button, Card, Modal, ModalContent, ModalBody, Avatar, Spinner } from "@nextui-org/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import FavoriteButton from "../@common/FavoriteButton";
import { Call, FavoriteBorderOutlined, Visibility } from "@mui/icons-material";
import { Tooltip } from "antd";
import { WebButton } from "../../Button";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export const ReservationModal = ({ _id, isOpen, setOpen, office, createdBy }: { _id: string; isOpen: boolean; setOpen: (a: boolean) => void; office?: Office; createdBy?: User }) => {
  const api = useAxiosAuth();
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const [data, setData] = useState<WebEstate | { office?: Office; createdBy?: User }>({ office, createdBy });

  const getData = async () => {
    setDataLoading(true);
    try {
      const response = await api.get(`/estate/${_id}`);
      const data = response.data as WebEstate;
      setData(data);
      setDataLoading(false);
    } catch (error) {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (!data?.createdBy) getData();
  }, []);

  return (
    <Modal
      //
      backdrop="blur"
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      className="z-[102]"
      placement="center"
      classNames={{ wrapper: "z-[102]", backdrop: "z-[102]", closeButton: "right-auto left-1" }}
    >
      <ModalContent>
        <ModalBody className="py-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {!!dataLoading && (
              <span className="flex w-full items-center justify-center py-2">
                {/*  */}
                <Spinner />
              </span>
            )}
            {!dataLoading && !data?.createdBy && (
              <span className="truncate">
                {/*  */}
                اطلاعات یافت نشد :(
              </span>
            )}
            {!!data?.createdBy && (
              <>
                <div className="flex w-full flex-col items-center justify-center gap-1 text-center">
                  <Avatar
                    //
                    src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + (data.createdBy?.avatar as StorageFile)?.path}
                    className="h-20 w-20"
                    showFallback
                    name={(data.createdBy?.firstName + " " + data.createdBy?.lastName).trim()}
                  />
                  <span className="truncate">
                    ثبت شده توسط <b>{data.office?.name || "-"}</b>
                  </span>
                  <b className="truncate">{data.createdBy ? (data.createdBy?.firstName + " " + data.createdBy?.lastName).trim() : "-"}</b>
                  {data.createdBy?.phone && (
                    <>
                      <hr className="my-2 w-full border-gray-500" />
                      <span className="">شماره تماس</span>
                      <a className="truncate font-bold" dir="ltr" href={`tel:${(data.createdBy?.phone as Phone)?.value || "-"}`}>
                        {(data.createdBy?.phone as Phone)?.value || "-"}
                      </a>
                    </>
                  )}
                </div>
                {data.createdBy?.phone && (
                  <>
                    <div className="flex flex-col justify-end gap-2">
                      <a href={`tel:${(data.createdBy?.phone as Phone)?.value || "-"}`}>
                        <WebButton
                          //
                          title="رزرو بازدید حضوری"
                          size="default"
                          noSpace
                        />
                      </a>
                      <a href={`tel:${(data.createdBy?.phone as Phone)?.value || "-"}`}>
                        <WebButton
                          //
                          title="رزرو بازدید آنلاین"
                          size="default"
                          variant="outline"
                          noSpace
                        />
                      </a>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

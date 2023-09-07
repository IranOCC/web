"use client";

import { Office, Phone, StorageFile, User, WebEstate } from "@/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import FeaturesList from "./FeaturesList";
import { Button, Card, Modal, ModalContent, ModalBody, Avatar } from "@nextui-org/react";
import { ReactNode, useRef, useState } from "react";
import FavoriteButton from "../@common/FavoriteButton";
import { Call, FavoriteBorderOutlined, Visibility } from "@mui/icons-material";
import { Tooltip } from "antd";
import { WebButton } from "../../Button";

export const ReservationModal = ({ isOpen, setOpen, office, createdBy }: { isOpen: boolean; setOpen: (a: boolean) => void; office: Office; createdBy: User }) => {
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
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {!createdBy && (
              <span className="truncate">
                {/*  */}
                اطلاعات یافت نشد :(
              </span>
            )}
            {!!createdBy && (
              <>
                <div className="flex w-full flex-col items-center justify-center text-center">
                  <Avatar
                    //
                    src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + (createdBy?.avatar as StorageFile)?.path}
                    className="h-20 w-20"
                    showFallback
                    name={(createdBy?.firstName + " " + createdBy?.lastName).trim()}
                  />
                  <span className="truncate">
                    ثبت شده توسط <b>{office?.name || "-"}</b>
                  </span>
                  <b className="truncate">{createdBy ? (createdBy?.firstName + " " + createdBy?.lastName).trim() : "-"}</b>
                  {createdBy?.phone && (
                    <>
                      <hr className="my-2 w-full border-gray-500" />
                      <span className="">شماره تماس</span>
                      <a className="truncate font-bold" dir="ltr" href={`tel:${(createdBy?.phone as Phone)?.value || "-"}`}>
                        {(createdBy?.phone as Phone)?.value || "-"}
                      </a>
                    </>
                  )}
                </div>
                {createdBy?.phone && (
                  <>
                    <div className="flex flex-col justify-end gap-2">
                      <a href={`tel:${(createdBy?.phone as Phone)?.value || "-"}`}>
                        <WebButton
                          //
                          title="رزرو بازدید حضوری"
                          size="default"
                          noSpace
                        />
                      </a>
                      <a href={`tel:${(createdBy?.phone as Phone)?.value || "-"}`}>
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

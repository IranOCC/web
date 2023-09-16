"use client";

import { Office, Phone, StorageFile, User, WebEstate } from "@/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import FeaturesList from "./FeaturesList";
import { Button, Card, Modal, ModalContent, ModalBody, Avatar, Tabs, Tab, ModalHeader, ModalFooter, Textarea } from "@nextui-org/react";
import { Key, ReactNode, useEffect, useRef, useState } from "react";
import FavoriteButton from "../@common/FavoriteButton";
import { Call, FavoriteBorderOutlined, Visibility } from "@mui/icons-material";
import { Tooltip } from "antd";
import { WebButton } from "../../Button";
import { RejectFormData } from "@/types/formsData";
import { Controller, useForm } from "react-hook-form";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";

export const ConfirmRejectModal = ({ isOpen, setClose, id, type, update }: { isOpen: boolean; setClose: () => void; id?: string; type?: string; update: () => void }) => {
  const [tab, setTab] = useState<Key>(type || "confirm");

  const form = useForm<RejectFormData>();
  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form;

  const api = useAxiosAuth();
  const onSubmit = async (data?: RejectFormData) => {
    if (tab === "confirm") {
      try {
        await api.patch(`/admin/estate/confirm/${id}`);
        toast.success("ملک تایید و منتشر شد");
        setClose();
        update();
      } catch (error) {
        setClose();
        update();
      }
    } else {
      try {
        await api.patch(`/admin/estate/reject/${id}?reason=${data?.reason}`);
        toast.success("ملک رد شد");
        setClose();
        update();
      } catch (error) {
        setClose();
        update();
      }
    }
  };

  useEffect(() => {
    setTab(type || "confirm");
  }, [type]);

  return (
    <Modal
      //
      backdrop="blur"
      isOpen={isOpen}
      onClose={() => setClose()}
      className="z-[102]"
      placement="center"
      classNames={{ wrapper: "z-[102]", backdrop: "z-[102]", closeButton: "right-auto left-1" }}
    >
      <ModalContent>
        <ModalHeader>تایید یا رد ملک</ModalHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalBody>
            <Tabs
              //
              selectedKey={tab}
              onSelectionChange={(key) => setTab(key)}
              classNames={{ base: "items-center justify-center" }}
              color="secondary"
              variant="solid"
            >
              <Tab
                key="confirm"
                title={
                  <div className="flex items-center gap-2">
                    <span>تایید ملک</span>
                  </div>
                }
              />
              <Tab
                key="reject"
                title={
                  <div className="flex items-center gap-2">
                    <span>رد ملک</span>
                  </div>
                }
              />
            </Tabs>
            {tab === "reject" && (
              <Controller
                control={control}
                name="reason"
                render={({ field }) => {
                  return (
                    <Textarea
                      //
                      className="col-span-full"
                      type="text"
                      labelPlacement="outside"
                      variant="faded"
                      label="دلیل رد"
                      {...field}
                      classNames={{ errorMessage: "text-right" }}
                      errorMessage={errors.reason?.message}
                      validationState={!!errors.reason?.message ? "invalid" : "valid"}
                    />
                  );
                }}
              />
            )}
            {tab === "confirm" && <p>آیا مطمئن هستید برای تایید ملک؟</p>}
          </ModalBody>
          <ModalFooter>
            <Button
              //
              type="submit"
              color="secondary"
              isLoading={isLoading || isValidating || isSubmitting}
            >
              ثبت
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

import React from "react";

import { TbShare2 } from "react-icons/tb";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { Button, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { KeyboardDoubleArrowDown } from "@mui/icons-material";
interface Props {
  closePrompt: () => void;
  doNotShowAgain: () => void;
}

export default function AddToIosSafari(props: Props) {
  const { closePrompt, doNotShowAgain } = props;

  return (
    <Modal
      //
      backdrop="blur"
      isOpen={true}
      onClose={closePrompt}
      className="z-[102]"
      placement="center"
      classNames={{ wrapper: "z-[102]", backdrop: "z-[102]", closeButton: "right-auto left-1" }}
      title="نصب ایران اکازیون"
    >
      <KeyboardDoubleArrowDown fontSize="large" className="absolute bottom-[10px] z-[103] mx-[calc(50%-17.5px)] animate-bounce text-secondary" />
      <ModalContent>
        <ModalHeader>نصب ایران اکازیون</ModalHeader>
        <ModalBody>
          <p className="">برای کسب تجربه بهتر و جذاب تر به شما پیشنهاد می کنیم نرم افزار ایران اکازیون را بر روی دستگاه خود نصب کنید!</p>
          <div className="flex flex-col gap-1 text-sm text-gray-500">
            <div className="flex flex-wrap items-center gap-1">
              <p>بر روی</p>
              <TbShare2 className="text-2xl text-blue-600" />
              <p>کلیک کنید</p>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <p>به پایین اسکرول کنید و</p>
              <div dir="ltr" className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 p-1 text-gray-900">
                <AiOutlinePlusSquare className="text-2xl text-blue-600" />
                <p>Add to Home Screen</p>
              </div>
              را بزنید
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <p>مراحل نصب را ادامه دهید</p>
            </div>
          </div>
          <Button onClick={doNotShowAgain}>هرگز نمایش نده</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

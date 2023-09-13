import React from "react";

import { FaTimes } from "react-icons/fa";
import { MdAddToHomeScreen } from "react-icons/md";
import { Button, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { InstallMobile, KeyboardDoubleArrowUp, MoreVert } from "@mui/icons-material";

interface Props {
  closePrompt: () => void;
  doNotShowAgain: () => void;
}

export default function AddToMobileChrome(props: Props) {
  const { closePrompt, doNotShowAgain } = props;

  return (
    <Modal
      //
      backdrop="blur"
      isOpen={true}
      onClose={closePrompt}
      className="z-[102]"
      placement="bottom"
      classNames={{ wrapper: "z-[102]", backdrop: "z-[102]", closeButton: "right-auto left-1" }}
      title="نصب ایران اکازیون"
    >
      <KeyboardDoubleArrowUp fontSize="large" className="absolute right-[10px] top-[10px] z-[103] animate-bounce text-secondary" />
      <ModalContent>
        <ModalHeader>نصب ایران اکازیون</ModalHeader>
        <ModalBody>
          <p className="">برای کسب تجربه بهتر و جذاب تر به شما پیشنهاد می کنیم نرم افزار ایران اکازیون را بر روی دستگاه خود نصب کنید!</p>
          <div className="flex flex-col gap-1 text-sm text-gray-500">
            <div className="flex flex-wrap items-center gap-1">
              <p>بر روی</p>
              <MoreVert />
              <p>کلیک کنید</p>
            </div>
            <div className="flex flex-wrap items-center gap-1">
              <p>به پایین اسکرول کنید و</p>
              <div dir="ltr" className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 p-1 text-gray-900">
                <InstallMobile />
                <p>Install app</p>
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

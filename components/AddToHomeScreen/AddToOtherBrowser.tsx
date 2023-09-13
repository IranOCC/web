import { Button, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from "@mui/icons-material";

interface Props {
  closePrompt: () => void;
  doNotShowAgain: () => void;
}

export default function AddToOtherBrowser(props: Props) {
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
      <ModalContent>
        <ModalHeader>نصب ایران اکازیون</ModalHeader>
        <ModalBody>
          <p className="">برای کسب تجربه بهتر و جذاب تر به شما پیشنهاد می کنیم نرم افزار ایران اکازیون را بر روی دستگاه خود نصب کنید!</p>
          <div className="flex flex-col gap-1 text-sm text-gray-500">
            <div className="flex flex-wrap items-center gap-1">
              <p>در صورتیکه نیاز به راهنمایی برای نصب دارید در گوگل به همراه نام مرورگر و مدل دستگاه سرچ کنید.</p>
            </div>
          </div>
          <Button onClick={doNotShowAgain}>هرگز نمایش نده</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

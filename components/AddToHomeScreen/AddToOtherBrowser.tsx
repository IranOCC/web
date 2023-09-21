import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { KeyboardDoubleArrowDown, KeyboardDoubleArrowUp } from "@mui/icons-material";
import useUserAgent from "@/hooks/useUserAgent";

interface Props {
  closePrompt: () => void;
  doNotShowAgain: () => void;
}

export default function AddToOtherBrowser(props: Props) {
  const { closePrompt, doNotShowAgain } = props;
  const { userAgentString } = useUserAgent();

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
          <p className="text-justify">برای کسب تجربه بهتر و جذاب تر به شما پیشنهاد می کنیم نرم افزار ایران اکازیون را بر روی دستگاه خود نصب کنید!</p>
          <div className="flex flex-col gap-1 text-sm text-gray-500">
            <div className="flex flex-wrap items-center gap-1">
              <p>در صورت نیاز به راهنمایی جهت نصب نرم افزار از گوگل کمک بگیرید</p>
            </div>
            <div className="flex flex-col flex-wrap gap-1">
              <b>اطلاعات مرورگر شما: </b>
              <pre dir="ltr" className="whitespace-pre-wrap">
                {userAgentString}
              </pre>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button onClick={doNotShowAgain}>هرگز نمایش نده</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

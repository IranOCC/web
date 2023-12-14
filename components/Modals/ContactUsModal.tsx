import Modal from ".";
import { useContext } from "react";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import ContactIcon from "../Icons/web/Contact";
import Link from "next/link";
import InstagramIcon from '@mui/icons-material/Instagram';
//
//
//

const ContactUsModal = () => {
  const { contactModalOpen, setContactModalOpen } = useContext(WebPreviewContext) as WebPreviewContextType;

  return (
    <Modal
      //
      open={contactModalOpen}
      closeButton={true}
      setOpen={setContactModalOpen}
      title="با ایران اکازیون در تماس باشید..."
    >
      <div dir="ltr" className="flex flex-col items-start">
        <Link href="tel:0115400" className="flex flex-row justify-center gap-1 p-1 text-lg font-bold outline-none transition-colors hover:text-secondary">
          <ContactIcon />
          <span>011-5400</span>
        </Link>
        <Link href="tel:0912 190 6047" className="flex flex-row justify-center gap-1 p-1 text-lg font-bold outline-none transition-colors hover:text-secondary">
          <ContactIcon />
          <span>0912 190 6047</span>
        </Link>
        <Link href="https://instagram.com/occasion_vip" target="_blank" className="flex flex-row justify-center gap-1 p-1 text-lg font-bold outline-none transition-colors hover:text-secondary">
          <InstagramIcon />
          <span>occasion_vip</span>
        </Link>
        <Link href="https://instagram.com/amlakoccasion" target="_blank" className="flex flex-row justify-center gap-1 p-1 text-lg font-bold outline-none transition-colors hover:text-secondary">
          <InstagramIcon />
          <span>amlakoccasion</span>
        </Link>
      </div>
    </Modal>
  );
};

export default ContactUsModal;

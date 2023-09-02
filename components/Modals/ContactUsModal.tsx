import Modal from ".";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import { Alert, AlertTitle } from "@mui/material";
import { User } from "@/types/interfaces";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import ContactIcon from "../Icons/web/Contact";
import Link from "next/link";

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
          <span>۰۱۱-۵۴۰۰</span>
        </Link>
        <Link href="tel:0912 190 6047" className="flex flex-row justify-center gap-1 p-1 text-lg font-bold outline-none transition-colors hover:text-secondary">
          <ContactIcon />
          <span>۰۹۱۲ ۱۹۰ ۶۰۴۷</span>
        </Link>
      </div>
    </Modal>
  );
};

export default ContactUsModal;

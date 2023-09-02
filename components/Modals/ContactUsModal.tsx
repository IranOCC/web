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
      <div className="flex flex-col">
        <Link href="tel:0115400" className="flex flex-row justify-center gap-1 p-1 text-lg font-bold ">
          <span>۰۱۱-۵۴۰۰</span>
          <ContactIcon />
        </Link>
        <Link href="tel:0998 912 1906" className="flex flex-row justify-center gap-1 p-1 text-lg font-bold ">
          <span>۰۹۹۸۹۱۲۱۹۰۶</span>
          <ContactIcon />
        </Link>
      </div>
    </Modal>
  );
};

export default ContactUsModal;

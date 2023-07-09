import Modal from ".";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import { Alert, AlertTitle } from "@mui/material";

//
//
//

const RolesConflictModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const pathname = usePathname();
  const { data: session } = useSession();
  const { user } = useContext(CurrentUserContext) as CurrentUserContextType;

  useEffect(() => {
    if (pathname === "auth" || !user || !session || !session?.user) return;
    const sessionRoles = session.user.roles.sort();
    const myRoles = user.roles.sort();
    if (sessionRoles.toString() === myRoles.toString()) return;

    setOpenModal(true);

    setTimeout(() => {
      signOut();
    }, 2000);
  }, [user?.roles]);

  return (
    <Modal
      //
      open={openModal}
      closeButton={false}
    >
      <Alert severity="error" variant="filled">
        <AlertTitle>
          <strong>مغایرت در دسترسی ها</strong>
        </AlertTitle>
        {/*  */}
        ظاهرا در دسترسی های شما تغییراتی ایجاد شده و نیاز است از حساب کاربری خود خارج و مجددا وارد شوید
        {/*  */}
        <br />
        <br />
        <strong>تا ثانیه های دیگر خارج می شوید ...</strong>
      </Alert>
    </Modal>
  );
};

export default RolesConflictModal;

import Modal from ".";
import { Button } from "@/components/@panel/Button";
import { Input } from "@/components/@panel/Input";
import { MyProfileFormData } from "@/types/formsData";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useRef, useState } from "react";
import { toast } from "@/lib/toast";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { Session, StorageFile } from "@/types/interfaces";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import LogoUploader from "../Uploader/LogoUploader";
import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import { handleFieldsError } from "@/lib/axios";
import { Alert, AlertTitle } from "@mui/material";
import Link from "next/link";
import { LoadingWithoutBg } from "../Loading";

//
//
//

const AddEditPostCheckModal = ({ set }: any) => {
  const [openModal, setOpenModal] = useState(true);
  const [checking, setChecking] = useState(true);
  const [noOffice, setNoOffice] = useState(false);

  const params = useParams();
  const api = useAxiosAuth();
  const check = async () => {
    //

    const isNew = !!params?.id_or_add && (params?.id_or_add as string) === "add";
    const ID = isNew ? undefined : (params?.id_or_add as string);
    try {
      const d = await api.get(`tools/blog/post/checking/${isNew ? "create" : "update"}`, { params: isNew ? undefined : { id: ID } });
      set(d.data);
      setChecking(false);
      setOpenModal(false);
    } catch (error) {
      setChecking(false);
      if ((error as any).error === "NoOffice") setNoOffice(true);
    }
  };
  useEffect(() => {
    check();
  }, []);

  return (
    <Modal
      //
      open={openModal}
      closeButton={false}
    >
      {!!checking && <LoadingWithoutBg label="در حال دریافت اطلاعات ..." />}
      {!!noOffice && (
        <Alert severity="warning" variant="filled">
          <AlertTitle>
            <strong>عدم عضویت در شعبات</strong>
          </AlertTitle>
          شما هنوز در هیچ یک از شعبه ها عضو نیستید. لطفا از مدیریت شعبه خود درخواست کنید تا عضویت شما را تایید و پس از آن می توانید ملک یا پست خود را درج کنید
          <br />
          <br />
          <Link href="/admin">
            <strong className="underline">برگشت به داشبورد</strong>
          </Link>
        </Alert>
      )}
    </Modal>
  );
};

export default AddEditPostCheckModal;

import Modal from ".";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Alert, AlertTitle } from "@mui/material";
import Link from "next/link";
import { LoadingWithoutBg } from "../Loading";

//
//
//

const AddEditEstateCheckModal = ({ set }: any) => {
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
      const d = await api.get(`tools/estate/checking/${isNew ? "create" : "update"}`, { params: isNew ? undefined : { id: ID } });
      set(d.data);
      setOpenModal(false);
    } catch (error) {
      if ((error as any).error === "NoOffice") {
        setNoOffice(true);
        setChecking(false);
      }
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

export default AddEditEstateCheckModal;

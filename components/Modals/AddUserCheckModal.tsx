import Modal from ".";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { LoadingWithoutBg } from "../Loading";

//
//
//

const AddEditUserCheckModal = ({ set }: any) => {
  const [openModal, setOpenModal] = useState(true);
  const [checking, setChecking] = useState(true);

  const params = useParams();
  const api = useAxiosAuth();
  const check = async () => {
    //
    const isNew = !!params?.id_or_add && (params?.id_or_add as string) === "add";
    const ID = isNew ? undefined : (params?.id_or_add as string);
    try {
      const d = await api.get(`tools/user/checking/${isNew ? "create" : "update"}`, { params: isNew ? undefined : { id: ID } });
      set(d.data);
      setOpenModal(false);
    } catch (error) {}
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
    </Modal>
  );
};

export default AddEditUserCheckModal;

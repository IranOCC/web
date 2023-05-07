import { Button } from "@/components/Button";
import { CheckBox, Input } from "@/components/Input";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { OfficeAddMemberFormData, OfficeFormData, UserFormData } from "@/types/formsData";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { useRouter } from "next/navigation";
import { Select } from "@/components/Select";
import Uploader from "@/components/Uploader";
import LogoUploader from "@/components/Uploader/LogoUploader";
import Modal from "@/components/Modals";
import EmailAddressBox from "../@common/EmailAddressBox";
import EditAddPage, { AddEditComponentProps } from "../../EditAddPage";
import { Office } from "@/types/interfaces";
import LocationBox from "../@common/LocationBox";
import PhoneNumberBox from "../@common/PhoneNumberBox";
import SendEmailBox from "../@common/SendEmailBox";
import SendSmsBox from "../@common/SendSmsBox";
import OfficeBox from "./OfficeBox";
// import Uploader from "@/components/Uploader";

const Center = ({ form, loading }: AddEditComponentProps) => {};

export default function OfficeAddMembersModal({ open, setOpen, addMember }: any) {
  // useEffect(() => {
  //   reset();
  // }, [open]);

  const form = useForm<OfficeAddMemberFormData>();

  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form as UseFormReturn<OfficeAddMemberFormData>;

  useEffect(() => {
    register("members", { required: "اعضا را انتخاب کنید" });
  }, []);

  const onSubmit = async (data: OfficeAddMemberFormData) => {
    await addMember(data.members);
    setOpen(false);
  };

  return (
    <>
      <Modal
        //
        open={open}
        setOpen={setOpen}
        // title="افزودن عضو"
        className="h-[30rem]"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="py-2 text-sm">
            {/*  */}
            کاربرانی که می خواهید به این آفیس اضافه شوند را انتخاب کنید
            {/*  */}
          </p>
          <Select
            //
            control={control}
            name="members"
            error={errors.members?.message}
            loading={isSubmitting}
            placeholder="اعضا را انتخاب کنید"
            multiple
            // showTitle
            apiPath="/user/assignList"
            containerClassName="col-span-full"
            searchable
          />
          <Button
            //
            title="افزودن"
            type="submit"
            loading={isSubmitting || isLoading || isValidating}
            onClick={handleSubmit(onSubmit)}
          />
        </form>
      </Modal>
    </>
  );
}

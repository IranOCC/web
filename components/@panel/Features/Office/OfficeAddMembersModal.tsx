import { Button } from "@/components/Button";
import { OfficeAddMemberFormData } from "@/types/formsData";
import { useEffect } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { Select } from "@/components/Select";
import Modal from "@/components/Modals";
import { AddEditComponentProps } from "../../EditAddPage";

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
            noSpace
          />
          <div className="w-full h-72" />
          <Button
            //
            title="افزودن"
            type="submit"
            loading={isSubmitting || isLoading || isValidating}
            onClick={handleSubmit(onSubmit)}
            noSpace
          />
        </form>
      </Modal>
    </>
  );
}

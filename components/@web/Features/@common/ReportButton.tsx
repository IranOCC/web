import Modal from "@/components/Modals";
import { ReportGmailerrorredOutlined } from "@mui/icons-material";
import { Tooltip } from "antd";
import { WebButton } from "../../Button";
import { useEffect, useState, useContext } from "react";
import { ReportFormData } from "@/types/formsData";
import { useForm } from "react-hook-form";
import { WebInput } from "../../Input";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";

const ReportButton = ({ size = 28 }: { size?: number }) => {
  const [openReportModal, setReportModal] = useState(false);

  return (
    <>
      <Tooltip title="گزارش مشکل" placement="top" arrow={false}>
        <div
          //
          role="report"
          onClick={() => setReportModal(true)}
          className="flex h-fit w-fit cursor-pointer items-center justify-center justify-self-center text-gray-500"
        >
          <ReportGmailerrorredOutlined style={{ fontSize: size }} />
        </div>
      </Tooltip>

      <ReportModal
        //
        isOpen={openReportModal}
        setOpen={setReportModal}
      />
    </>
  );
};

export default ReportButton;

export const ReportModal = ({ isOpen, setOpen }: { isOpen: boolean; setOpen: (a: boolean) => void }) => {
  const { relatedTo, relatedToID } = useContext(WebPreviewContext) as WebPreviewContextType;
  const form = useForm<ReportFormData>();
  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form;

  const api = useAxiosAuth();
  const onSubmit = async (data: ReportFormData) => {
    try {
      await api.post(`/report/${relatedTo}/${relatedToID}`, data);
      toast.success("با تشکر از شما! گزارش شما با موفقیت ثبت شد و پس از بازنگری اصلاحات انجام خواهد شد");
      onClose();
    } catch (error) {
      onClose();
    }
  };

  const onClose = () => {
    setOpen(false);
    resetField("text");
  };

  useEffect(() => {
    register("text", {
      //
      required: "متن گزارش الزامی است",
      minLength: { value: 10, message: "حداقل باید 10 کاراکتر باشد" },
      maxLength: { value: 1000, message: "حداکثر باید 1000 کاراکتر باشد" },
    });
  }, []);

  return (
    <Modal
      //
      open={isOpen}
      setOpen={onClose}
      title="ثبت گزارش مشکل"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 gap-2">
          <div className="flex w-full flex-col justify-center text-center">
            <WebInput
              //
              control={control}
              name="text"
              placeholder="متن گزارش"
              error={errors.text?.message}
              disabled={isLoading || isSubmitting}
              multiline
              lines={4}
              noSpace
              noResize
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <WebButton
              //
              type="submit"
              title="ثبت گزارش"
              size="default"
              disabled={isLoading || isSubmitting}
              noSpace
            />
            <WebButton
              //
              onClick={onClose}
              title="لغو گزارش"
              size="default"
              variant="outline"
              disabled={isLoading || isSubmitting}
              noSpace
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { SendSmsBoxFormData } from "@/types/formsData";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";

export default function SendSmsBox({ phoneNumber, phoneID, officeID, userID }: { phoneNumber?: string; phoneID?: string; officeID?: string; userID?: string }) {
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
  } = useForm<SendSmsBoxFormData>();

  const api = useAxiosAuth();
  const onSubmit = async (data: SendSmsBoxFormData) => {
    try {
      await api.post("/sms/send", data);
      toast.success("با موفقیت ارسال شد");
      resetField("text");
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "خطایی در ارسال به وحود آمده است",
      });
    }
  };

  const getLogs = async () => {
    const data = { userID, officeID, phoneID, phoneNumber };
    try {
      const logs = await api.get("/sms/logs", { params: data });
    } catch (error) {}
  };

  useEffect(() => {
    if (userID) setValue("userID", userID);
    if (officeID) setValue("officeID", officeID);
    if (phoneID) setValue("phoneID", phoneID);
    if (phoneNumber) setValue("phoneNumber", phoneNumber);

    register("text", { required: "متن پیام را وارد کنید" });
  }, []);

  const seeLogs = async () => {
    await getLogs();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PanelCard title="ارسال پیامک" extra={<a onClick={seeLogs}>تاریخچه</a>}>
        <Input
          //
          control={control}
          name="text"
          multiline
          label="متن"
          error={errors.text?.message}
          loading={isSubmitting}
        />
        <Button
          //
          title="ارسال"
          type="submit"
          loading={isSubmitting || isLoading || isValidating}
          noSpace
        />
      </PanelCard>
    </form>
  );
}

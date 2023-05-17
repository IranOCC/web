import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { SendSmsBoxFormData } from "@/types/formsData";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";

export default function SendSmsBox({ phoneNumber, phoneID, officeID, userID, to }: { phoneNumber?: string; phoneID?: string; officeID?: string; userID?: string; to?: string }) {
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

  const [_to] = useState(to);
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
      <PanelCard title="ارسال پیامک" disabled={!_to} extra={<a onClick={seeLogs}>تاریخچه</a>}>
        <Input
          //
          control={control}
          name="text"
          multiline
          label={
            <>
              ارسال پیامک به{" "}
              <b dir="ltr" className="font-extrabold text-blue-600">
                {_to}
              </b>
            </>
          }
          placeholder="متن پیام"
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

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { SendEmailBoxFormData } from "@/types/formsData";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";

export default function SendEmailBox({ emailAddress, emailID, officeID, userID, to }: { emailAddress?: string; emailID?: string; officeID?: string; userID?: string; to?: string }) {
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
  } = useForm<SendEmailBoxFormData>();

  const api = useAxiosAuth();
  const onSubmit = async (data: SendEmailBoxFormData) => {
    try {
      await api.post("/mail/send", data);
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
    const data = { userID, officeID, emailID, emailAddress };
    try {
      const logs = await api.get("/mail/logs", { params: data });
    } catch (error) {}
  };

  const [_to] = useState(to);
  useEffect(() => {
    if (userID) setValue("userID", userID);
    if (officeID) setValue("officeID", officeID);
    if (emailID) setValue("emailID", emailID);
    if (emailAddress) setValue("emailAddress", emailAddress);

    register("text", { required: "متن پیام را وارد کنید" });
  }, []);

  const seeLogs = async () => {
    await getLogs();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <PanelCard title="ارسال ایمیل" disabled={!_to} extra={<a onClick={seeLogs}>تاریخچه</a>}>
        <Input
          //
          control={control}
          name="text"
          multiline
          label={
            <>
              ارسال ایمیل به{" "}
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

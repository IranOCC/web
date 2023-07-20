"use client";

import { Button } from "@/components/@panel/Button";
import { Input } from "@/components/@panel/Input";
import { LoginPhoneOtpFormData } from "@/types/formsData";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import axios, { handleFieldsError } from "@/lib/axios";
import { toast } from "@/lib/toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import PhoneIcon from "@/components/Icons/Phone";
import QrcodeIcon from "@/components/Icons/Qrcode";

import { useCountdown } from "@/hooks/useCountdown";
import moment from "moment";

export default function Page() {
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
  } = useForm<LoginPhoneOtpFormData>();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const phoneSet = searchParams?.get("phone")?.replace(" ", "+");
  const isStep2 = phoneSet?.length !== undefined;

  const sendOtp = async (data: LoginPhoneOtpFormData) => {
    data.phone = data.phone.replaceAll(" ", "");
    try {
      const response = await axios.post("/auth/phoneOtp", data);
      toast.success("کد با موفقیت ارسال شد");
      const { phone } = response.data;
      const se = new URLSearchParams(searchParams?.toString());
      se.set("phone", phone);
      const url = pathname + "?" + se?.toString();
      router.replace(url);
      setSendAgainTime(moment().add(2, "minutes").toDate());
      return true;
    } catch (error) {
      handleFieldsError(error, setError);
      setError("phone", {
        type: "manual",
        message: "خطایی رخ داده است",
      });
    }
  };
  const loginByOtp = async (data: LoginPhoneOtpFormData) => {
    data.token = data.token.replaceAll(" ", "");
    const result = await signIn("otp", { ...data, callbackUrl: "/", redirect: false });
    // @ts-ignore
    if (result?.ok) {
      toast.success("با موفقیت وارد شدید!");
      const callbackUrl = searchParams?.get("callbackUrl");
      window.location.href = callbackUrl || "/";
    } else {
      reset({ phone: isStep2 ? phoneSet : "" });
      setError("token", {
        type: "manual",
        message: "کد وارد شده اشتباه است",
      });
    }
  };

  useEffect(() => {
    reset({ phone: isStep2 ? phoneSet : "" });
  }, [searchParams]);

  useEffect(() => {
    register("phone", { required: "شماره خود را وارد کنید" });
    if (isStep2) {
      register("token", { required: "کد ارسالی را وارد کنید" });
    }
  }, [isStep2]);

  const [sendAgainTime, setSendAgainTime] = useState<null | Date>(null);
  const [days, hours, minutes, seconds, countDown] = useCountdown(sendAgainTime);

  const editNumber = () => {
    const se = new URLSearchParams(searchParams?.toString());
    se.delete("phone");
    const url = pathname + "?" + se?.toString();
    router.replace(url);
    reset();
  };

  const sendOtpAgain = async () => {
    if (countDown > 0) return;
    await sendOtp({ phone: phoneSet } as LoginPhoneOtpFormData);
  };

  return (
    <>
      <div className="flex h-full flex-col items-center justify-center">
        <h2 className="mb-2 text-center font-bold text-secondary">ورود یا عضویت</h2>
        <form onSubmit={handleSubmit(isStep2 ? loginByOtp : sendOtp)}>
          <Input
            /* */
            control={control}
            name="phone"
            label="شماره موبایل"
            error={errors.phone?.message}
            disabled={isSubmitSuccessful || isStep2}
            loading={isSubmitting}
            direction="ltr"
            type="tel"
            noSpace
            icon={<PhoneIcon />}
            patternFormatProps={{
              format: isStep2 ? "+## ### ### ####" : "+98 9## ### ####",
              allowEmptyFormatting: true,
              mask: "_",
            }}
          />
          {isStep2 && (
            <>
              <span className="mb-6 mt-2 block w-full cursor-pointer select-none text-center text-sm font-medium text-secondary" onClick={editNumber}>
                ویرایش شماره
              </span>
              <Input
                /* */
                control={control}
                name="token"
                label="کد ارسالی"
                error={errors.token?.message}
                loading={isSubmitting || isLoading || isValidating}
                direction="ltr"
                type="tel"
                noSpace
                icon={<QrcodeIcon />}
                className="text-center tracking-wider"
                patternFormatProps={{
                  format: "# # # # # #",
                  allowEmptyFormatting: true,
                  mask: "_",
                }}
              />
              <span className={`mt-2 block w-full select-none text-center text-sm font-medium ${countDown > 0 ? "cursor-not-allowed text-gray-500" : "cursor-pointer text-secondary"}`} onClick={sendOtpAgain}>
                ارسال مجدد {countDown > 0 && "(" + moment.duration(countDown, "milliseconds").asSeconds().toFixed() + ")"}
              </span>
            </>
          )}
          <div className="mt-6" />
          <Button
            /* */
            title="ورود"
            noSpace
            type="submit"
            loading={isSubmitSuccessful || isSubmitting || isLoading || isValidating}
          />
        </form>
        <span className="mt-5 block cursor-pointer select-none p-1 text-center text-sm font-medium text-blue-500" onClick={() => router.push("/")}>
          بازگشت به صفحه اصلی
        </span>
      </div>
    </>
  );
}

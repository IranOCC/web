import Modal from ".";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import LoginBackImage from "@/assets/images/city-bg.png";
import { LoginPhoneOtpFormData } from "@/types/formsData";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import axios from "@/lib/axios";
import { toast } from "@/lib/toast";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import PhoneIcon from "@/components/Icons/Phone";
import QrcodeIcon from "@/components/Icons/Qrcode";
import { useCountdown } from "@/hooks/useCountdown";
import moment from "moment";
import { Session } from "@/types/interfaces";

const ModalPath = "auth";
const LoginModal = ({ session }: { session: Session | null }) => {
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
    } catch (error) {}
  };
  const loginByOtp = async (data: LoginPhoneOtpFormData) => {
    const result = await signIn("otp", { ...data, callbackUrl: "/", redirect: false });
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
    if (searchParams?.get("modal") === ModalPath) {
      if (session) window.location.href = "/";
    }
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

  if (session) return null;
  return (
    <Modal path={ModalPath} whiteClose>
      <div className={`absolute top-0 left-0 bg-blue-500 w-full h-40 overflow-hidden`}>
        <img src={LoginBackImage.src} />
        <div className="absolute top-0 left-0  w-full h-full" />
      </div>
      <div className="mt-40">
        <h2 className="text-blue-500 text-center font-bold mb-2">ورود یا عضویت</h2>
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
            noSpace
            icon={<PhoneIcon />}
          />
          {isStep2 && (
            <>
              <span className="block text-center font-medium w-full text-sm text-blue-500 mt-2 mb-6 cursor-pointer" onClick={editNumber}>
                ویرایش شماره
              </span>
              <Input
                /* */
                control={control}
                name="token"
                label="کد ارسالی"
                error={errors.token?.message}
                loading={isSubmitting}
                direction="ltr"
                noSpace
                icon={<QrcodeIcon />}
                className="text-center tracking-wider"
              />
              <span className={`block text-center font-medium w-full text-sm mt-2 ${countDown > 0 ? "text-gray-500 cursor-not-allowed" : "text-blue-500 cursor-pointer"}`} onClick={sendOtpAgain}>
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
      </div>
    </Modal>
  );
};

export default LoginModal;

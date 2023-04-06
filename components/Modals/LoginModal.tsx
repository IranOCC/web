import Modal from ".";
import { Button } from "@/components/Button";
import { Input, PhoneInput } from "@/components/Input";
import LoginBackImage from "@/assets/images/city-bg.png";
import { PhoneOtpFormData } from "@/types/formsData";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { resolve } from "path";
import axios from "@/lib/axios";
import { toast } from "@/lib/toast";
import { useRouter, useSearchParams } from "next/navigation";

const LoginModal = () => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isLoading, isSubmitting, isValidating },
  } = useForm<PhoneOtpFormData>();
  const loading = isLoading || isSubmitting || isValidating;

  const router = useRouter();
  const searchParams = useSearchParams();
  if (searchParams?.get("phone")) {
  }
  const onSubmit = async (data: PhoneOtpFormData) => {
    try {
      const response = await axios.post("/auth/phoneOtp", data);
      toast.success("کد با موفقیت ارسال شد");
      const { phone } = response.data;
      router.push("?phone=" + phone);
    } catch (error) {}
  };

  useEffect(() => {
    register("phone", { required: "شماره خود را وارد کنید" });
  }, [register]);

  return (
    <Modal path="auth" whiteClose>
      <div className={`absolute top-0 left-0 bg-blue-500 w-full h-40 overflow-hidden`}>
        <img src={LoginBackImage.src} />
        <div className="absolute top-0 left-0  w-full h-full" />
      </div>
      <div className="mt-40">
        <h2 className="text-blue-500 text-center font-bold mb-2">ورود یا عضویت</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PhoneInput
            /* */
            control={control}
            name="phone"
            error={errors.phone?.message}
            loading={loading}
          />
          <Button
            /* */
            title="ورود"
            noSpace
            type="submit"
            loading={loading}
          />
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;

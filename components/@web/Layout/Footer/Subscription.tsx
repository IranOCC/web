import { Input } from "@/components/Input";
import { SubscriptionFormData } from "@/types/formsData";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import LoginBackImage from "@/assets/images/city-bg.png";
import { toast } from "@/lib/toast";
import Image from "next/image";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { handleFieldsError } from "@/lib/axios";

const Subscription = () => {
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
  } = useForm<SubscriptionFormData>();

  const api = useAxiosAuth();

  useEffect(() => {
    register("email", { required: "ایمیل را وارد کنید" });
  }, []);

  const onSubmit = async (data: SubscriptionFormData) => {
    try {
      const response = await api.post("/subscription", data);
      toast.success("با موفقیت ثبت شد");
      return true;
    } catch (error) {
      handleFieldsError(error, setError);
    }
  };

  return (
    <div className="bg-white relative">
      <div className="bg-slate-100 absolute top-0 w-full h-1/2"></div>
      <div className="mx-auto w-full px-8 max-w-screen-xl">
        <div className="relative rounded-lg bg-blue-500 overflow-hidden text-white">
          <div className={`absolute top-0 left-0 h-full w-full`}>
            <div className="relative h-full w-1/2  right-0">
              <Image src={LoginBackImage.src} alt="City" fill style={{ objectFit: "cover", opacity: 0.5 }} />
              <div className="absolute top-0 left-0  w-full h-full" />
            </div>
            <div className="absolute top-auto -left-20 -bottom-20 w-60 h-60 bg-white opacity-10 rounded-full" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="py-20 px-16 grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="flex flex-col relative">
                <div className="text-sm">خبرنامه</div>
                <h3 className="font-semibold text-lg mt-2">برای خبرنامه ثبت نام کنید و آخرین اخبار و به روز رسانی را دریافت کنید</h3>
              </div>
              <div className="flex items-center justify-stretch">
                <Input
                  /* */
                  control={control}
                  name="email"
                  placeholder="ایمیل خود را وارد کنید"
                  error={errors.email?.message}
                  // disabled={isSubmitSuccessful}
                  loading={isSubmitting}
                  direction="ltr"
                  innerSubmitBtn="اشتراک"
                  size="large"
                  noSpace
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Subscription;

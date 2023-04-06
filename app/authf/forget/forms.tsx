import { useForm } from "react-hook-form";

export const LoginByEmail = () => {
  type FormData = {
    email: string;
    password: string;
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const submit = async (data: any) => {
    alert("hello");
    console.log(data);
  };

  return (
    <>
      LoginByEmail
      <form onSubmit={handleSubmit(submit)}>
        <input {...register("email", { required: true })} placeholder="Email" />
        <input {...register("password", { required: true })} placeholder="Password" />
        <input type="submit" />
      </form>
    </>
  );
};

export const RequestOtpCode = () => {
  type FormData = {
    phoneNumber: string;
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const submit = async (data: any) => {
    alert("hello");
    console.log(data);
  };

  return (
    <>
      RequestOtpCode
      <form onSubmit={handleSubmit(submit)}>
        <input {...register("phoneNumber", { required: true })} placeholder="PhoneNumber" />
        <input type="submit" />
      </form>
    </>
  );
};

export const LoginByPhone = () => {
  type FormData = {
    phoneNumber: string;
    otp: string;
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const submit = async (data: any) => {
    alert("hello");
    console.log(data);
  };

  return (
    <>
      LoginByPhone
      <form onSubmit={handleSubmit(submit)}>
        <input {...register("phoneNumber", { required: true })} placeholder="PhoneNumber" />
        <input {...register("otp", { required: true })} placeholder="Otp" />
        <input type="submit" />
      </form>
    </>
  );
};

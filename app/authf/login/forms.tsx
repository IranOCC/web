"use client";

import axios from "@/lib/axios";
import { LoginByOtpFormData, LoginFormData, PhoneOtpFormData } from "@/types/formsData";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

export const LoginForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    // const result = await signIn("general", { ...data, callbackUrl: "/", redirect: true });
  };

  return (
    <>
      Login Form
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username", { required: true })} placeholder="Username or Email" />
        <br />
        <input {...register("password", { required: true })} placeholder="Password" />
        <br />
        <input type="submit" />
      </form>
    </>
  );
};

export const PhoneOtpForm = () => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<PhoneOtpFormData>();

  const submit = async (data: PhoneOtpFormData) => {
    const response = await axios.post("/auth/phoneOtp", data);
  };

  return (
    <>
      RequestOtpCode
      <form onSubmit={handleSubmit(submit)}>
        <input {...register("phone", { required: true })} placeholder="Phone" />
        <input type="submit" />
      </form>
    </>
  );
};

export const LoginByOtpForm = () => {
  const router = useRouter();
  const searchParam = useSearchParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginByOtpFormData>();

  const onSubmit = async (data: LoginByOtpFormData) => {
    // const response = await axios.post("/auth/loginByOtp", data);
    const result = await signIn("otp", { ...data, callbackUrl: "/", redirect: false });
    if (result?.ok) {
      const callbackUrl = searchParam?.get("callbackUrl");
      router.push(callbackUrl ?? "/");
    } else {
      alert(result?.error);
    }
  };

  return (
    <>
      Login Otp
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("phone", { required: true })} placeholder="Phone" />
        <input {...register("token", { required: true })} placeholder="Token" />
        <input type="submit" />
      </form>
    </>
  );
};

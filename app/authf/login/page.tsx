import { LoginForm, LoginByOtpForm, PhoneOtpForm } from "./forms";

interface IProps {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = async ({ searchParams }: IProps) => {
  return (
    <>
      <hr />
      {searchParams?.message || "No message"}
      <br />
      <hr />
      <LoginForm />
      <br />
      <hr />
      <br />
      <PhoneOtpForm />
      <br />
      <LoginByOtpForm />
      <br />
      <hr />
      <br />
    </>
  );
};

export default Page;

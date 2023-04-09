import { ChangeEventHandler, ReactNode } from "react";
import PhoneIcon from "@/components/Icons/Phone";
import Input, { IProps } from "./Input";

const PhoneInput = (props: IProps) => {
  return <Input maxLength={11} direction="ltr" label="شماره موبایل" icon={<PhoneIcon />} {...props} />;
};

export default PhoneInput;
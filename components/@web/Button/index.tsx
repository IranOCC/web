import { Button } from "@/components/Button";
import { ReactNode } from "react";

export const WebButton = (props: IProps) => {
  return (
    <Button
      //
      {...props}
      className={`${!!props?.className ? props?.className : ""} rounded-2xl`}
    />
  );
};

type IProps = {
  type?: "button" | "submit";
  title?: string;
  variant?: "fill" | "outline";
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fill?: boolean;
  noSpace?: boolean;
  onClick?: any;
  size?: "small" | "default" | "large";
};

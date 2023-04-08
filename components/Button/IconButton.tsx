import { ReactNode } from "react";
import Button from "./Button";

const IconButton = (props: PropsTypes) => {
  const { onClick, icon = "", disabled = false, loading = false, type = "button", className = "" } = props;

  return (
    <Button
      //
      type={type}
      disabled={disabled}
      loading={loading}
      onClick={onClick}
      className={`!px-3 aspect-square rounded-full ${className}`}
      icon={icon}
      noSpace
    />
  );
};

type PropsTypes = {
  type?: "button" | "submit";
  className?: string;
  icon?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default IconButton;

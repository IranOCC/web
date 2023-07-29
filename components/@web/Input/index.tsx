import Input, { IProps } from "@/components/Input/Input";

export const WebInput = (props: IProps) => {
  return (
    <Input
      //
      {...props}
      className={`${props.className} rounded-2xl`}
    />
  );
};

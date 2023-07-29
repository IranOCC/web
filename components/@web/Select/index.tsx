import Select, { IProps } from "@/components/Select/Select";

export const WebSelect = (props: IProps) => {
  return (
    <Select
      //
      {...props}
      className={`${props.className} rounded-2xl`}
    />
  );
};

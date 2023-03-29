import { ChangeEventHandler } from "react";

const NormalInput = (props: PropsTypes) => {
  const { value, onChange } = props;
  return (
    <div>
      <input type="text" value={value} onChange={onChange} />
    </div>
  );
};

type PropsTypes = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
};

export default NormalInput;

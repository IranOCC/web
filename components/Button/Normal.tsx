

const NormalButton = (props: PropsTypes) => {
  const { title, onClick } = props;
  return (
    <div>
      <button onClick={onClick}>{title}</button>
    </div>
  );
};

type PropsTypes = {
  title: string;
  onClick: (e: any) => any;
};

export default NormalButton;

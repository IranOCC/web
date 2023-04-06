interface IProps {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

const Page = ({ searchParams }: IProps) => {
  return (
    <div>
      <b>Error Auth:</b> {searchParams?.error || ""}
    </div>
  );
};

export default Page;

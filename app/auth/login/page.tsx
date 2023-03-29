import NormalButton from "../../../components/Button/Normal";
import NormalInput from "../../../components/Input/Normal";

const Page = () => {
  return (
    <>
      <NormalInput
        value={""}
        onChange={(e: any) => {
          alert(e.target.value);
        }}
      />
      {/* <NormalInput
        value={""}
        onChange={function (e: any) {
          throw new Error("Function not implemented.");
        }}
      />
      <NormalButton
        title={""}
        onClick={function (e: any) {
          throw new Error("Function not implemented.");
        }}
      /> */}
    </>
  );
};

export default Page;

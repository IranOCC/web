import Image from "next/image";
import Logo from "@/assets/images/black-logo.png";

const DashboardSideBar = () => {
  return (
    <>
      <div className="h-full bg-secondary">
        {/*  */}
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <Image src={Logo} alt="logo" className="w-64" />
          <div className="flex flex-col gap-2">
            <h1 className="text-center text-xl font-extrabold">املاک اکازیون</h1>
            <h2 className="text-center text-lg font-bold">بزرگترین مرکز اطلاعات املاک شمال کشور</h2>
          </div>
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default DashboardSideBar;

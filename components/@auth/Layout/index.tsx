import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="absolute h-full w-full flex ">
      <div className={`relative top-0 left-0 bg-gradient-to-r from-primary to-secondary w-4/5 lg:w-1/2 h-full overflow-hidden hidden md:block`}>
        {/* <img src={LoginBackImage.src} /> */}
        <div className="absolute top-0 left-0 w-full h-full" />
      </div>
      <div className="w-full h-full p-4">{children}</div>
    </main>
  );
};

export default AuthLayout;

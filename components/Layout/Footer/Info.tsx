"use client";

import { Settings } from "@/types/interfaces";
import Image from "next/image";
import { useSelector } from "react-redux";
import WebLogo from "@/assets/images/logo.png";

const Info = () => {
  const settings: Settings | null = useSelector((state: any) => state.settings.settings as Settings);
  return (
    <div className="mb-6 md:mb-0">
      <a href="https://flowbite.com/" className="flex items-center">
        <Image src={WebLogo} alt={settings.title} height={40} />
        {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" /> */}
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
      </a>
    </div>
  );
};

export default Info;

{
  /* 
  <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com/" className="flex items-center">
              <Image src={WebLogo} alt={settings.title} height={40} />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
            </a>
          </div>
        
  
  <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
  <div>
    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
    <ul className="text-gray-600 dark:text-gray-400 font-medium">
      <li className="mb-4">
        <a href="https://flowbite.com/" className="hover:underline">
          Flowbite
        </a>
      </li>
      <li>
        <a href="https://tailwindcss.com/" className="hover:underline">
          Tailwind CSS
        </a>
      </li>
    </ul>
  </div>
  <div>
    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
    <ul className="text-gray-600 dark:text-gray-400 font-medium">
      <li className="mb-4">
        <a href="https://github.com/themesberg/flowbite" className="hover:underline ">
          Github
        </a>
      </li>
      <li>
        <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">
          Discord
        </a>
      </li>
    </ul>
  </div>
  <div>
    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
    <ul className="text-gray-600 dark:text-gray-400 font-medium">
      <li className="mb-4">
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
      </li>
      <li>
        <a href="#" className="hover:underline">
          Terms &amp; Conditions
        </a>
      </li>
    </ul>
  </div>
</div>

</div>





*/
}

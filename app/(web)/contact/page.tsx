"use client";

import ContactForm from "@/components/@web/Features/Contact/ContactForm";
import OfficesList from "@/components/@web/Features/Contact/Offices";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect } from "react";

export default function Page() {
  const { internalPage } = useContext(WebPreviewContext) as WebPreviewContextType;

  useEffect(() => {
    internalPage();
  }, []);

  return (
    <>
      <div className="flex h-auto min-h-full flex-col bg-gray-200 pb-16 md:bg-transparent md:px-4 md:pb-4">
        <div className="flex flex-col gap-2 px-3">
          <h1 className="relative flex w-fit justify-center pb-1 text-lg font-bold after:absolute after:bottom-0 after:h-1 after:w-[calc(100%-30px)] after:rounded-md after:bg-secondary after:content-['']">تماس با ما</h1>
        </div>
        <div className="w-full py-2">
          <div className="flex w-full flex-col gap-3 bg-green-500">
            {/*  */}
            <OfficesList />
            <ContactForm />
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
}

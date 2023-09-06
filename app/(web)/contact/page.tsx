// "use client";

import ContactForm from "@/components/@web/Features/Contact/ContactForm";
import OfficesList from "@/components/@web/Features/Contact/Offices";
import { fetchOfficeList } from "@/lib/ssr.fetch";

export default async function Page() {
  const officeList = await fetchOfficeList();

  return (
    <>
      <div className="flex h-auto min-h-full flex-col bg-gray-200 px-4 pb-16 md:bg-transparent md:pb-4">
        <div className="sticky top-0 z-20 flex w-full flex-col gap-2 self-start bg-gray-200 py-3 md:bg-white">
          <h1 className="relative flex w-fit justify-center pb-1 text-lg font-bold after:absolute after:bottom-0 after:h-1 after:w-[calc(100%-30px)] after:rounded-md after:bg-secondary after:content-['']">تماس با ما</h1>
        </div>
        <div className="flex h-full w-full flex-1 flex-col justify-between gap-5 py-2">
          <OfficesList dataList={officeList.items} />
          <ContactForm />
        </div>
      </div>
    </>
  );
}

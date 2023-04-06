import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type FooterButton = {
  title?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

type IProps = {
  title?: string;
  children: ReactNode;
  footerButton?: FooterButton[];

  closeButton?: boolean;
  whiteClose?: boolean;
  path: string;
};

export default function Modal({ path, title, children, footerButton, closeButton = true, whiteClose = false }: IProps) {
  const cancelButtonRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const modal = searchParams?.get("modal");

  const [open, _setOpen] = useState(false);
  const setOpen = (status: boolean) => {
    if (status) router.push("?modal=" + path);
    else {
      router.back();
    }
  };
  useEffect(() => {
    _setOpen(modal === path);
  }, [pathname, searchParams]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-4">
                  {closeButton && (
                    <div className={"absolute z-10 flex justify-center items-center w-7 h-7 rounded-full cursor-pointer" + (whiteClose ? " text-white" : " text-blue-500")} onClick={() => setOpen(false)}>
                      <FontAwesomeIcon icon={faXmark} size="lg" />
                    </div>
                  )}
                  <div className="mt-8 sm:flex sm:items-start">
                    <div className="w-full text-center sm:text-left block">
                      {title && (
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          {title}
                        </Dialog.Title>
                      )}
                      {children}
                    </div>
                  </div>
                </div>
                {footerButton?.length ? (
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={() => setOpen(false)}>
                      Deactivate
                    </button>
                    <button type="button" className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => setOpen(false)} ref={cancelButtonRef}>
                      Cancel
                    </button>
                  </div>
                ) : null}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

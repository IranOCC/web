"use client";

import { Fragment, ReactNode, useEffect, useRef, useState } from "react";
// @ts-ignore
import { Dialog, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Spin } from "antd";

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

  open?: boolean;
  setOpen?: any;

  className?: string;
  paddingChildren?: boolean;
  loading?: boolean;
};

export default function Modal({ paddingChildren = true, open, setOpen, title, children, footerButton, closeButton = true, whiteClose = false, className = "", loading }: IProps) {
  const cancelButtonRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [_open, _setOpen] = useState(false);
  const openHandler = (status: boolean) => {
    if (setOpen) setOpen(status);
  };
  useEffect(() => {
    _setOpen(!!open);
  }, [open]);

  return (
    <Transition.Root show={_open} as={Fragment}>
      <Dialog as="div" className="relative z-[1500]" initialFocus={cancelButtonRef} onClose={openHandler}>
        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center text-center sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={"relative w-full transform overflow-hidden bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:rounded-lg" + " " + className}>
                <div className="bg-white px-4 pb-4 pt-4">
                  {closeButton && (
                    <div className={"absolute end-4 z-10 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full" + (whiteClose ? " text-white" : " text-secondary")} onClick={() => setOpen(false)}>
                      <FontAwesomeIcon icon={faXmark} size="lg" />
                    </div>
                  )}
                  <div className={(closeButton ? "mt-8" : "mt-0") + " sm:flex sm:items-start"}>
                    <div className="block w-full text-center sm:text-start">
                      {title && (
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          {title}
                        </Dialog.Title>
                      )}
                      <div className={"relative max-h-[calc(100vh-8rem)] overflow-x-hidden " + (paddingChildren ? "p-2" : "")}>
                        {!!loading && (
                          <div className="flex items-center justify-center py-10">
                            <Spin />
                          </div>
                        )}
                        {children}
                      </div>
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

type OpenModalLinkProps = {
  children: ReactNode;
  path: string;
  className?: string;
};

export const OpenModalLink = ({ children, path, className = "" }: OpenModalLinkProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let restParams: any = {};
  searchParams?.forEach((value, key) => {
    if (!restParams[key]) restParams[key] = [];
    restParams[key].push(value);
  });
  return (
    <Link href={{ pathname, query: { ...restParams, modal: path } }} className={className}>
      {children}
    </Link>
  );
};

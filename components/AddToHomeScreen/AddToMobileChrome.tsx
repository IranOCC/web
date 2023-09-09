import React from "react";

import { FaTimes } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { MdAddToHomeScreen } from "react-icons/md";
import { ImArrowUp } from "react-icons/im";

interface Props {
  closePrompt: () => void;
  doNotShowAgain: () => void;
}

export default function AddToMobileChrome(props: Props) {
  const { closePrompt, doNotShowAgain } = props;

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-[60%] px-4 pt-12 text-white">
      <ImArrowUp className="absolute right-[10px] top-[10px] z-10 animate-bounce text-4xl text-indigo-700" />
      <div className="relative flex h-full flex-col items-center justify-around rounded-xl bg-primary p-4 text-center">
        <button className="absolute right-0 top-0 p-3" onClick={closePrompt}>
          <FaTimes className="text-2xl" />
        </button>
        <p className="text-lg">For the best experience, we recommend installing the Valley Trader app to your home screen!</p>
        <div className="flex items-center gap-2 text-lg">
          <p>Click the</p>
          <HiDotsVertical className="text-4xl" />
          <p>icon</p>
        </div>
        <div className="flex w-full flex-col items-center gap-2 px-4 text-lg">
          <p>Scroll down and then click:</p>
          <div className="bg-zinc-50 text-zinc-900 flex w-full items-center justify-between rounded-lg px-4 py-2">
            <MdAddToHomeScreen className="text-2xl" />
            <p>Add to Home Screen</p>
          </div>
        </div>
        <button className="border-2 p-1" onClick={doNotShowAgain}>
          Don&apos;t show again
        </button>
      </div>
    </div>
  );
}

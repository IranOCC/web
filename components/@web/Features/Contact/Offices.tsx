"use client";

import "keen-slider/keen-slider.min.css";
import { useContext, useEffect, useState } from "react";
import OfficeCard from "./OfficeCard";
import { WebOffice } from "@/types/interfaces";
import { useKeenSlider } from "keen-slider/react";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";

const OfficesList = ({ dataList }: { dataList: WebOffice[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { isFullscreen, isFullContent } = useContext(WebPreviewContext) as WebPreviewContextType;
  const animation = { duration: 10000, easing: (t: number) => t };
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    mode: "free",
    rtl: true,
    renderMode: "performance",
    loop: true,
    // vertical: true,

    slides: {
      perView: 2,
      spacing: 12,
    },

    breakpoints: {
      "(max-width: 1200px)": {
        slides: {
          perView: "auto",
          spacing: 12,
        },
      },
      "(max-width: 425px)": {
        slides: {
          perView: 1,
          spacing: 12,
        },
      },
    },
    // created(s) {
    //   const start = 0;
    //   const end = s.slides.length - 1;
    //   // if (s.track.details.rel === start) setTimeout(() => s.moveToIdx(end, true, animation), 500);
    //   // if (s.track.details.rel === end) setTimeout(() => s.moveToIdx(start, true, animation), 500);
    //   s.moveToIdx(end, true, animation);
    // },
    updated(s) {
      const start = 0;
      const end = s.slides.length - 1;
      // if (s.track.details.rel === start) setTimeout(() => s.moveToIdx(end, true, animation), 500);
      // if (s.track.details.rel === end) setTimeout(() => s.moveToIdx(start, true, animation), 500);
      s.moveToIdx(s.track.details.abs + end, true, animation);
    },
    animationEnded(s) {
      const start = 0;
      const end = s.slides.length - 1;
      // if (s.track.details.rel === start) setTimeout(() => s.moveToIdx(end, true, animation), 500);
      // if (s.track.details.rel === end) setTimeout(() => s.moveToIdx(start, true, animation), 500);
      s.moveToIdx(s.track.details.abs + end, true, animation);
    },
    slideChanged(s) {
      setCurrentSlide(s.track.details.rel);
    },
    // created() {
    //   setLoaded(true);
    // },
  });
  const adaptSize = () => {
    const slider = instanceRef.current!;
    // @ts-ignore
    if (slider) slider.container.style.width = slider.slides[slider.track.details.rel]?.parentNode?.parentNode?.offsetWidth + "px";
    if (slider) slider.container.style.height = slider.slides[slider.track.details.rel].offsetHeight + "px";
    if (slider) slider.update();
  };

  useEffect(() => {
    window.addEventListener("resize", adaptSize, false);
  }, []);

  useEffect(() => {
    setTimeout(adaptSize, 700);
    setTimeout(adaptSize, 1000);
    setTimeout(adaptSize, 1500);
  }, [isFullscreen, isFullContent]);

  return (
    <>
      <div className="relative">
        <div className="relative w-full">
          <div className="relative">
            {!!dataList?.length && (
              <div ref={sliderRef} className="keen-slider">
                {dataList.map((v, idx) => {
                  return (
                    <div key={idx} className={`keen-slider__slide group ${currentSlide === idx ? "isActive" : ""} flex min-w-[400px] flex-col gap-3 max-[425px]:min-w-0 lg:min-w-[500px]`}>
                      <OfficeCard data={v} />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default OfficesList;

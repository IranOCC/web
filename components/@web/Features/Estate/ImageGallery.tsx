import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { MutableRefObject, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { StorageFile } from "@/types/interfaces";
import { Fullscreen, HomeMaxOutlined } from "@mui/icons-material";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";

function ThumbnailPlugin(mainRef: MutableRefObject<KeenSliderInstance | null>): KeenSliderPlugin {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx: number) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

const AdaptiveHeight: KeenSliderPlugin = (slider) => {
  function updateHeight() {
    slider.container.style.height = slider.slides[slider.track.details.rel].offsetHeight + "px";
  }
  slider.on("created", () => setTimeout(updateHeight, 100));
  slider.on("slideChanged", updateHeight);
};

const ImageGallery = ({ items }: { items: StorageFile[] }) => {
  const { isFullscreen, isFullContent } = useContext(WebPreviewContext) as WebPreviewContextType;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      mode: "free-snap",
      rtl: true,
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
    },
    [AdaptiveHeight]
  );
  const [thumbnailRef, thumbInstanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      mode: "free-snap",
      rtl: true,
      slides: {
        perView: "auto",
        spacing: 16,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  const adaptSize = () => {
    const slider = instanceRef.current;
    const thumb = thumbInstanceRef.current;
    slider.container.style.width = slider.slides[slider.track.details.rel]?.parentNode?.parentNode?.offsetWidth + "px";
    slider.container.style.height = slider.slides[slider.track.details.rel].offsetHeight + "px";
    slider.update();
    thumb.update();
  };

  useEffect(() => {
    window.addEventListener("resize", adaptSize, false);
  }, []);

  useEffect(() => {
    setTimeout(adaptSize, 1000);
  }, [isFullscreen, isFullContent]);

  return (
    <>
      <div className="relative flex flex-col items-center justify-center overflow-hidden">
        <div className="relative flex h-full w-full items-center overflow-hidden rounded-xl">
          <div ref={sliderRef} className="keen-slider">
            {items.map(({ path, title, alt }, idx) => {
              return (
                <div key={idx} className="keen-slider__slide relative flex !h-fit !min-h-fit flex-col items-center justify-center self-end overflow-hidden rounded-xl">
                  <Image
                    //
                    src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + path}
                    alt={alt}
                    title={title}
                    width={800}
                    height={400}
                    className="block rounded-xl object-contain"
                  />
                </div>
              );
            })}
          </div>
          {loaded && instanceRef.current && (
            <>
              <Arrow onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()} disabled={currentSlide === 0} />
              <Arrow left onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()} disabled={currentSlide === instanceRef.current.track.details.slides.length - 1} />
            </>
          )}
        </div>
        <div className="flex w-full flex-col gap-4 py-4 lg:flex-row">
          <div className="order-last  h-full lg:order-first">
            <div className="relative grid h-28 min-w-[26rem] grid-cols-4 flex-row items-center justify-center rounded-2xl bg-gray-200 px-1 text-gray-700">
              {/*  */}
              <div className="flex flex-col items-center justify-center gap-1.5 border-gray-400/70 border-e-2">
                <span>متراژ بنا</span>
                <Fullscreen />
                <b className="text-center text-base font-extrabold leading-none text-black">250 مترمربع</b>
              </div>
              {/*  */}
              <div className="flex flex-col items-center justify-center gap-1.5 border-gray-400/70 border-e-2">
                <span>متراژ بنا</span>
                <Fullscreen />
                <b className="text-center text-base font-extrabold leading-none text-black">250 مترمربع</b>
              </div>
              {/*  */}
              <div className="flex flex-col items-center justify-center gap-1.5 border-gray-400/70 border-e-2">
                <span>متراژ بنا</span>
                <Fullscreen />
                <b className="text-center text-base font-extrabold leading-none text-black">250 مترمربع</b>
              </div>{" "}
              {/*  */}
              <div className="flex flex-col items-center justify-center gap-1.5">
                <span>متراژ بنا</span>
                <Fullscreen />
                <b className="text-center text-base font-extrabold leading-none text-black">250 مترمربع</b>
              </div>
              {/*  */}
            </div>
          </div>
          <div ref={thumbnailRef} className="keen-slider">
            {items.map(({ path, title, alt }, idx) => {
              return (
                <div key={idx} className="keen-slider__slide group relative flex aspect-square h-28 w-28 min-w-[7rem] max-w-[7rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl">
                  <Image
                    //
                    src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + path}
                    alt={alt}
                    title={title}
                    width={112}
                    height={112}
                    className="block h-full rounded-xl border-2 border-transparent object-fill group-[.active]:border-secondary"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;

function Arrow(props: { disabled: boolean; left?: boolean; onClick: (e: any) => void }) {
  return (
    <div onClick={props.onClick} className={`${props.left ? "left-0" : "left-auto right-0"} ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"} absolute flex h-full items-center justify-center px-2`}>
      <div className={`rounded-xl bg-gray-100 p-2 ${props.disabled ? "opacity-50" : ""}`}>
        <svg className="h-6 w-6 fill-gray-400/80" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          {props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
          {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
        </svg>
      </div>
    </div>
  );
}

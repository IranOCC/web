import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { MutableRefObject, ReactNode, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { StorageFile } from "@/types/interfaces";
import { Fullscreen, HomeMaxOutlined } from "@mui/icons-material";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import MarkerIcon from "@/components/Icons/MarkerIcon";
import Scrollbars from "react-custom-scrollbars-2";

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

const ImageGallery = ({ items, title, id, code, features, address }: { items: StorageFile[]; title: string; address: string; code?: string; id: string; features: { title: string; value: string; icon?: ReactNode }[] }) => {
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
    const slider = instanceRef.current!;
    const thumb = thumbInstanceRef.current!;
    // @ts-ignore
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
      <div className="relative flex flex-col items-center justify-center overflow-hidden bg-gray-200 md:bg-transparent">
        <div className="relative flex h-full w-full items-center overflow-hidden rounded-b-2xl md:rounded-xl">
          <div ref={sliderRef} className="keen-slider">
            {items.map(({ path, title, alt }, idx) => {
              return (
                <div key={idx} className="keen-slider__slide relative flex !h-fit !min-h-fit flex-col items-center justify-center self-end overflow-hidden">
                  <Image
                    //
                    src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + path}
                    alt={alt}
                    title={title}
                    width={800}
                    height={400}
                    className="block rounded-b-2xl object-contain md:rounded-xl"
                  />
                </div>
              );
            })}
          </div>
          {!!code && <div className="absolute bottom-3 left-3 block rounded-full bg-gray-300 px-2 py-1 font-bold text-gray-700 md:hidden">{code}</div>}
          {loaded && instanceRef.current && (
            <>
              <Arrow onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()} disabled={currentSlide === 0} />
              <Arrow left onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()} disabled={currentSlide === instanceRef.current.track.details.slides.length - 1} />
            </>
          )}
        </div>
        <div className="flex w-full flex-col gap-3 px-3 pb-0 pt-3 md:gap-4 md:px-0 md:pb-4 md:pt-4 lg:flex-row">
          <div className="relative order-last -mx-3 flex h-full justify-center overflow-hidden rounded-2xl bg-white md:mx-0 md:bg-transparent lg:order-first lg:min-w-[21.0rem]">
            <div className="flex w-full flex-col items-start justify-start gap-2 p-3 md:p-0">
              <h1 className="block text-base font-bold md:hidden">{title}</h1>
              <h6 className="flex items-center gap-1 text-sm font-medium text-gray-600 md:hidden">
                <MarkerIcon />
                <span className="order-last lg:order-first">{address || "-"}</span>
              </h6>

              {!!features?.length && (
                <div className="relative flex h-28 w-full justify-center overflow-hidden rounded-2xl bg-gray-200 text-gray-700">
                  <Scrollbars
                    //
                    universal
                    autoHide={false}
                    hideTracksWhenNotNeeded
                    renderView={(props) => <div {...props} style={{ ...props.style, padding: 0, display: "grid", marginLeft: props.style.marginRight, marginRight: 0 }} />}
                    //
                    renderTrackHorizontal={(props) => <div {...props} style={{ ...props.style, borderRadius: 0, background: "#D6D6D6", bottom: 2, right: 2, left: 2, height: 2 }} />}
                    renderThumbHorizontal={(props) => <div {...props} style={{ ...props.style, background: "#BEBEBE", borderRadius: "20px", height: 6, bottom: 2 }} />}
                    //
                    renderTrackVertical={(props) => <div {...props} style={{ ...props.style, borderRadius: 0, background: "#D6D6D6", right: 2, bottom: 2, top: 2, width: 2 }} />}
                    renderThumbVertical={(props) => <div {...props} style={{ ...props.style, background: "#BEBEBE", borderRadius: "20px", width: 6, right: -2 }} />}
                  >
                    <div className="flex h-full flex-row items-center justify-self-center rounded-2xl bg-gray-200">
                      {features.map(({ title, value, icon }, idx) => {
                        return (
                          <div key={idx} className={"flex min-w-[5.5rem] flex-col items-center justify-center gap-1.5 border-gray-400/70 md:min-w-[7rem]" + (idx + 1 === features.length ? " border-none" : "  border-e-2")}>
                            <span className="text-sm">{title}</span>
                            {icon}
                            <b className="text-center text-sm font-extrabold leading-none text-black md:text-base">{value}</b>
                          </div>
                        );
                      })}
                    </div>
                  </Scrollbars>
                </div>
              )}
            </div>
          </div>
          <div ref={thumbnailRef} className="keen-slider">
            {items.map(({ path, title, alt }, idx) => {
              return (
                <div key={idx} className="keen-slider__slide group relative flex aspect-square h-20 w-20 min-w-[5rem] max-w-[5rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl md:h-28 md:w-28 md:min-w-[7rem] md:max-w-[7rem]">
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
    <div onClick={props.onClick} className={`${props.left ? "left-0" : "left-auto right-0"} ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"} absolute flex h-full items-center justify-center px-1 md:px-2`}>
      <div className={`hidden rounded-md bg-gray-100 p-1 md:block md:rounded-xl md:p-2 ${props.disabled ? "opacity-50" : ""}`}>
        <svg className="h-4 w-4 fill-gray-400/80 md:h-6 md:w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          {props.left && <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />}
          {!props.left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
        </svg>
      </div>
    </div>
  );
}

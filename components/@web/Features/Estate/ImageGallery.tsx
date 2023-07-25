import { useKeenSlider, KeenSliderPlugin, KeenSliderInstance } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { MutableRefObject } from "react";
import Image from "next/image";
import { StorageFile } from "@/types/interfaces";

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

const ImageGallery = ({ items }: { items: StorageFile[] }) => {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    mode: "free-snap",
    rtl: true,
  });
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      mode: "free-snap",
      rtl: false,
      slides: {
        perView: "auto",
        spacing: 5,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  return (
    <>
      <div ref={sliderRef} className="keen-slider zoom-out">
        {items.map(({ path, title, alt }) => {
          return (
            <div className="keen-slider__slide zoom-out__slide relative flex flex-col items-center justify-center overflow-hidden rounded-xl">
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
      <div className="flex w-full flex-row py-4">
        <div className="h-full bg-gray-200">
          salam
          {/*  */}
        </div>
        <div ref={thumbnailRef} className="keen-slider">
          {items.map(({ path, title, alt }) => {
            return (
              <div className="keen-slider__slide group relative flex min-w-[5rem] max-w-[5rem] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl">
                <Image
                  //
                  src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + path}
                  alt={alt}
                  title={title}
                  width={180}
                  height={100}
                  className="block h-full rounded-xl border-2 border-transparent object-fill group-[.active]:border-secondary"
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ImageGallery;

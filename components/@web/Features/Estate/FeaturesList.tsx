import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ReactNode, useContext, useEffect } from "react";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { Tooltip } from "antd";

const FeaturesList = ({ items }: { items: { title: string; value: string; icon?: ReactNode }[] }) => {
  const { isFullscreen, isFullContent } = useContext(WebPreviewContext) as WebPreviewContextType;

  const [featuresRef, featuresInstanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      mode: "free",
      rtl: true,
      rubberband: false,
      slides: {
        perView: "auto",
        spacing: 0,
      },
    },
    [WheelControls]
  );

  const adaptSize = () => {
    const slider = featuresInstanceRef.current!;
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
    <div className="relative grid h-28 w-full justify-center rounded-2xl bg-gray-200 text-gray-700">
      <div ref={featuresRef} className="keen-slider flex h-full !w-auto flex-row items-center rounded-2xl bg-gray-200">
        {items.map(({ title, value, icon }, idx) => {
          return (
            <Tooltip key={idx} title={`${title}: ${value}`} placement="bottom">
              <div className="keen-slider__slide relative flex min-w-[5.5rem] max-w-[5.5rem] items-center justify-center truncate md:min-w-[7rem] md:max-w-[7rem]">
                <div className={"flex w-full flex-col items-center justify-center gap-1.5 border-gray-400/70" + (idx + 1 === items.length ? " border-none" : "  border-e-2")}>
                  <span className="w-full truncate px-0.5 text-center text-sm">{title}</span>
                  {icon}
                  <b className="w-full truncate px-0.5 text-center text-sm font-extrabold leading-none text-black md:text-base">{value}</b>
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

const WheelControls: KeenSliderPlugin = (slider) => {
  let touchTimeout: ReturnType<typeof setTimeout>;
  let position: {
    x: number;
    y: number;
  };
  let wheelActive: boolean;

  function dispatch(e: WheelEvent, name: string) {
    position.x -= e.deltaX;
    position.y -= e.deltaY;
    slider.container.dispatchEvent(
      new CustomEvent(name, {
        detail: {
          x: position.x,
          y: position.y,
        },
      })
    );
  }

  function wheelStart(e: WheelEvent) {
    position = {
      x: e.pageX,
      y: e.pageY,
    };
    dispatch(e, "ksDragStart");
  }

  function wheel(e: WheelEvent) {
    dispatch(e, "ksDrag");
  }

  function wheelEnd(e: WheelEvent) {
    dispatch(e, "ksDragEnd");
  }

  function eventWheel(e: WheelEvent) {
    e.preventDefault();
    if (!wheelActive) {
      wheelStart(e);
      wheelActive = true;
    }
    wheel(e);
    clearTimeout(touchTimeout);
    touchTimeout = setTimeout(() => {
      wheelActive = false;
      wheelEnd(e);
    }, 50);
  }

  slider.on("created", () => {
    slider.container.addEventListener("wheel", eventWheel, {
      passive: false,
    });
  });
};

export default FeaturesList;

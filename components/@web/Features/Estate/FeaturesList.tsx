import { useKeenSlider, KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ReactNode, useContext, useEffect } from "react";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { Tooltip } from "antd";
import { WebEstate } from "@/types/interfaces";
import MeasurementIcon from "@/components/Icons/web/estate/Measurement";
import BuildingMeasurementIcon from "@/components/Icons/web/estate/BuildingMeasurement";
import TransferIcon from "@/components/Icons/web/estate/Transfer";
import RoomsIcon from "@/components/Icons/web/estate/Rooms";
import MastersIcon from "@/components/Icons/web/estate/Masters";
import ConstructionIcon from "@/components/Icons/web/estate/Construction";
import FloorsIcon from "@/components/Icons/web/estate/Floors";
import UnitsIcon from "@/components/Icons/web/estate/Units";
import FloorIcon from "@/components/Icons/web/estate/Floor";
import OldBuildingIcon from "@/components/Icons/web/estate/OldBuilding";

const FeaturesList = ({ data, isEstateCard = false }: { data: WebEstate; isEstateCard?: boolean }) => {
  const { isFullscreen, isFullContent } = useContext(WebPreviewContext) as WebPreviewContextType;

  const {
    //
    category,

    area,
    buildingArea,
    constructionYear,
    roomsCount,
    mastersCount,
    canBarter,
    floorsCount,
    unitsCount,
    floor,
    withOldBuilding,
  } = data;

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

  const featuresItems: { title: string; value: string; icon: ReactNode }[] = [];
  switch (category.slug) {
    case "villa":
      featuresItems.push({ title: "متراژ کل", value: `${area} مترمربع`, icon: <MeasurementIcon /> });
      featuresItems.push({ title: "متراژ بنا", value: `${buildingArea} مترمربع`, icon: <BuildingMeasurementIcon /> });
      featuresItems.push({ title: "سال ساخت", value: `${constructionYear}`, icon: <ConstructionIcon /> });
      featuresItems.push({ title: "تعداد اتاق", value: `${roomsCount}`, icon: <RoomsIcon /> });
      featuresItems.push({ title: "تعداد مستر", value: `${mastersCount}`, icon: <MastersIcon /> });
      featuresItems.push({ title: "قابل تهاتر", value: `${canBarter ? "می باشد" : "نمی باشد"}`, icon: <TransferIcon /> });
      break;
    case "apartment":
      featuresItems.push({ title: "متراژ کل", value: `${area} مترمربع`, icon: <MeasurementIcon /> });
      featuresItems.push({ title: "تعداد طبقات", value: `${floorsCount}`, icon: <FloorsIcon /> });
      featuresItems.push({ title: "تعداد واحدها", value: `${unitsCount}`, icon: <UnitsIcon /> });
      featuresItems.push({ title: "طبقه", value: `${floor}`, icon: <FloorIcon /> });
      featuresItems.push({ title: "تعداد خواب", value: `${roomsCount}`, icon: <RoomsIcon /> });
      featuresItems.push({ title: "تعداد مستر", value: `${mastersCount}`, icon: <MastersIcon /> });
      featuresItems.push({ title: "قابل تهاتر", value: `${canBarter ? "می باشد" : "نمی باشد"}`, icon: <TransferIcon /> });
      break;
    case "commercial":
      featuresItems.push({ title: "متراژ کل", value: `${area} مترمربع`, icon: <MeasurementIcon /> });
      featuresItems.push({ title: "متراژ بر تجاری", value: `${buildingArea} مترمربع`, icon: <BuildingMeasurementIcon /> });
      featuresItems.push({ title: "طبقه", value: `${floor}`, icon: <FloorIcon /> });
      featuresItems.push({ title: "قابل تهاتر", value: `${canBarter ? "می باشد" : "نمی باشد"}`, icon: <TransferIcon /> });
      break;
    case "land":
    case "hectare":
      featuresItems.push({ title: "متراژ کل", value: `${area} مترمربع`, icon: <MeasurementIcon /> });
      featuresItems.push({ title: "ساختمان قدیمی", value: `${withOldBuilding ? "دارد" : "ندارد"}`, icon: <OldBuildingIcon /> });
      featuresItems.push({ title: "قابل تهاتر", value: `${canBarter ? "می باشد" : "نمی باشد"}`, icon: <TransferIcon /> });
      break;
  }

  return (
    <div className={"group relative grid h-28 w-full justify-center rounded-2xl text-gray-700" + (isEstateCard ? " esCard bg-transparent" : " bg-gray-200")}>
      <div ref={featuresRef} className="keen-slider flex h-full !w-auto flex-row items-center rounded-2xl bg-gray-200 group-[.esCard]:bg-transparent">
        {featuresItems.map(({ title, value, icon }, idx) => {
          return (
            <Tooltip key={idx} title={`${title}: ${value}`} placement="bottom">
              <div className="keen-slider__slide relative flex min-w-[5.5rem] max-w-[5.5rem] items-center justify-center truncate md:min-w-[7rem] md:max-w-[7rem]">
                <div className={"flex w-full flex-col items-center justify-center gap-1.5 border-gray-400/70" + (idx + 1 === featuresItems.length ? " border-none" : "  border-e-2")}>
                  <span className="w-full truncate px-0.5 text-center text-sm">{title}</span>
                  <i className="relative h-7 w-7 overflow-hidden text-gray-800">{icon}</i>
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

import "keen-slider/keen-slider.min.css";
import { useContext, useEffect, useState } from "react";
import OfficeCard from "./OfficeCard";
import { WebOffice } from "@/types/interfaces";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useKeenSlider } from "keen-slider/react";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";

const OfficesList = () => {
  const { isFullscreen, isFullContent } = useContext(WebPreviewContext) as WebPreviewContextType;

  const api = useAxiosAuth();
  const [current, setCurrent] = useState([1]);
  const [dataList, setDataList] = useState<WebOffice[]>([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const getData = async () => {
    setDataLoading(true);
    try {
      const response = await api.get(`/office?size=10&current=${current[0]}`);
      const data = response.data as { items: WebOffice[]; total: number };
      if (current[0] === 1) {
        setDataList(data?.items || []);
        setItemsCount(data?.total || 0);
      } else {
        setDataList((d) => [...d, ...data.items]);
      }
      setDataLoading(false);
    } catch (error) {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    mode: "free",
    rtl: true,
    // loop: true,
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
    // slideChanged(s) {
    //   setCurrentSlide(s.track.details.rel);
    // },
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
      <div className="relative my-4 px-3">
        <div className="relative h-fit w-full overflow-hidden">
          <div className="relative min-[426px]:max-h-[300px] md:max-h-[268px]">
            {!!dataList?.length && (
              <div ref={sliderRef} className="keen-slider h-fit">
                {dataList
                  .filter((v, i) => i % 2 == 0)
                  .map((v, i) => [v, dataList?.[i + 1]])
                  .map(([v1, v2], idx) => {
                    return (
                      <div key={idx} className="keen-slider__slide flex min-w-[400px] flex-col gap-3 max-[425px]:min-w-0 lg:min-w-[500px]">
                        <OfficeCard data={v1} />
                        <OfficeCard data={v2} />
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

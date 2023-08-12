import { useEffect, useState } from "react";
import OfficeCard from "./OfficeCard";
import { WebOffice } from "@/types/interfaces";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { useKeenSlider } from "keen-slider/react";

const OfficesList = () => {
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

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      mode: "snap",
      rtl: true,
      vertical: true,
      slides: {
        perView: 2,
        spacing: 10,
      },
      // slideChanged(s) {
      //   setCurrentSlide(s.track.details.rel);
      // },
      // created() {
      //   setLoaded(true);
      // },
    },
    []
  );
  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-1 gap-4">
          <div ref={sliderRef} className="keen-slider">
            {dataList.map((v, idx) => {
              return (
                <div key={idx} className="keen-slider__slide">
                  <OfficeCard data={v} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default OfficesList;

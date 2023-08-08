import { useEffect, useState } from "react";
import OfficeCard from "./OfficeCard";
import { WebOffice } from "@/types/interfaces";
import useAxiosAuth from "@/hooks/useAxiosAuth";

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
  return (
    <>
      <div className="h-20 w-full bg-red-500">
        <div className="grid grid-cols-1 gap-4">
          {dataList.map((v, idx) => {
            return <OfficeCard key={idx} data={v} />;
          })}
        </div>
      </div>
    </>
  );
};

export default OfficesList;

import { Button, Card, CardFooter, Image, CardHeader, Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip, CardBody } from "@nextui-org/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, LineChart, Tooltip, ResponsiveContainer, Line, Brush, BarChart, Legend, Bar, Sector, PieChart, Pie, Cell } from "recharts";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { useState, Key, useEffect, useMemo } from "react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import moment from "jalali-moment";
import { usePrevious } from "@/hooks/usePrevious";
import { ItemBox } from "./FirstSightStatistic";

export const MyStatistics = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ today: any; yesterday: any; thisMonth: any; lastMonth: any; all: any }>();

  const api = useAxiosAuth();
  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/dashboard/myStatistics`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      // setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={"relative grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 md:grid-cols-4" + (loading ? " is-loading" : "")}>
      <ItemBox
        //
        title="فایل های من"
        data={data?.all?.total}
        bg="rgb(255, 200, 0 / 50%)"
        footerBg="rgb(255, 200, 0)"
      />
      <ItemBox
        //
        title="تایید شده های من"
        data={data?.all?.confirmed}
        bg="rgb(24, 201, 100 / 50%)"
        footerBg="rgb(24, 201, 100)"
      />
      <ItemBox
        //
        title="رد شده های من"
        data={data?.all?.rejected}
        bg="rgb(243, 18, 96 / 50%)"
        footerBg="rgb(243, 18, 96)"
      />
      <ItemBox
        //
        title="معلق های من"
        data={data?.all?.pending}
        bg="rgb(245, 165, 36 / 50%)"
        footerBg="rgb(245, 165, 36)"
      />
      <div className="col-span-2 grid grid-cols-1 gap-4 rounded-2xl bg-black/50 p-4 min-[420px]:grid-cols-3">
        <div className="col-span-full text-center text-lg font-bold text-white">
          {/*  */}
          عملکرد امروز من
        </div>
        <ItemBox
          //
          title=""
          data={data?.today?.total}
          bg="rgb(255, 200, 0 / 50%)"
          footerBg="rgb(255, 200, 0)"
        />
        <ItemBox
          //
          title=""
          data={data?.today?.confirmed}
          bg="rgb(24, 201, 100 / 50%)"
          footerBg="rgb(24, 201, 100)"
        />
        <ItemBox
          //
          title=""
          data={data?.today?.rejected}
          bg="rgb(243, 18, 96 / 50%)"
          footerBg="rgb(243, 18, 96)"
        />
      </div>
      <div className="col-span-2 grid grid-cols-1 gap-4 rounded-2xl bg-black/50 p-4 min-[420px]:grid-cols-3">
        <div className="col-span-full text-center text-lg font-bold text-white">
          {/*  */}
          عملکرد دیروز من
        </div>
        <ItemBox
          //
          title=""
          data={data?.yesterday?.total}
          bg="rgb(255, 200, 0 / 50%)"
          footerBg="rgb(255, 200, 0)"
        />
        <ItemBox
          //
          title=""
          data={data?.yesterday?.confirmed}
          bg="rgb(24, 201, 100 / 50%)"
          footerBg="rgb(24, 201, 100)"
        />
        <ItemBox
          //
          title=""
          data={data?.yesterday?.rejected}
          bg="rgb(243, 18, 96 / 50%)"
          footerBg="rgb(243, 18, 96)"
        />
      </div>
      <div className="col-span-2 grid grid-cols-1 gap-4 rounded-2xl bg-black/50 p-4 min-[420px]:grid-cols-3">
        <div className="col-span-full text-center text-lg font-bold text-white">
          {/*  */}
          عملکرد ماه جاری من
        </div>
        <ItemBox
          //
          title=""
          data={data?.thisMonth?.total}
          bg="rgb(255, 200, 0 / 50%)"
          footerBg="rgb(255, 200, 0)"
        />
        <ItemBox
          //
          title=""
          data={data?.thisMonth?.confirmed}
          bg="rgb(24, 201, 100 / 50%)"
          footerBg="rgb(24, 201, 100)"
        />
        <ItemBox
          //
          title=""
          data={data?.thisMonth?.rejected}
          bg="rgb(243, 18, 96 / 50%)"
          footerBg="rgb(243, 18, 96)"
        />
      </div>
      <div className="col-span-2 grid grid-cols-1 gap-4 rounded-2xl bg-black/50 p-4 min-[420px]:grid-cols-3">
        <div className="col-span-full text-center text-lg font-bold text-white">
          {/*  */}
          عملکرد ماه پیشین من
        </div>
        <ItemBox
          //
          title=""
          data={data?.lastMonth?.total}
          bg="rgb(255, 200, 0 / 50%)"
          footerBg="rgb(255, 200, 0)"
        />
        <ItemBox
          //
          title=""
          data={data?.lastMonth?.confirmed}
          bg="rgb(24, 201, 100 / 50%)"
          footerBg="rgb(24, 201, 100)"
        />
        <ItemBox
          //
          title=""
          data={data?.lastMonth?.rejected}
          bg="rgb(243, 18, 96 / 50%)"
          footerBg="rgb(243, 18, 96)"
        />
      </div>
      <div className="absolute right-0 top-0 z-20 hidden h-full w-full items-center justify-center bg-white/60 group-[.is-loading]:flex">
        <Spinner />
      </div>
    </div>
  );
};

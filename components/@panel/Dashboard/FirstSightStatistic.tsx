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

export const FirstSightStatistic = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ total: number; confirmed: number; rejected: number; pending: number }>();

  const api = useAxiosAuth();
  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/dashboard/firstSight`);
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
    <div className={"relative grid grid-cols-1 gap-4 min-[500px]:grid-cols-2 md:grid-cols-4" + (loading ? " is-loading" : "")}>
      <ItemBox
        //
        title="املاک ثبت شده"
        data={data?.total}
        bg="rgb(255, 200, 0)"
        footerBg="rgb(255, 200, 0)"
      />
      <ItemBox
        //
        title="املاک تایید شده"
        data={data?.confirmed}
        bg="rgb(24, 201, 100)"
        footerBg="rgb(24, 201, 100)"
      />
      <ItemBox
        //
        title="املاک رد شده"
        data={data?.rejected}
        bg="rgb(243, 18, 96)"
        footerBg="rgb(243, 18, 96)"
      />
      <ItemBox
        //
        title="املاک معلق"
        data={data?.pending}
        bg="rgb(245, 165, 36)"
        footerBg="rgb(245, 165, 36)"
      />
      <div className="absolute right-0 top-0 z-20 hidden h-full w-full items-center justify-center bg-white/60 group-[.is-loading]:flex">
        <Spinner />
      </div>
    </div>
  );
};

export const ItemBox = ({ data, title, bg, footerBg }: { data?: number; title: string; bg?: string; footerBg?: string }) => {
  return (
    <>
      <Card shadow="none" isFooterBlurred isPressable isHoverable className="group w-auto bg-white/80" style={{ background: bg }}>
        <CardHeader className="relative z-10 flex flex-col items-start gap-2"></CardHeader>
        <CardBody>
          <span className="text-4xl font-bold text-gray-700 lg:text-5xl">{data || 0}</span>
        </CardBody>
        <CardFooter className="z-10 gap-2 bg-secondary" style={{ background: footerBg }}>
          {title}
        </CardFooter>
      </Card>
    </>
  );
};

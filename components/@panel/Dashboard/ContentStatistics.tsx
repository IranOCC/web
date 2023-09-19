import { Button, Card, CardFooter, Image, CardHeader, Tabs, Tab } from "@nextui-org/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, LineChart, Tooltip, ResponsiveContainer, Line, Legend, Brush } from "recharts";
import { Spinner } from "@nextui-org/react";
import { useState, Key, useEffect } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export const PostsStatistics = () => {
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState<Key>("monthly");
  const [data, setData] = useState([]);

  const api = useAxiosAuth();
  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/dashboard/posts?period=${period}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      // setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [period]);

  return (
    <Card className={"group w-auto bg-white/80" + (loading ? " is-loading" : "")}>
      <CardHeader className="relative z-10 flex flex-col items-start gap-2">
        <h4 className="truncate text-base font-bold">آمار پست ها</h4>
      </CardHeader>
      <LineChartMode
        data={data}
        items={[
          { name: "همه", key: "total", fill: "#000000" },
          { name: "تایید شده", key: "confirmed", fill: "#00C49F" },
          { name: "رد شده", key: "rejected", fill: "#F44336" },
        ]}
      />
      <CardFooter className="border-zinc-100/50 z-10 gap-2 border-t-1 bg-black/70">
        <Tabs
          //
          selectedKey={period}
          onSelectionChange={setPeriod}
          color="secondary"
          radius="full"
          size="sm"
        >
          <Tab key="daily" title="روزانه" />
          <Tab key="weekly" title="هفتگی" />
          <Tab key="monthly" title="ماهانه" />
        </Tabs>
      </CardFooter>
      <div className="absolute right-0 top-0 z-20 hidden h-full w-full items-center justify-center bg-white/60 group-[.is-loading]:flex">
        <Spinner />
      </div>
    </Card>
  );
};

export const EstatesStatistics = () => {
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState<Key>("monthly");
  const [data, setData] = useState([]);

  const api = useAxiosAuth();
  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/dashboard/estates?period=${period}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      // setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [period]);

  return (
    <Card className={"group w-auto bg-white/80" + (loading ? " is-loading" : "")}>
      <CardHeader className="relative z-10 flex flex-col items-start gap-2">
        <h4 className="truncate text-base font-bold">آمار ملک ها</h4>
      </CardHeader>
      <LineChartMode
        data={data}
        items={[
          { name: "همه", key: "total", fill: "#000000" },
          { name: "تایید شده", key: "confirmed", fill: "#00C49F" },
          { name: "رد شده", key: "rejected", fill: "#F44336" },
        ]}
      />
      <CardFooter className="border-zinc-100/50 z-10 gap-2 border-t-1 bg-black/70">
        <Tabs
          //
          selectedKey={period}
          onSelectionChange={setPeriod}
          color="secondary"
          radius="full"
          size="sm"
        >
          <Tab key="daily" title="روزانه" />
          <Tab key="weekly" title="هفتگی" />
          <Tab key="monthly" title="ماهانه" />
        </Tabs>
      </CardFooter>
      <div className="absolute right-0 top-0 z-20 hidden h-full w-full items-center justify-center bg-white/60 group-[.is-loading]:flex">
        <Spinner />
      </div>
    </Card>
  );
};

const IconWrapper = ({ children, className }: any) => <div className={cn(className, "flex h-7 w-7 items-center justify-center rounded-small")}>{children}</div>;

const LineChartMode = ({ data, items }: { data: any[]; items: any[] }) => {
  return (
    <div dir="ltr" className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 0,
            bottom: 20,
          }}
        >
          <Brush dataKey="name" height={30} stroke="#8884d8" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip wrapperClassName="text-right text-sm" />
          {/* <Legend /> */}
          {items.map(({ key, name, fill }) => (
            <Line type="monotone" key={key} dataKey={key} name={name} stroke={fill} activeDot={{ r: 6 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

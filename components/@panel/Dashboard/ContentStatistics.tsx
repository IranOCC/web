import { Button, Card, CardFooter, Image, CardHeader, Tabs, Tab } from "@nextui-org/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, LineChart, Tooltip, ResponsiveContainer, Line, Legend } from "recharts";
import { Spinner } from "@nextui-org/react";
import { useState, Key, useEffect } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export const PostsStatistics = () => {
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState<Key>("daily");
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
        <Listbox
          aria-label="Detail"
          className="absolute end-3 max-w-[96px] gap-0 divide-y divide-default-300/50 overflow-hidden rounded-medium bg-black/70 p-0 text-white opacity-50 shadow-small transition-all hover:max-w-[180px] hover:opacity-100 dark:divide-default-100/80"
          itemClasses={{
            base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
          }}
        >
          <ListboxItem
            key="total"
            endContent={<b className="text-lg">25</b>}
            startContent={
              <IconWrapper className="bg-[#FFBB28]/10 text-[#FFBB28]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM7 6V10H11V6H7ZM7 12V14H17V12H7ZM7 16V18H17V16H7ZM13 7V9H17V7H13Z"></path>
                </svg>
              </IconWrapper>
            }
          >
            همه
          </ListboxItem>
          <ListboxItem
            key="confirmed"
            endContent={<b className="text-lg">10</b>}
            startContent={
              <IconWrapper className="bg-[#FF8042]/10 text-[#FF8042]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20C20.5523 2 21 2.44772 21 3V21C21 21.5523 20.5523 22 20 22ZM19 20V4H5V20H19ZM7 6H11V10H7V6ZM7 12H17V14H7V12ZM7 16H17V18H7V16ZM13 7H17V9H13V7Z"></path>
                </svg>
              </IconWrapper>
            }
          >
            تایید شده
          </ListboxItem>
        </Listbox>
      </CardHeader>
      <LineChartMode
        data={data}
        items={[
          { name: "همه", key: "total", fill: "#FFBB28" },
          { name: "تایید شده", key: "confirmed", fill: "#FF8042" },
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
  const [period, setPeriod] = useState<Key>("daily");
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
        {/* <Listbox
          aria-label="Detail"
          className="absolute end-3 max-w-[96px] gap-0 divide-y divide-default-300/50 overflow-hidden rounded-medium bg-black/70 p-0 text-white opacity-50 shadow-small transition-all hover:max-w-[180px] hover:opacity-100 dark:divide-default-100/80"
          itemClasses={{
            base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
          }}
        >
          <ListboxItem
            key="total"
            endContent={<b className="text-lg">25</b>}
            startContent={
              <IconWrapper className="bg-[#0088FE]/10 text-[#0088FE]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M21 19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H14C14.5523 3 15 3.44772 15 4V19H17V9H20C20.5523 9 21 9.44772 21 10V19ZM7 11V13H11V11H7ZM7 7V9H11V7H7Z"></path>
                </svg>
              </IconWrapper>
            }
          >
            همه
          </ListboxItem>
          <ListboxItem
            key="confirmed"
            endContent={<b className="text-lg">10</b>}
            startContent={
              <IconWrapper className="bg-[#00C49F]/10 text-[#00C49F]">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M21 19H23V21H1V19H3V4C3 3.44772 3.44772 3 4 3H14C14.5523 3 15 3.44772 15 4V19H19V11H17V9H20C20.5523 9 21 9.44772 21 10V19ZM5 5V19H13V5H5ZM7 11H11V13H7V11ZM7 7H11V9H7V7Z"></path>
                </svg>
              </IconWrapper>
            }
          >
            تایید شده
          </ListboxItem>
        </Listbox> */}
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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip wrapperClassName="text-right text-sm" />
          <Legend />
          {items.map(({ key, name, fill }) => (
            <Line type="monotone" key={key} dataKey={key} name={name} stroke={fill} activeDot={{ r: 6 }} />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

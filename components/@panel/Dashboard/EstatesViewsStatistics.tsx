import { Button, Card, CardFooter, Image, CardHeader, Tabs, Tab } from "@nextui-org/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, LineChart, Tooltip, ResponsiveContainer, Line, Legend } from "recharts";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { useState, Key } from "react";

export const EstatesViewsStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<Key>("daily");
  const [data, setData] = useState([
    {
      name: "1402/06/05",
      google: 22,
      total: 74,
    },
    {
      name: "1402/06/06",
      google: 33,
      total: 92,
    },
    {
      name: "1402/06/07",
      google: 31,
      total: 82,
    },
    {
      name: "1402/06/08",
      google: 27,
      total: 78,
    },
    {
      name: "1402/06/09",
      google: 24,
      total: 68,
    },
    {
      name: "1402/06/10",
      google: 21,
      total: 75,
    },
    {
      name: "1402/06/11",
      google: 33,
      total: 83,
    },
  ]);

  return (
    <Card className={"group w-auto bg-white/80" + (loading ? " is-loading" : "")}>
      <CardHeader className="relative z-10 flex flex-col items-start gap-2">
        <h4 className="truncate text-base font-bold">آمار بازدید ملک ها</h4>
        {/* <Listbox
          aria-label="Detail"
          className="absolute end-3 max-w-[96px] gap-0 divide-y divide-default-300/50 overflow-hidden rounded-medium bg-black/70 p-0 text-white opacity-50 shadow-small transition-all hover:max-w-[260px] hover:opacity-100 dark:divide-default-100/80"
          itemClasses={{
            base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
          }}
        >
          <ListboxItem
            key="online-users"
            endContent={<b className="text-lg">25</b>}
            startContent={
              <IconWrapper className="bg-success/10 text-success">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M13 14.0619V22H4C4 17.5817 7.58172 14 12 14C12.3387 14 12.6724 14.021 13 14.0619ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM17.7929 19.9142L21.3284 16.3787L22.7426 17.7929L17.7929 22.7426L14.2574 19.2071L15.6716 17.7929L17.7929 19.9142Z"></path>
                </svg>
              </IconWrapper>
            }
          >
            کاربران آنلاین
          </ListboxItem>
          <ListboxItem
            key="today-google"
            endContent={<b className="text-lg">10</b>}
            startContent={
              <IconWrapper className="bg-danger/10 text-danger">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M3.06364 7.50914C4.70909 4.24092 8.09084 2 12 2C14.6954 2 16.959 2.99095 18.6909 4.60455L15.8227 7.47274C14.7864 6.48185 13.4681 5.97727 12 5.97727C9.39542 5.97727 7.19084 7.73637 6.40455 10.1C6.2045 10.7 6.09086 11.3409 6.09086 12C6.09086 12.6591 6.2045 13.3 6.40455 13.9C7.19084 16.2636 9.39542 18.0227 12 18.0227C13.3454 18.0227 14.4909 17.6682 15.3864 17.0682C16.4454 16.3591 17.15 15.3 17.3818 14.05H12V10.1818H21.4181C21.5364 10.8363 21.6 11.5182 21.6 12.2273C21.6 15.2727 20.5091 17.8363 18.6181 19.5773C16.9636 21.1046 14.7 22 12 22C8.09084 22 4.70909 19.7591 3.06364 16.4909C2.38638 15.1409 2 13.6136 2 12C2 10.3864 2.38638 8.85911 3.06364 7.50914Z"></path>
                </svg>
              </IconWrapper>
            }
          >
            گوگل امروز
          </ListboxItem>
          <ListboxItem
            key="today-users"
            endContent={<b className="text-lg">17</b>}
            startContent={
              <IconWrapper className="bg-warning/10 text-warning">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM17.3628 15.2332C20.4482 16.0217 22.7679 18.7235 22.9836 22H20C20 19.3902 19.0002 17.0139 17.3628 15.2332ZM15.3401 12.9569C16.9728 11.4922 18 9.36607 18 7C18 5.58266 17.6314 4.25141 16.9849 3.09687C19.2753 3.55397 21 5.57465 21 8C21 10.7625 18.7625 13 16 13C15.7763 13 15.556 12.9853 15.3401 12.9569Z"></path>
                </svg>
              </IconWrapper>
            }
          >
            بازدیدکنندگان امروز
          </ListboxItem>
        </Listbox> */}
      </CardHeader>
      <LineChartMode
        data={data}
        items={[
          { name: "گوگل'", key: "google", fill: "rgb(243, 18, 96)" },
          { name: "همه", key: "total", fill: "rgb(245, 165, 36)" },
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

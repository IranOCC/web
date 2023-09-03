import { Button, Card, CardFooter, Image, CardHeader, Tabs, Tab } from "@nextui-org/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Select, SelectSection, SelectItem } from "@nextui-org/react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { cn } from "@nextui-org/react";

const data = [
  {
    name: "1402/06/05",
    ggl: 22,
    tot: 74,
  },
  {
    name: "1402/06/06",
    ggl: 33,
    tot: 92,
  },
  {
    name: "1402/06/07",
    ggl: 31,
    tot: 82,
  },
  {
    name: "1402/06/08",
    ggl: 27,
    tot: 78,
  },
  {
    name: "1402/06/09",
    ggl: 24,
    tot: 68,
  },
  {
    name: "1402/06/10",
    ggl: 21,
    tot: 75,
  },
  {
    name: "1402/06/11",
    ggl: 33,
    tot: 83,
  },
];

export const periodType = [
  { label: "روزانه", value: "daily" },
  { label: "هفتگی", value: "weekly" },
  { label: "ماهانه", value: "monthly" },
];

const IconWrapper = ({ children, className }: any) => <div className={cn(className, "flex h-7 w-7 items-center justify-center rounded-small")}>{children}</div>;

export const TodayUsers = () => {
  return (
    <Card isFooterBlurred className="h-96 w-full bg-black/80">
      <CardHeader className="absolute top-0 z-10 flex-col items-start gap-2">
        <h4 className="absolute flex justify-center gap-2 self-end text-xl font-medium text-white">
          <Tabs color="secondary" radius="full" size="sm">
            <Tab key="daily" title="روزانه" />
            <Tab key="weekly" title="هفتگی" />
            <Tab key="monthly" title="ماهانه" />
          </Tabs>
          {/*  */}
        </h4>
        <Listbox
          aria-label="User Menu"
          onAction={(key) => alert(key)}
          className="max-w-[96px] gap-0 divide-y divide-default-300/50 overflow-visible rounded-medium bg-content1 p-0 shadow-small transition-all hover:max-w-[200px] dark:divide-default-100/80"
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
            endContent={<b className="text-lg text-gray-800">17</b>}
            startContent={
              <IconWrapper className="bg-warning/10 text-warning">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M2 22C2 17.5817 5.58172 14 10 14C14.4183 14 18 17.5817 18 22H2ZM10 13C6.685 13 4 10.315 4 7C4 3.685 6.685 1 10 1C13.315 1 16 3.685 16 7C16 10.315 13.315 13 10 13ZM17.3628 15.2332C20.4482 16.0217 22.7679 18.7235 22.9836 22H20C20 19.3902 19.0002 17.0139 17.3628 15.2332ZM15.3401 12.9569C16.9728 11.4922 18 9.36607 18 7C18 5.58266 17.6314 4.25141 16.9849 3.09687C19.2753 3.55397 21 5.57465 21 8C21 10.7625 18.7625 13 16 13C15.7763 13 15.556 12.9853 15.3401 12.9569Z"></path>
                </svg>
              </IconWrapper>
            }
          >
            کاربران امروز
          </ListboxItem>
        </Listbox>
      </CardHeader>

      <div dir="ltr" className="h-full w-full p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="tot" name="کل کاربران" stackId="1" stroke="rgb(245, 165, 36)" fill="rgba(245, 165, 36, 0.1)" />
            <Area type="monotone" dataKey="ggl" name="ورودی گوگل" stackId="1" stroke="rgb(243, 18, 96)" fill="rgba(243, 18, 96, 0.1)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* <Image removeWrapper alt="Card example background" className="z-0 h-full w-full -translate-y-6 scale-125 object-cover" src="https://api.zl50.ir/storage/images/1693656164%205430.jpg" /> */}
      {/* 
      
      
      
      */}
      {/* <CardFooter className="border-zinc-100/50 bottom-0 z-10 justify-between border-t-1 bg-white/30">
        <Select
          //
          dir="rtl"
          items={periodType}
          labelPlacement="outside"
          size="sm"
          label="دوره زمانی"
          placeholder="نوع دوره زمانی را انتخاب کنید"
          className="max-w-xs"
        >
          {(period) => <SelectItem key={period.value}>{period.label}</SelectItem>}
        </Select>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          نمایش جدولی
        </Button>
      </CardFooter> */}
    </Card>
  );
};

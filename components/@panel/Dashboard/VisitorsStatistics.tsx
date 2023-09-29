import { Button, Card, CardFooter, Image, CardHeader, Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Chip } from "@nextui-org/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, LineChart, Tooltip, ResponsiveContainer, Line, Brush, BarChart, Legend, Bar, Sector, PieChart, Pie, Cell } from "recharts";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { cn } from "@nextui-org/react";
import { Spinner } from "@nextui-org/react";
import { useState, Key, useEffect, useMemo } from "react";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import moment from "jalali-moment";
import { usePrevious } from "@/hooks/usePrevious";

export const VisitorsStatistics = () => {
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<Key>("visitor");
  const [rangeDateType, setRangeDateType] = useState<any>(new Set(["yesterday"]));
  const [timeFrame, setTimeFrame] = useState<any>(new Set(["hourly"]));
  const [data, setData] = useState([]);

  const rangeValue = useMemo(() => {
    return Array.from(rangeDateType).join(", ");
  }, [rangeDateType]);

  const rangeValueTL = useMemo(() => {
    switch (rangeValue) {
      case "yesterday":
        return "دیروز";
      case "today":
        return "امروز";
      case "7daysAgo":
        return "7 روز اخیر";
      case "thisWeek":
        return "این هفته";
      case "lastWeek":
        return "هفته قبل";
      case "30daysAgo":
        return "30 روز اخیر";
      case "thisMonth":
        return "این ماه";
      case "lastMonth":
        return "ماه گذشته";
    }
    return null;
  }, [rangeValue]);

  const timeFrameValue = useMemo(() => {
    return Array.from(timeFrame).join(", ");
  }, [timeFrame]);

  const timeFrameValueTL = useMemo(() => {
    switch (timeFrameValue) {
      case "hourly":
        return "ساعتی";
      case "daily":
        return "روزانه";
      case "weekly":
        return "هفتگی";
      case "monthly":
        return "ماهانه";
      case "yearly":
        return "سالانه";
    }
    return null;
  }, [timeFrameValue]);

  const api = useAxiosAuth();
  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/dashboard/visitors/${report}?range=${rangeValue}&timeFrame=${timeFrameValue}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      // setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [report, rangeValue, timeFrameValue]);

  const prevReport = usePrevious(report);
  useEffect(() => {
    if (report !== "visitor" && prevReport === "visitor") {
      setData([]);
    }
  }, [report]);

  const [realtime, setRealtime] = useState<any>();
  const getRealTime = async () => {
    try {
      const response = await api.get(`/admin/dashboard/visitors/realtime`);
      setRealtime(response.data);
      setTimeout(getRealTime, 5000);
    } catch (error) {
      getRealTime();
    }
  };
  useEffect(() => {
    getRealTime();
  }, []);

  return (
    <Card className={"group w-auto bg-white/80" + (loading ? " is-loading" : "")}>
      <CardHeader className="relative z-10 flex flex-col items-start gap-2">
        <Listbox
          aria-label="filtering"
          className="absolute start-3 max-w-[44px] gap-0 divide-y divide-default-300/50 overflow-hidden rounded-medium bg-black/70 p-0 text-white opacity-50 shadow-small transition-all hover:max-w-[260px] hover:opacity-100 dark:divide-default-100/80"
          itemClasses={{
            base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-transparent data-[hover=true]:text-white",
          }}
        >
          <ListboxItem
            key="choose-date-range"
            endContent={
              <div className="flex items-center gap-1">
                <Chip color="secondary" variant="solid" className=" overflow-hidden whitespace-nowrap">
                  {rangeValueTL}
                </Chip>
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly radius="full" size="sm" variant="flat">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                        <path d="M21 18V21H19V18H17V16H23V18H21ZM5 18V21H3V18H1V16H7V18H5ZM11 6V3H13V6H15V8H9V6H11ZM11 10H13V21H11V10ZM3 14V3H5V14H3ZM19 14V3H21V14H19Z"></path>
                      </svg>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    //
                    aria-label="Choose date range"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={rangeDateType}
                    onSelectionChange={setRangeDateType}
                  >
                    <DropdownItem
                      //
                      key="yesterday"
                      description={moment().subtract(1, "jDay").locale("fa").format("DD MMM YYYY")}
                    >
                      دیروز
                    </DropdownItem>
                    <DropdownItem
                      //
                      showDivider
                      key="today"
                      description={moment().locale("fa").format("DD MMM YYYY")}
                    >
                      امروز
                    </DropdownItem>
                    <DropdownItem
                      //
                      key="7daysAgo"
                      description={`${moment().subtract(7, "jDay").locale("fa").format("DD MMM YYYY")} - ${moment().locale("fa").format("DD MMM YYYY")}`}
                    >
                      7 روز اخیر
                    </DropdownItem>
                    <DropdownItem
                      //
                      key="thisWeek"
                      description={`${moment().startOf("week").subtract(1, "jDay").locale("fa").format("DD MMM YYYY")} - ${moment().endOf("week").subtract(1, "jDay").locale("fa").format("DD MMM YYYY")}`}
                    >
                      این هفته
                    </DropdownItem>
                    <DropdownItem
                      //
                      showDivider
                      key="lastWeek"
                      description={`${moment().subtract(1, "week").startOf("week").subtract(1, "jDay").locale("fa").format("DD MMM YYYY")} - ${moment().subtract(1, "week").endOf("week").subtract(1, "jDay").locale("fa").format("DD MMM YYYY")}`}
                    >
                      هفته قبل
                    </DropdownItem>
                    <DropdownItem
                      //
                      key="30daysAgo"
                      description={`${moment().subtract(30, "jDay").locale("fa").format("DD MMM YYYY")} - ${moment().locale("fa").format("DD MMM YYYY")}`}
                    >
                      30 روز اخیر
                    </DropdownItem>
                    <DropdownItem
                      //
                      key="thisMonth"
                      description={`${moment().startOf("jMonth").locale("fa").format("MMM YYYY")}`}
                    >
                      این ماه
                    </DropdownItem>
                    <DropdownItem
                      //
                      key="lastMonth"
                      description={`${moment().subtract(1, "jMonth").startOf("jMonth").locale("fa").format("MMM YYYY")}`}
                    >
                      ماه گذشته
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            }
            startContent={
              <IconWrapper className="bg-danger/10 text-danger">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M17 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H7V1H9V3H15V1H17V3ZM4 9V19H20V9H4ZM6 11H8V13H6V11ZM11 11H13V13H11V11ZM16 11H18V13H16V11Z"></path>
                </svg>
              </IconWrapper>
            }
          >
            بازه زمانی
          </ListboxItem>

          <ListboxItem
            key="choose-date-range"
            endContent={
              <div className="flex items-center gap-1">
                <Chip color="secondary" variant="solid" className=" overflow-hidden whitespace-nowrap">
                  {timeFrameValueTL}
                </Chip>
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly radius="full" size="sm" variant="flat">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                        <path d="M21 18V21H19V18H17V16H23V18H21ZM5 18V21H3V18H1V16H7V18H5ZM11 6V3H13V6H15V8H9V6H11ZM11 10H13V21H11V10ZM3 14V3H5V14H3ZM19 14V3H21V14H19Z"></path>
                      </svg>
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    //
                    aria-label="Choose Time Frame"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={timeFrame}
                    onSelectionChange={setTimeFrame}
                  >
                    <DropdownItem key="hourly">یک ساعته</DropdownItem>
                    <DropdownItem key="daily">روزانه</DropdownItem>
                    <DropdownItem key="weekly">هفتگی</DropdownItem>
                    <DropdownItem key="monthly">ماهانه</DropdownItem>
                    <DropdownItem key="yearly">سالانه</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            }
            startContent={
              <IconWrapper className="bg-warning/10 text-warning">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path>
                </svg>
              </IconWrapper>
            }
          >
            تایم فریم
          </ListboxItem>

          <ListboxItem
            key="choose-date-range"
            endContent={
              <div className="flex items-center gap-1">
                <Chip color="secondary" variant="solid" className=" overflow-hidden whitespace-nowrap">
                  {realtime?.onlineUsers || 0}
                </Chip>
              </div>
            }
            startContent={
              <IconWrapper className="bg-success/10 text-success">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                  <path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM19.4184 17H23.0042V19H19.4184L21.2469 20.8284L19.8326 22.2426L15.59 18L19.8326 13.7574L21.2469 15.1716L19.4184 17Z"></path>
                </svg>
              </IconWrapper>
            }
          >
            کاربران آنلاین
          </ListboxItem>
        </Listbox>
      </CardHeader>
      {report === "visitor" && <AreaChartMode data={data} items={[{ name: "کاربران", key: "count", fill: "rgb(251, 169, 197)", stroke: "rgb(243, 18, 96)" }]} />}
      {report !== "visitor" && <PieChartMode data={data} />}

      <CardFooter className="border-zinc-100/50 z-10 gap-2 border-t-1 bg-black/70">
        <Tabs
          //
          selectedKey={report}
          onSelectionChange={setReport}
          color="secondary"
          radius="full"
          size="sm"
          fullWidth
        >
          <Tab key="visitor" title="بازدیدکنندگان" />
          <Tab key="browser" title="مرورگر" />
          <Tab key="platform" title="نوع پلتفورم" />
          <Tab key="language" title="زبان دستگاه" />
          <Tab key="brand" title="برند دستگاه" />
          <Tab key="model" title="مدل دستگاه" />
          <Tab key="mobileModel" title="مدل موبایل" />
          <Tab key="os" title="سیستم عامل" />
          <Tab key="resolution" title="رزولیشن" />
          <Tab key="country" title="کشور" />
          <Tab key="city" title="شهر" />
          <Tab key="source" title="منابع ورودی" />
        </Tabs>
      </CardFooter>
      <div className="absolute right-0 top-0 z-20 hidden h-full w-full items-center justify-center bg-white/60 group-[.is-loading]:flex">
        <Spinner />
      </div>
    </Card>
  );
};

const IconWrapper = ({ children, className }: any) => <div className={cn(className, "flex h-7 w-7 items-center justify-center rounded-small")}>{children}</div>;

const AreaChartMode = ({ data, items }: { data: any[]; items: any[] }) => {
  return (
    <div dir="ltr" className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
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
          {items.map(({ key, name, fill, stroke }) => (
            <Area type="linear" key={key} dataKey={key} name={name} fill={fill} stroke={stroke} activeDot={{ r: 6 }} />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

const PieChartMode = ({ data }: { data: any[] }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderActiveShape = (props: any) => {
    const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value, name } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 15) * cos;
    const my = cy + (outerRadius + 20) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius} startAngle={startAngle} endAngle={endAngle} fill={fill} />
        <Sector cx={cx} cy={cy} startAngle={startAngle} endAngle={endAngle} innerRadius={outerRadius + 6} outerRadius={outerRadius + 10} fill={fill} />
        <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`تعداد: ${value}`}</text>
        <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
          {`%${(percent * 100).toFixed(2)}`}
        </text>
      </g>
    );
  };

  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].count;
  }

  useEffect(() => {
    setActiveIndex(0);
  }, [data]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="grid h-full overflow-y-hidden">
        <div dir="ltr" className="relative flex flex-col items-center justify-center">
          <ResponsiveContainer width={400} height={400}>
            <PieChart width={400} height={400}>
              <Pie
                //
                data={data}
                cx="50%"
                cy="50%"
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={(_, index) => {
                  setActiveIndex(index);
                }}
                outerRadius={70}
                innerRadius={50}
                fill="#8884d8"
                dataKey="count"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={stringToColor(entry.name)} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div dir="ltr" className="flex">
        <Table
          classNames={{
            base: "min-h-[400px] max-h-[400px] justify-center",
            wrapper: "bg-transparent pt-0",
            th: "text-center",
            td: "text-center",
          }}
          shadow="none"
          hideHeader
        >
          <TableHeader>
            <TableColumn>درصد</TableColumn>
            <TableColumn>تعداد</TableColumn>
            <TableColumn>عنوان</TableColumn>
          </TableHeader>
          <TableBody>
            {data.map((v, idx) => (
              <TableRow key={idx} onMouseEnter={(_) => setActiveIndex(idx)} style={{ borderRight: "8px solid transparent", color: stringToColor(v.name), borderColor: activeIndex == idx ? stringToColor(v.name) : "transparent" }}>
                <TableCell>%{((v.count / sum) * 100).toFixed(0)}</TableCell>
                <TableCell>{v.count}</TableCell>
                <TableCell className="font-bold">{v.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const stringToColor = (str: string) => {
  let hash = 0;
  str.split("").forEach((char) => {
    hash = char.charCodeAt(0) + ((hash << 5) - hash);
  });
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, "0");
  }
  return color;
};

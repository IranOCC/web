import { Button, Card, CardFooter, Image, CardHeader, Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Bar, LineChart, Cell, Sector, PieChart, Pie, Tooltip, BarChart, ResponsiveContainer, Line, Legend } from "recharts";
import { Spinner } from "@nextui-org/react";
import { Key, useEffect, useState } from "react";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export const OfficesPostsStatistics = () => {
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState<Key>("countseries");

  return (
    <Card className={"group w-auto bg-white/80" + (loading ? " is-loading" : "")}>
      <CardHeader className="relative z-10 flex flex-col items-center justify-start gap-2 sm:flex-row">
        <h4 className="truncate text-base font-bold">آمار پست های شعبات</h4>
        <Tabs
          //
          selectedKey={type}
          onSelectionChange={setType}
          color="secondary"
          radius="full"
          size="sm"
        >
          <Tab key="timeseries" title="زمانی" />
          <Tab key="countseries" title="عددی" />
        </Tabs>
      </CardHeader>
      {type === "timeseries" && (
        <TimeSeriesType
          setLoading={setLoading}
          items={[
            { name: "دفتر یک", key: "1", fill: "#0088FE" },
            { name: "دفتر دو", key: "2", fill: "#00C49F" },
            { name: "دفتر سه", key: "3", fill: "#FFBB28" },
            { name: "دفتر چهار", key: "4", fill: "#FFBB28" },
          ]}
        />
      )}
      {type === "countseries" && (
        <CountSeriesType
          setLoading={setLoading}
          endpoint="officePosts"
          items={[
            { name: "همه", key: "total", fill: "#000000" },
            { name: "تایید شده", key: "confirmed", fill: "#00C49F" },
            { name: "رد شده", key: "rejected", fill: "#F44336" },
          ]}
        />
      )}
      <div className="absolute right-0 top-0 z-20 hidden h-full w-full items-center justify-center bg-white/60 group-[.is-loading]:flex">
        <Spinner />
      </div>
    </Card>
  );
};

export const OfficesEstatesStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState<Key>("countseries");

  return (
    <Card className={"group w-auto bg-white/80" + (loading ? " is-loading" : "")}>
      <CardHeader className="relative z-10 flex flex-col items-center justify-start gap-2 sm:flex-row">
        <h4 className="truncate text-base font-bold">آمار ملک های شعبات</h4>
        <Tabs
          //
          selectedKey={type}
          onSelectionChange={setType}
          color="secondary"
          radius="full"
          size="sm"
        >
          <Tab key="timeseries" title="زمانی" />
          <Tab key="countseries" title="عددی" />
        </Tabs>
      </CardHeader>
      {type === "timeseries" && (
        <TimeSeriesType
          setLoading={setLoading}
          items={[
            { name: "دفتر یک", key: "1", fill: "#0088FE" },
            { name: "دفتر دو", key: "2", fill: "#00C49F" },
            { name: "دفتر سه", key: "3", fill: "#FFBB28" },
            { name: "دفتر چهار", key: "4", fill: "#FFBB28" },
          ]}
        />
      )}
      {type === "countseries" && (
        <CountSeriesType
          setLoading={setLoading}
          endpoint="officeEstates"
          items={[
            { name: "همه", key: "total", fill: "#000000" },
            { name: "تایید شده", key: "confirmed", fill: "#00C49F" },
            { name: "رد شده", key: "rejected", fill: "#F44336" },
          ]}
        />
      )}
      <div className="absolute right-0 top-0 z-20 hidden h-full w-full items-center justify-center bg-white/60 group-[.is-loading]:flex">
        <Spinner />
      </div>
    </Card>
  );
};

// =============

const TimeSeriesType = ({ setLoading, items }: { setLoading: (b: boolean) => void; items: any[] }) => {
  const [period, setPeriod] = useState<Key>("daily");
  // const [data, setData] = useState([
  //   {
  //     name: "1402/06/05",
  //     "1": 32,
  //     "2": 74,
  //     "3": 14,
  //     "4": 44,
  //   },
  //   {
  //     name: "1402/06/06",
  //     "1": 22,
  //     "2": 51,
  //     "3": 11,
  //     "4": 27,
  //   },
  //   {
  //     name: "1402/06/07",
  //     "1": 42,
  //     "2": 36,
  //     "3": 22,
  //     "4": 46,
  //   },
  //   {
  //     name: "1402/06/08",
  //     "1": 32,
  //     "2": 16,
  //     "3": 27,
  //     "4": 16,
  //   },
  //   {
  //     name: "1402/06/09",
  //     "1": 42,
  //     "2": 36,
  //     "3": 22,
  //     "4": 46,
  //   },
  //   {
  //     name: "1402/06/10",
  //     "1": 32,
  //     "2": 16,
  //     "3": 27,
  //     "4": 16,
  //   },
  //   {
  //     name: "1402/06/11",
  //     "1": 42,
  //     "2": 46,
  //     "3": 24,
  //     "4": 26,
  //   },
  // ]);
  const [data, setData] = useState([]);

  const api = useAxiosAuth();
  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/dashboard/officeEstates?type=time&period=${period}`);
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
    <>
      <LineChartMode data={data} items={items} />
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
    </>
  );
};

const CountSeriesType = ({ setLoading, items, endpoint }: { setLoading: (b: boolean) => void; items: any[]; endpoint: string }) => {
  const [mode, setMode] = useState<Key>("barchart");
  const [data, setData] = useState([]);

  const api = useAxiosAuth();
  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/dashboard/${endpoint}?type=count&mode=${mode}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      // setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [mode]);

  return (
    <>
      {mode === "barchart" && <BarChartMode data={data} items={items} />}
      {mode === "piechart" && <PieChartMode data={data} items={items} />}
      {mode === "table" && <TableMode data={data} items={items} />}
      <CardFooter className="border-zinc-100/50 z-10 gap-2 border-t-1 bg-black/70">
        <Tabs
          //
          selectedKey={mode}
          onSelectionChange={setMode}
          color="secondary"
          radius="full"
          size="sm"
        >
          <Tab key="barchart" title="نمودار میله ای" />
          <Tab key="piechart" title="نمودار دایره ای" />
          <Tab key="table" title="جدولی" />
        </Tabs>
      </CardFooter>
    </>
  );
};

// =============

const BarChartMode = ({ data, items }: { data: any[]; items: any[] }) => {
  return (
    <div dir="ltr" className="w-full">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
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
            <Bar key={key} dataKey={key} name={name} fill={fill} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const PieChartMode = ({ data, items }: { data: any[]; items: any[] }) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
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

  return (
    <div dir="ltr" className="grid h-full w-full grid-cols-1 lg:grid-cols-2">
      {items.map(({ key, name, fill }) => (
        <div key={key} className="relative flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={400}>
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
                dataKey={key}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <span className={`absolute top-80 bg-gray-100 px-4 py-2`}>{name}</span>
        </div>
      ))}
    </div>
  );
};

const TableMode = ({ data, items }: { data: any[]; items: any[] }) => {
  return (
    <div dir="ltr" className="w-full">
      <Table
        classNames={{
          base: "min-h-[400px] max-h-[400px]",
          wrapper: "bg-transparent pt-0",
          th: "text-center",
          td: "text-center",
        }}
        shadow="none"
      >
        <TableHeader>
          {[{ key: "name", name: "نام شعبه" }, ...items].reverse().map(({ key, name }) => (
            <TableColumn key={key}>{name}</TableColumn>
          ))}
        </TableHeader>
        <TableBody className="">
          {data.map((v, idx) => (
            <TableRow key={idx}>
              {[{ key: "name", name: "نام شعبه" }, ...items].reverse().map(({ key }) => (
                <TableCell key={key}>{v[key]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

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

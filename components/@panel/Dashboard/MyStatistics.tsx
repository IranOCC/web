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

export const MyStatistics = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const api = useAxiosAuth();
  const getData = async () => {
    // setLoading(true);
    // try {
    //   const response = await api.get(`/admin/dashboard/visitors/${report}?range=${rangeValue}`);
    //   setData(response.data);
    //   setLoading(false);
    // } catch (error) {
    //   // setLoading(false);
    // }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={"relative grid grid-cols-2 gap-4 md:grid-cols-4" + (loading ? " is-loading" : "")}>
      <Card shadow="none" isFooterBlurred isPressable isHoverable className={"group w-auto bg-white/80"}>
        <CardHeader className="relative z-10 flex flex-col items-start gap-2"></CardHeader>
        <CardBody>
          <span className="text-4xl font-bold text-gray-700 lg:text-5xl">500</span>
        </CardBody>
        <CardFooter className="z-10 gap-2 bg-secondary">املاک من</CardFooter>
      </Card>
      <Card shadow="none" isFooterBlurred isPressable isHoverable className={"group w-auto bg-white/80"}>
        <CardHeader className="relative z-10 flex flex-col items-start gap-2"></CardHeader>
        <CardBody>
          <span className="text-4xl font-bold text-gray-700 lg:text-5xl">500</span>
        </CardBody>
        <CardFooter className="z-10 gap-2 bg-success">املاک تایید شده</CardFooter>
      </Card>
      <Card shadow="none" isFooterBlurred isPressable isHoverable className={"group w-auto bg-white/80"}>
        <CardHeader className="relative z-10 flex flex-col items-start gap-2"></CardHeader>
        <CardBody>
          <span className="text-4xl font-bold text-gray-700 lg:text-5xl">500</span>
        </CardBody>
        <CardFooter className="z-10 gap-2 bg-danger">املاک رد شده</CardFooter>
      </Card>
      <Card shadow="none" isFooterBlurred isPressable isHoverable className={"group w-auto bg-white/80"}>
        <CardHeader className="relative z-10 flex flex-col items-start gap-2"></CardHeader>
        <CardBody>
          <span className="text-4xl font-bold text-gray-700 lg:text-5xl">500</span>
        </CardBody>
        <CardFooter className="z-10 gap-2 bg-warning">املاک در انتظار</CardFooter>
      </Card>
      <div className="absolute right-0 top-0 z-20 hidden h-full w-full items-center justify-center bg-white/60 group-[.is-loading]:flex">
        <Spinner />
      </div>
    </div>
  );
};

"use client";

import { OfficesPostsStatistics, OfficesEstatesStatistics } from "@/components/@panel/Dashboard/OfficesStatistics";
import { PostsStatistics,EstatesStatistics } from "@/components/@panel/Dashboard/ContentStatistics";
import { SessionsStatistics } from "@/components/@panel/Dashboard/SessionsStatistics";
import { Alert } from "@mui/material";

export default function Page({ searchParams }: any) {
  const { warning, error, info } = searchParams;
  return (
    <>
      <div className="p-4 pt-0">
        <div className="pb-4 empty:hidden">
          {!!error && <Alert severity="error">{error}</Alert>}
          {!!warning && <Alert severity="warning">{warning}</Alert>}
          {!!info && <Alert severity="info">{info}</Alert>}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12">
          <div className="col-span-full">
            <SessionsStatistics />
          </div>
          <div className="col-span-full lg:col-span-6">
            <PostsStatistics />
          </div>
          <div className="col-span-full lg:col-span-6">
            <EstatesStatistics />
          </div>
          <div className="col-span-full lg:col-span-6">
            <OfficesPostsStatistics />
          </div>
          <div className="col-span-full lg:col-span-6">
            <OfficesEstatesStatistics />
          </div>
        </div>
      </div>
    </>
  );
}

//           <div className="rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg sm:col-span-2 lg:col-span-4">
//             درخواست های بازدید امروز
//             {/*  */}
//           </div>
//           <div className="rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg sm:col-span-2 lg:col-span-4">
//             درخواست های بازدید دیروز
//             {/*  */}
//           </div>
//           <div className="rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg sm:col-span-2 lg:col-span-4">
//             درخواست های بازدید ماه
//             {/*  */}
//           </div>
//           <div className="order-2 rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg lg:col-span-3">
//             تعداد کاربر فعال
//             {/*  */}
//           </div>
//           <div className="order-3 rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg lg:col-span-3">
//             تعداد املاک ثبت شده
//             {/*  */}
//           </div>
//           <div className="order-4 rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg lg:col-span-3">
//             تعداد پست های ثبت شده
//             {/*  */}
//           </div>
//           {/* ==== */}
//           <div className="order-5 rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg sm:col-span-2 lg:col-span-6">
//             تعداد ملک در انتظار تایید
//             {/*  */}
//           </div>
//           <div className="order-6 rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg sm:col-span-2 lg:col-span-6">
//             تعداد ملک تایید شده
//             {/*  */}
//           </div>
//           {/* ==== */}
//           <div className="order-7 rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg lg:col-span-3">
//             ایجنت های برتر
//             {/*  */}
//           </div>
//           <div className="order-9 rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg sm:col-span-2 lg:order-8 lg:col-span-6">
//             شعبات برتر
//             {/*  */}
//           </div>
//           <div className="order-8 rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg lg:order-9 lg:col-span-3">
//             نویسنده های برتر
//             {/*  */}
//           </div>
//           {/* ==== */}
//           <div className="order-10 rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg sm:col-span-2 lg:col-span-4">
//             ملک های پر بازدید
//             {/*  */}
//           </div>
//           <div className="order-11 rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg sm:col-span-2 lg:col-span-4">
//             پست های پر بازدید
//             {/*  */}
//           </div>
//           <div className="order-12 rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg sm:col-span-2 lg:col-span-4">
//             آخرین نظرات
//             {/*  */}
//           </div>

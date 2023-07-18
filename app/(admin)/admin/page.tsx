"use client";

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
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 lg:col-span-3">
            کاربران امروز
            {/*  */}
          </div>
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 lg:col-span-3">
            کاربران دیروز
            {/*  */}
          </div>
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 lg:col-span-3">
            کاربران ماهانه
            {/*  */}
          </div>
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 lg:col-span-3">
            کاربران آنلاین
            {/*  */}
          </div>

          {/* ==== */}
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 sm:col-span-2 lg:col-span-4">
            درخواست های بازدید امروز
            {/*  */}
          </div>
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 sm:col-span-2 lg:col-span-4">
            درخواست های بازدید دیروز
            {/*  */}
          </div>
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 sm:col-span-2 lg:col-span-4">
            درخواست های بازدید ماه
            {/*  */}
          </div>

          {/* ==== */}
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 order-1 lg:col-span-3">
            تعداد شعبات فعال
            {/*  */}
          </div>
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 order-2 lg:col-span-3">
            تعداد کاربر فعال
            {/*  */}
          </div>
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 order-3 lg:col-span-3">
            تعداد املاک ثبت شده
            {/*  */}
          </div>
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 order-4 lg:col-span-3">
            تعداد پست های ثبت شده
            {/*  */}
          </div>
          {/* ==== */}
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 order-5 sm:col-span-2 lg:col-span-6">
            تعداد ملک در انتظار تایید
            {/*  */}
          </div>
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 order-6 sm:col-span-2 lg:col-span-6">
            تعداد ملک تایید شده
            {/*  */}
          </div>
          {/* ==== */}
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 order-7 lg:col-span-3">
            ایجنت های برتر
            {/*  */}
          </div>
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 order-9 lg:order-8 sm:col-span-2 lg:col-span-6">
            شعبات برتر
            {/*  */}
          </div>
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 order-8 lg:order-9 lg:col-span-3">
            نویسنده های برتر
            {/*  */}
          </div>
          {/* ==== */}
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 order-10 sm:col-span-2 lg:col-span-4">
            ملک های پر بازدید
            {/*  */}
          </div>
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 order-11 sm:col-span-2 lg:col-span-4">
            پست های پر بازدید
            {/*  */}
          </div>
          <div className="bg-white shadow-md transition-shadow hover:shadow-lg rounded-lg p-4 order-12 sm:col-span-2 lg:col-span-4">
            آخرین نظرات
            {/*  */}
          </div>
        </div>
      </div>
    </>
  );
}

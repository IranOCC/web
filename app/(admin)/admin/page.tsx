"use client";

import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import { useContext, useEffect } from "react";

export default function Page() {
  const { user } = useContext(CurrentUserContext) as CurrentUserContextType;

  return (
    <>
      <div className="p-4">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-12">
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

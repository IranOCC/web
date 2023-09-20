"use client";

import { OfficesPostsStatistics, OfficesEstatesStatistics } from "@/components/@panel/Dashboard/OfficesStatistics";
import { PostsStatistics, EstatesStatistics } from "@/components/@panel/Dashboard/ContentStatistics";
import { VisitorsStatistics } from "@/components/@panel/Dashboard/VisitorsStatistics";
import { Alert } from "@mui/material";
import { UsersPostsStatistics, UsersEstatesStatistics } from "@/components/@panel/Dashboard/UsersStatistics";
import { MyStatistics } from "@/components/@panel/Dashboard/MyStatistics";

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
            <MyStatistics />
          </div>
          <div className="col-span-full">
            <VisitorsStatistics />
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
          <div className="col-span-full lg:col-span-6">
            <UsersPostsStatistics />
          </div>
          <div className="col-span-full lg:col-span-6">
            <UsersEstatesStatistics />
          </div>
          {/* 
          <div className="col-span-full lg:col-span-6">
            <PostsViewsStatistics />
          </div>
          <div className="col-span-full lg:col-span-6">
            <EstatesViewsStatistics />
          </div>
           */}
        </div>
      </div>
    </>
  );
}

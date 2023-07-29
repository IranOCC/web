"use client";

import React, { useState, ReactNode, useEffect } from "react";
import { Empty, Pagination, Popconfirm, Spin } from "antd";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { StorageFile } from "@/types/interfaces";
import { Add } from "@mui/icons-material";

export type GridListProps = {
  data?: any[];
  endpoint?: string;
  loading?: boolean;
  selectable?: boolean;
  deletable?: boolean;
  editable?: boolean;
  update?: any;
  defaultPageCount?: number;
  ItemComponent: (value: any) => JSX.Element;
};

function GridList<T>({ defaultPageCount, ItemComponent, deletable, editable, endpoint, data, loading = false, selectable = true, update = false }: GridListProps) {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [dataSource, setDataSource] = useState(data?.length !== undefined ? data : []);

  // ##############################################
  // ====> get data
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const _search = searchParams?.get("search");
  const _sort = searchParams?.get("sort");
  const _page = parseInt(searchParams?.get("page") || "1");
  const _count = parseInt(searchParams?.get("count") || defaultPageCount?.toString() || "12");

  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const handlePaginationChange = (page: number, page_size: number) => {
    const $s = new URLSearchParams(searchParams?.toString());
    $s?.set("page", page.toString());
    $s?.set("count", page_size.toString());
    router.push(pathname + "?" + $s.toString());
  };
  //
  const api = useAxiosAuth();
  const getData = async () => {
    setFetchLoading(true);
    const _params = {
      current: _page,
      size: _count,
      search: _search,
      // order_by: "created_at",
    };
    try {
      const response = await api.get(`/admin/${endpoint}`, { params: _params });
      setDataSource(response.data.items);
      setTotalItemsCount(response.data.total);
      setFetchLoading(false);
    } catch (error) {
      setFetchLoading(false);
    }
  };

  const deleteRow = async (id: string) => {
    try {
      await api.delete(`/admin/${endpoint}/${id}`);
      toast.success("با موفقیت حذف گردید");
      await getData();
    } catch (error) {}
  };

  useEffect(() => {
    // get table data
    if (endpoint) getData();
    // setFirstTry(false);
  }, [_page, _count, _search, _sort, update]);

  return (
    <>
      <div className="relative">
        {!dataSource.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        {!!dataSource?.length && (
          <>
            <div className="grid grid-cols-2 gap-4 py-2 md:grid-cols-3 lg:grid-cols-3">
              {/*  */}
              {dataSource.map((value: StorageFile, index) => {
                return (
                  <div key={value._id} tabIndex={index} className="relative aspect-square overflow-hidden ring-blue-600 ring-opacity-60 ring-offset-1 ring-offset-blue-400 focus:outline-none focus:ring-1" role="banner">
                    <ItemComponent value={value} />
                  </div>
                );
              })}
            </div>
            <div className="mt-2 flex flex-col items-center">
              <Pagination
                //
                {...{
                  // showSizeChanger: true,
                  total: totalItemsCount,
                  position: ["bottomCenter"],
                  onChange: handlePaginationChange,
                  pageSize: _count,
                  current: _page,
                  defaultPageSize: defaultPageCount || 12,
                  defaultCurrent: 1,
                  pageSizeOptions: ["12", "24", "36", "128", "256", "512"],
                }}
              />
            </div>
          </>
        )}
        {(loading || fetchLoading) && (
          <div className="absolute left-0 top-0 h-full w-full">
            <div className="flex h-full items-center justify-center bg-white/20">{<Spin />}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default GridList;

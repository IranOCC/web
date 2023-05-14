"use client";

import React, { useState, ReactNode, useEffect } from "react";
import { Empty, Pagination, Popconfirm, Spin } from "antd";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { StorageFile } from "@/types/interfaces";
import Image from "next/image";

type GridListPaginationPosition = "topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight";

export type GridListProps = {
  headerTitle?: () => ReactNode;
  footerTitle?: () => ReactNode;
  data?: any[];
  endpoint?: string;
  loading?: boolean;
  selectable?: boolean;
  sortable?: boolean;
  minWidth?: string | number;
  expandable?: boolean;
  detail?: ReactNode;
  deletable?: boolean;
  editable?: boolean;
  extraOperations?: (id: string) => any[];
  update?: any;
  defaultPageCount?: number;
};

function GridList<T>({ headerTitle, extraOperations = (id) => [], defaultPageCount, deletable, editable, footerTitle, endpoint, data, loading = false, selectable = true, sortable = false, minWidth, expandable = false, detail, update = false }: GridListProps) {
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
  const _count = parseInt(searchParams?.get("count") || defaultPageCount?.toString() || "10");

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
      page: _page,
      page_size: _count,
      search: _search,
      order_by: "created_at",
    };
    try {
      const response = await api.get(`/${endpoint}`, { params: _params });
      setDataSource(response.data);
      setFetchLoading(false);
    } catch (error) {
      setFetchLoading(false);
    }
  };

  const deleteRow = async (id: string) => {
    try {
      await api.delete(`/${endpoint}/${id}`);
      toast.success("با موفقیت حذف گردید");
      await getData();
    } catch (error) {}
  };

  useEffect(() => {
    // get table data
    if (endpoint) getData();
    // setFirstTry(false);
  }, [_page, _count, _search, _sort, update]);

  // ##############################################
  // ====> row Selection
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: any) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  const selectedCount = selectedRowKeys.length;
  const hasSelected = selectedCount > 0;

  // ##############################################

  const baseRoute = (params?.id ? pathname?.replace(params.id as string, "") : pathname) || "/";

  return (
    <>
      <div className="relative">
        {!dataSource.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        {!!dataSource?.length && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-2">
              {/*  */}
              {dataSource.map((value: StorageFile, index) => {
                return (
                  <div className="bg-red-500 aspect-square">
                    <Image
                      //
                      fill
                      src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + value.path}
                      alt={value.alt}
                      title={value.title}
                    />
                    {process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + value.path}
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col items-center mt-2">
              <Pagination
                //
                {...{
                  // showSizeChanger: true,
                  total: totalItemsCount,
                  position: ["bottomCenter"],
                  onChange: handlePaginationChange,
                  pageSize: _count,
                  current: _page,
                  defaultPageSize: defaultPageCount || 10,
                  defaultCurrent: 1,
                  pageSizeOptions: ["10", "25", "50", "100", "250", "500"],
                }}
              />
            </div>
          </>
        )}
        {(loading || fetchLoading) && (
          <div className="w-full h-full absolute top-0 left-0">
            <div className="flex justify-center items-center h-full bg-white/20">{<Spin />}</div>
          </div>
        )}
      </div>
    </>
  );
}

export default GridList;

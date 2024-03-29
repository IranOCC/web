"use client";

import React, { useState, ReactNode, useEffect, useRef } from "react";
import { Dropdown, Empty, Popconfirm, RadioChangeEvent } from "antd";
import { Form, Radio, Space, Switch, Table } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { ExpandableConfig, FilterValue, SorterResult, TablePaginationConfig, TableRowSelection } from "antd/es/table/interface";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { IconButton } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { toast } from "@/lib/toast";
import Link from "next/link";
import { Button } from "@/components/Button";
import SearchIcon from "@/components/Icons/Search";
import { Timeout } from "react-number-format/types/types";

export type PanelTableProps = {
  headerTitle?: ReactNode;
  footerTitle?: () => ReactNode;
  data?: any[];
  endpoint?: string;
  columns: ColumnsType<any>;
  loading?: boolean;
  selectable?: boolean;
  sortable?: boolean;
  minWidth?: string | number;
  expandable?: boolean;
  detail?: ReactNode;
  deletable?: boolean;
  editable?: boolean;
  extraOperations?: (id?: string, record?: any) => any[];
  update?: any;
  defaultPageCount?: number;

  tableToolsList?: any[];
};

function PanelTable<T>({ headerTitle, tableToolsList, extraOperations = (id, record) => [], defaultPageCount, deletable, editable, footerTitle, endpoint, data, columns, loading = false, selectable = true, sortable = false, minWidth, expandable = false, detail, update = false }: PanelTableProps) {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [dataSource, setDataSource] = useState(data?.length !== undefined ? data : []);

  const tableColumns = columns.map((item) => ({ ...item, ellipsis: false }));

  const scroll: { x?: number | string; y?: number | string } = {};
  scroll.y = "calc(100vh - 300px)";

  // fixed column
  // scroll.x = minWidth;
  // tableColumns[0].fixed = true;
  // tableColumns[tableColumns.length - 1].fixed = "right";

  // ##############################################
  // ====> get data
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const _search = searchParams?.get("search");
  const _sort = searchParams?.get("sort");
  const _page = parseInt(searchParams?.get("page") || "1");
  const _count = parseInt(searchParams?.get("count") || defaultPageCount?.toString() || "25");

  const [totalItemsCount, setTotalItemsCount] = useState(0);

  const handleTableChange = (pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>) => {
    const $s = new URLSearchParams(searchParams?.toString());
    if (pagination?.current !== undefined) $s?.set("page", pagination?.current?.toString());
    if (pagination?.pageSize !== undefined) $s?.set("count", pagination?.pageSize?.toString());
    const fkeys = Object.keys(filters);
    for (let i = 0; i < Object.keys(filters).length; i++) {
      const m = filters[fkeys[i]];
      $s.delete(`filter[${fkeys[i]}]`);
      if (m !== null) {
        for (let j = 0; j < m?.length; j++) {
          $s.append(`filter[${fkeys[i]}]`, m[j].toString());
        }
      }
    }
    router.push(pathname + "?" + $s.toString());
  };

  //
  const api = useAxiosAuth();
  const getData = async () => {
    setFetchLoading(true);
    let _filter: any = {};
    searchParams?.forEach((value, key) => {
      if (key.startsWith("filter[")) {
        if (!!_filter[key]) _filter[key].push(value);
        else _filter[key] = [value];
      }
    });
    const _params = {
      current: _page,
      size: _count,
      search: _search,
      ..._filter,
      // sort: "created_at",
    };
    try {
      const response = await api.get(`/admin/${endpoint}`, { params: _params });
      setDataSource(response.data?.items || []);
      setTotalItemsCount(response.data?.total);
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

  const deleteSelected = async () => {
    const params = { id: selectedRowKeys };
    try {
      await api.delete(`/admin/${endpoint}`, { params });
      toast.success("با موفقیت حذف شد");
      await getData();
    } catch (error) {}
  };

  useEffect(() => {
    // get table data
    if (endpoint) getData();
    // setFirstTry(false);
  }, [searchParams, update]);

  const timeoutRef = useRef<Timeout | null>(null);

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
  // ====> detail
  const expandDetail = { expandedRowRender: (record: T) => detail };

  // ##############################################
  // ====> drag sorting
  interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    "data-row-key": string;
  }

  const Row = (props: RowProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
      id: props["data-row-key"],
    });
    const style: React.CSSProperties = {
      ...props.style,
      transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
      transition,
      cursor: "move",
      ...(isDragging ? { position: "relative", zIndex: 9999 } : {}),
    };
    return <tr key={props["data-row-key"]} {...props} ref={setNodeRef} style={style} {...attributes} {...listeners} />;
  };

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id);
        const overIndex = prev.findIndex((i) => i.key === over?.id);
        return arrayMove(prev, activeIndex, overIndex);
      });
    }
  };

  const baseRoute = (params?.id ? pathname?.replace(params.id as string, "") : pathname) || "/";
  let hasOperations = deletable || editable || extraOperations();
  const generateOperations = (id: string, record: any) => {
    let operationsItem: any[] = [];
    if (deletable) {
      operationsItem.push({
        key: "delete",
        label: (
          <Popconfirm title="حذف شود؟" okText="بله" cancelText="خیر" okType="link" onConfirm={() => deleteRow(id)}>
            <a>حذف</a>
          </Popconfirm>
        ),
      });
    }
    if (editable) {
      const spm = new URLSearchParams(searchParams?.toString());
      // spm.delete("count");
      // spm.delete("page");
      operationsItem.push({
        key: "edit",
        label: <Link href={`${baseRoute}/${id}` + (spm ? "?" + spm?.toString() : "")}>ویرایش</Link>,
      });
    }
    return [...operationsItem, ...extraOperations(id, record)];
  };

  const Header = () => {
    return (
      <>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          {/* {!!headerTitle && headerTitle(totalItemsCount)} */}
          <div className="flex items-center justify-between gap-4 text-base font-semibold sm:justify-start">
            {/*  */}
            {headerTitle} {!!totalItemsCount && "(" + totalItemsCount + ")"}
            {hasSelected && (
              <Popconfirm title={`${selectedCount} مورد حذف شود؟`} okText="بله" cancelText="خیر" okType="link" onConfirm={() => deleteSelected()}>
                <Button
                  //
                  size="small"
                  noSpace
                  fill={false}
                  title="حذف"
                />
              </Popconfirm>
            )}
            {!!tableToolsList?.length && (
              <Dropdown
                menu={{
                  items: tableToolsList,
                }}
              >
                <a>
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <WidgetsIcon />
                  </IconButton>
                </a>
              </Dropdown>
            )}
          </div>

          <div className="flex w-full items-center gap-x-2 self-end sm:w-auto">
            <div className="relative flex w-full items-center">
              <input
                //
                type="text"
                placeholder="جستجو ..."
                className={`block w-full border-0 border-b border-gray-300 bg-white p-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-300 focus:bg-white focus:ring-0`}
                defaultValue={_search || ""}
                onKeyDown={(e: any) => {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                  timeoutRef.current = setTimeout(() => {
                    const $s = new URLSearchParams(searchParams?.toString());
                    $s?.set("search", e.target.value);
                    router.push(pathname + "?" + $s.toString());
                    timeoutRef.current = null;
                  }, 1000);
                }}
              />
              <div className="absolute left-2.5 cursor-pointer text-secondary">
                <SearchIcon />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  if (hasOperations) {
    tableColumns.push({
      title: "",
      key: "operation",
      dataIndex: "_id",
      width: "75px",
      render: (id: string, record) => (
        <Space size="middle">
          <Dropdown
            menu={{
              items: generateOperations(id, record),
            }}
          >
            <a>
              <IconButton color="primary" aria-label="upload picture" component="label">
                <MoreVertOutlinedIcon />
              </IconButton>
            </a>
          </Dropdown>
        </Space>
      ),
      ellipsis: false,
    });
  }

  const pagination: TablePaginationConfig = {
    // showSizeChanger: true,
    total: totalItemsCount,
    position: ["bottomCenter"],
    // onChange: handlePaginationChange,
    pageSize: _count,
    current: _page,
    responsive: true,
    pageSizeOptions: ["10", "25", "50", "100", "250", "500"],
  };

  // ##############################################
  if (sortable) {
    return (
      <>
        <DndContext onDragEnd={onDragEnd}>
          <SortableContext
            // rowKey array
            items={dataSource.map((i) => i._id)}
            strategy={verticalListSortingStrategy}
          >
            <Table
              //
              components={{
                body: {
                  row: Row,
                },
              }}
              rowKey="_id"
              bordered={false}
              loading={loading || fetchLoading}
              size="large"
              title={Header}
              showHeader={true}
              footer={footerTitle}
              expandable={expandable ? expandDetail : undefined}
              rowSelection={selectable ? rowSelection : undefined}
              scroll={scroll}
              pagination={pagination}
              columns={tableColumns}
              dataSource={dataSource}
              locale={{
                emptyText: <Empty description="موردی پیدا نشد" />,
                filterConfirm: "انجام",
                filterReset: "ریست",
              }}
              onChange={handleTableChange}
            />
          </SortableContext>
        </DndContext>
      </>
    );
  }

  return (
    <Table
      //
      rowKey="_id"
      bordered={false}
      loading={loading || fetchLoading}
      size="large"
      title={Header}
      showHeader={true}
      footer={footerTitle}
      expandable={expandable ? expandDetail : undefined}
      rowSelection={selectable ? rowSelection : undefined}
      scroll={scroll}
      pagination={pagination}
      columns={tableColumns}
      dataSource={dataSource}
      locale={{
        emptyText: <Empty description="موردی پیدا نشد" />,
        filterConfirm: "انجام",
        filterReset: "ریست",
      }}
      onChange={handleTableChange}
    />
  );
}

export default PanelTable;

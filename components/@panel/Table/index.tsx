"use client";

import React, { useState, ReactNode, useEffect } from "react";
import { Dropdown, Popconfirm, RadioChangeEvent } from "antd";
import { Form, Radio, Space, Switch, Table } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { ExpandableConfig, TableRowSelection } from "antd/es/table/interface";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { IconButton } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { toast } from "@/lib/toast";
import Link from "next/link";

type TablePaginationPosition = "topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight";

export type PanelTableProps = {
  headerTitle?: () => ReactNode;
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
  extraOperations?: (id: string) => any[];
  update?: any;
};

function PanelTable<T>({ headerTitle, extraOperations = (id) => [], deletable, editable, footerTitle, endpoint, data, columns, loading = false, selectable = true, sortable = false, minWidth, expandable = false, detail, update = false }: PanelTableProps) {
  const [fetchLoading, setFetchLoading] = useState(false);
  const [dataSource, setDataSource] = useState(data?.length !== undefined ? data : []);

  const scroll: { x?: number | string; y?: number | string } = {};
  scroll.y = "calc(100vh - 260px)";

  // fixed column
  scroll.x = minWidth;
  const tableColumns = columns.map((item) => ({ ...item, ellipsis: false }));
  tableColumns[0].fixed = true;
  tableColumns[tableColumns.length - 1].fixed = "right";

  // ##############################################
  // ====> get data
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const _search = searchParams?.get("search");
  const _sort = searchParams?.get("sort");
  const _page = parseInt(searchParams?.get("page") || "1");
  const _count = parseInt(searchParams?.get("count") || "10");

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
              rowKey="key"
              bordered={false}
              loading={loading || fetchLoading}
              size="large"
              title={headerTitle}
              showHeader={true}
              footer={footerTitle}
              expandable={expandable ? expandDetail : undefined}
              rowSelection={selectable ? rowSelection : undefined}
              scroll={scroll}
              pagination={{
                total: totalItemsCount,
                position: ["bottomCenter"],
                onChange: handlePaginationChange,
                pageSize: _count,
                current: _page,
                defaultPageSize: 10,
                defaultCurrent: 1,
                pageSizeOptions: ["10", "25", "50", "100", "250", "500"],
              }}
              columns={tableColumns}
              dataSource={dataSource}
            />
          </SortableContext>
        </DndContext>
      </>
    );
  }

  const baseRoute = (params?.id ? pathname?.replace(params.id as string, "") : pathname) || "/";
  const hasOperations = deletable || editable || extraOperations("");
  const generateOperations = (id: string) => {
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
      operationsItem.push({
        key: "edit",
        label: <Link href={`${baseRoute}/${id}` + (searchParams ? "?" + searchParams?.toString() : "")}>ویرایش</Link>,
      });
    }
    return [...operationsItem, ...extraOperations(id)];
  };

  if (hasOperations) {
    tableColumns.push({
      title: "",
      key: "operation",
      dataIndex: "_id",
      width: "75px",
      render: (id: string) => (
        <Space size="middle">
          <Dropdown
            menu={{
              items: generateOperations(id),
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

  return (
    <Table
      //
      rowKey="key"
      bordered={false}
      loading={loading || fetchLoading}
      size="large"
      title={headerTitle}
      showHeader={true}
      footer={footerTitle}
      expandable={expandable ? expandDetail : undefined}
      rowSelection={selectable ? rowSelection : undefined}
      scroll={scroll}
      pagination={{
        total: totalItemsCount,
        position: ["bottomCenter"],
        onChange: handlePaginationChange,
        pageSize: _count,
        current: _page,
        defaultPageSize: 25,
        defaultCurrent: 1,
        pageSizeOptions: ["10", "25", "50", "100", "250", "500"],
      }}
      columns={tableColumns}
      dataSource={dataSource}
    />
  );
}

export default PanelTable;

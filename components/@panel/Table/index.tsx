"use client";

import React, { useState, ReactNode, useEffect } from "react";
import type { RadioChangeEvent } from "antd";
import { Form, Radio, Space, Switch, Table } from "antd";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import type { ColumnsType, TableProps } from "antd/es/table";
import type { ExpandableConfig, TableRowSelection } from "antd/es/table/interface";
import { useRouter, useSearchParams } from "next/navigation";

type TablePaginationPosition = "topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight";

type IProps = {
  headerTitle?: () => string;
  footerTitle?: () => string;
  data: any[];
  columns: ColumnsType<any>;
  loading?: boolean;
  selectable?: boolean;
  withDetail?: boolean;
  detail?: ReactNode;
};

function PanelTable<T>({ headerTitle, footerTitle, data, columns, loading = false, selectable = true, withDetail = false, detail }: IProps) {
  const [fetchLoading, setFetchLoading] = useState(false);

  const scroll: { x?: number | string; y?: number | string } = {};
  scroll.y = "100%";

  // fixed columns
  scroll.x = "100vw";
  const tableColumns = columns.map((item) => ({ ...item, ellipsis: false }));
  tableColumns[0].fixed = true;
  tableColumns[tableColumns.length - 1].fixed = "right";

  // #############################
  // ====> get data
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const _search = searchParams?.get("search");
  const _sort = searchParams?.get("sort");
  const _page = parseInt(searchParams?.get("page") || "1");
  const _count = parseInt(searchParams?.get("count") || "25");

  const [totalItemsCount, setTotalItemsCount] = useState(0);
  const handlePaginationChange = (page: number, page_size: number) => {
    alert(page);
    // $qp.set("page", page);
    // if (page_size !== 25) $qp.set("psize", page_size);
    // navigate({ search: $qp.toString() });
  };

  const getData = async () => {};
  useEffect(() => {
    // get table data
    getData();
    // setFirstTry(false);
  }, [_page, _count, _search, _sort]);

  // ################################################################

  // #############################
  // ====> rowSelection
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: any) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };
  const selectedCount = selectedRowKeys.length;
  const hasSelected = selectedCount > 0;

  // ######################
  // ====> detail
  const expandDetail = { expandedRowRender: (record: T) => detail };

  return (
    <>
      <Table
        //
        bordered={false}
        loading={loading || fetchLoading}
        size="large"
        title={headerTitle}
        showHeader={true}
        footer={footerTitle}
        expandable={withDetail ? expandDetail : undefined}
        rowSelection={selectable ? rowSelection : undefined}
        scroll={scroll}
        pagination={{
          total: totalItemsCount,
          position: ["bottomCenter"],
          onChange: handlePaginationChange,
          pageSize: _count,
          current: _page,
          pageSizeOptions: ["10", "25", "50", "100", "250", "500"],
        }}
        columns={tableColumns}
        dataSource={data}
      />
    </>
  );
}

export default PanelTable;

import { Card, Col, Row } from "antd";
import React, { ReactNode } from "react";

const PanelCard = ({ children, title, loading, disabled, extra, className }: IProps) => (
  <Card title={title} bordered={false} loading={loading} className={className} extra={loading || disabled ? (disabled ? "(غیرفعال)" : null) : extra}>
    {disabled ? null : children}
  </Card>
);

export default PanelCard;

type IProps = {
  children: ReactNode;
  title?: ReactNode;
  extra?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
};

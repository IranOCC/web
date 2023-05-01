import { Card, Col, Row } from "antd";
import React, { ReactNode } from "react";

const PanelCard = ({ children, title, loading, disabled, extra }: IProps) => (
  <Card title={title} bordered={false} loading={loading} extra={loading || disabled ? (disabled ? "(غیرفعال)" : null) : extra}>
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
};

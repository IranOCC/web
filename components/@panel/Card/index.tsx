import { Card, Col, Row } from "antd";
import React, { ReactNode } from "react";

const PanelCard = ({ children, title, loading, extra }: { children: ReactNode; title?: ReactNode; extra?: ReactNode; loading?: boolean }) => (
  <Card title={title} bordered={false} loading={loading} extra={extra} hoverable>
    {children}
  </Card>
);

export default PanelCard;

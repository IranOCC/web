import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { useContext, useEffect } from "react";

const ClientSide = () => {
  const { internalPage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    internalPage();
  }, []);
  return null;
};

export default ClientSide;

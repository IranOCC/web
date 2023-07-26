"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { WebEstate } from "@/types/interfaces";
import Image from "next/image";
import { useContext, useEffect } from "react";
import ImageGallery from "./ImageGallery";

const SingleEstate = ({ data }: { data: WebEstate }) => {
  const { _id, title, slug, content, excerpt, tags, category, image, gallery, pinned, publishedAt, owner, code, province, city, district } = data;
  const { singleEstate } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    singleEstate(_id, title, category, code || "-", [province, city, district].join(" - "));
  }, []);
  useEffect(() => {
    //
  }, []);

  return (
    <>
      {!!gallery?.length && <ImageGallery items={gallery} />}
      {/* <div className="relative mt-4" dangerouslySetInnerHTML={{ __html: content }} /> */}
      سلام خوبی
    </>
  );
};

export default SingleEstate;

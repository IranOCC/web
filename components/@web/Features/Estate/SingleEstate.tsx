"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { WebEstate } from "@/types/interfaces";
import Image from "next/image";
import { useContext, useEffect } from "react";
import ImageGallery from "./ImageGallery";

const SingleEstate = ({ data }: { data: WebEstate }) => {
  const { _id, title, slug, content, excerpt, tags, category, image, gallery, pinned, publishedAt, owner, code } = data;
  const { singleEstate } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    singleEstate(_id, title, category, code || "-", "");
  }, []);
  useEffect(() => {
    //
  }, []);

  return (
    <>
      {!!gallery?.length && (
        <div className="relative flex flex-col items-center justify-center overflow-hidden">
          {/*  */}
          <ImageGallery items={gallery} />
          {/*  */}
        </div>
      )}
      {/* <div className="relative mt-4" dangerouslySetInnerHTML={{ __html: content }} /> */}
    </>
  );
};

export default SingleEstate;

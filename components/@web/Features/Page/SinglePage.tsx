"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { WebPage } from "@/types/interfaces";
import { useContext, useEffect } from "react";
import WebTab from "../../Tab";
import GalleryContent from "../@common/GalleryContent";

const SinglePage = ({ data }: { data?: WebPage }) => {
  if (!data) throw Error("PageNotFound");

  const { _id, title, slug, content, tags, publishedAt } = data;
  const { singlePage } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    singlePage(_id, title, publishedAt, 0, 0);
  }, []);

  const tabDe = <div className="" dangerouslySetInnerHTML={{ __html: content || "محتویات درج نشده است" }} />;

  return (
    <>
      <div className="flex h-auto min-h-full flex-col bg-gray-200 pb-16 md:bg-transparent md:px-4 md:pb-4">
        <GalleryContent
          //
          id={_id}
        />
        <WebTab
          data={[
            {
              title: "محتوا",
              content: tabDe,
            },
          ]}
        />
      </div>
    </>
  );
};

export default SinglePage;

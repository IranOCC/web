"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { WebBlogPost } from "@/types/interfaces";
import { useContext, useEffect } from "react";
import WebTab from "../../Tab";
import GalleryContent from "../@common/GalleryContent";

const SingleBlogPost = ({ data }: { data?: WebBlogPost }) => {
  if (!data) throw Error("PostNotFound");

  const { _id, title, slug, content, excerpt, tags, categories, image, pinned, publishedAt, author } = data;
  const { singlePost } = useContext(WebPreviewContext) as WebPreviewContextType;
  useEffect(() => {
    singlePost(
      _id,
      title,
      categories.map(({ title }) => title),
      author.fullName || "-",
      publishedAt,
      0,
      0
    );
  }, []);

  const tabDe = <div className="" dangerouslySetInnerHTML={{ __html: content || "محتویات درج نشده است" }} />;

  return (
    <>
      <div className="flex h-auto min-h-full flex-col bg-gray-200 pb-16 md:bg-transparent md:px-4 md:pb-4">
        <GalleryContent
          //
          items={image && [image]}
          id={_id}
        />
        <WebTab
          data={[
            {
              title: "محتوا",
              content: tabDe,
            },
            {
              title: "دیدگاه ها",
              content: null,
            },
          ]}
        />
      </div>
    </>
  );
};

export default SingleBlogPost;

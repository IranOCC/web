"use client";

import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import { WebBlogPost } from "@/types/interfaces";
import Image from "next/image";
import { useContext, useEffect } from "react";

const SingleBlogPost = ({ data }: { data: WebBlogPost }) => {
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
  useEffect(() => {
    //
  }, []);

  return (
    <>
      {!!image && (
        <div className="relative flex items-center justify-center overflow-hidden">
          <Image
            //
            src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + image.path}
            alt={title}
            width={800}
            height={400}
            className="block rounded-xl object-cover"
          />
        </div>
      )}
      <div className="relative mt-4" dangerouslySetInnerHTML={{ __html: content }} />
    </>
  );
};

export default SingleBlogPost;

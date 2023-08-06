"use client";

import { WebBlogPost } from "@/types/interfaces";
import Image from "next/image";
import Link from "next/link";

const BlogPostCard = ({ data }: { data: WebBlogPost }) => {
  const {
    //
    _id,
    title,
    slug,
    content,
    excerpt,
    tags,
    image,
    pinned,
    office,
    createdBy,
    publishedAt,
    author,
  } = data;

  return (
    <div className="overflow-hidden rounded-xl md:max-h-[12rem] md:min-h-[12rem]">
      <Link href={`/property/${slug}`}>
        <div className="flex flex-col gap-2 overflow-hidden rounded-xl bg-white p-2 md:flex-row md:bg-gray-200 md:p-0">
          <Image
            //
            src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + image.path}
            alt={image.alt}
            title={image.title}
            width={500}
            height={200}
            className="block max-h-[10rem] w-full rounded-xl object-cover md:h-full md:max-h-[12rem] md:min-h-[12rem] md:max-w-[12rem] lg:max-w-[15rem] xl:max-w-[20rem]"
          />

          <div className="flex flex-col justify-center gap-2 md:py-3">
            <h3 className="w-full truncate font-bold">{title}</h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPostCard;

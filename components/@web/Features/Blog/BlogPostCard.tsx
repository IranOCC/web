"use client";

import UserIcon from "@/components/Icons/User";
import { WebBlogPost } from "@/types/interfaces";
import { Category } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import { WebButton } from "../../Button";
import { Card } from "@nextui-org/react";

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
    categories,
  } = data;

  return (
    <div className="md:max-h-[12rem] md:min-h-[12rem]">
      <Card className="group relative w-full overflow-hidden" shadow="none" isPressable isHoverable>
        <Link href={`/blog/${slug}`} className="w-full">
          <div className="flex w-full flex-col gap-2 overflow-hidden rounded-xl bg-white p-2 md:flex-row md:bg-gray-200 md:p-0">
            {!!image && (
              <Image
                //
                src={process.env.NEXT_PUBLIC_STORAGE_BASE_URL + "/" + image.path}
                alt={image.alt}
                title={image.title}
                width={500}
                height={200}
                className="block max-h-[10rem] w-full rounded-xl object-cover md:h-full md:max-h-[12rem] md:min-h-[12rem] md:max-w-[12rem] lg:max-w-[15rem] xl:max-w-[20rem]"
              />
            )}
            <div className="flex w-full flex-col justify-center gap-2 md:py-3 md:pe-2">
              <h3 className="w-full truncate font-bold">{title}</h3>
              <div className="flex gap-1 text-sm text-purple-600">
                <Category style={{ fontSize: 16 }} /> {categories.map(({ title }) => title).join(", ")}
              </div>
              <p className="h-20 w-full overflow-hidden text-justify font-light">{excerpt}</p>
              <div className="absolute bottom-2 left-2 flex items-end">
                <WebButton title="مشاهده پست" size="small" noSpace className="shadow-[#ffffff_5px_-6px_20px_20px] md:shadow-[#e5e7eb_5px_-6px_20px_20px]" />
              </div>
            </div>
          </div>
        </Link>
      </Card>
    </div>
  );
};

export default BlogPostCard;

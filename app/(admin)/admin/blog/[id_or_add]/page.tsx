"use client";

import EditAddPage, { type AddEditComponentProps } from "@/components/@panel/EditAddPage";
import { BlogPostFormData, } from "@/types/formsData";
import { BlogPost, StorageFile, } from "@/types/interfaces";
import { useForm } from "react-hook-form";
import BlogPostBox from "@/components/@panel/Features/Blog/PostBox";
import BlogPostCategoryBox from "@/components/@panel/Features/Blog/PostCategoryBox";
import BlogPostTagsBox from "@/components/@panel/Features/Blog/PostTagsBox";
import BlogPostVisibilityBox from "@/components/@panel/Features/Blog/PostVisibilityBox";
import BlogPostRegistrantBox from "@/components/@panel/Features/Blog/PostRegistrantBox";
import BlogPostMediaBox from "@/components/@panel/Features/Blog/PostMediaBox";
import AddEditPostCheckModal from "@/components/Modals/AddPostCheckModal";
import { useState } from "react";
import BlogPostAuthorBox from "@/components/@panel/Features/Blog/PostAuthorBox";


const Center = (props: AddEditComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-full">
          <BlogPostBox {...props} />
        </div>
      </div>
    </>
  );
};

const Side = (props: AddEditComponentProps) => {
  return (
    <>
      <BlogPostMediaBox {...props} />
      <BlogPostAuthorBox {...props} />
      <BlogPostCategoryBox {...props} />
      <BlogPostTagsBox {...props} />
      <BlogPostVisibilityBox {...props} />
    </>
  );
};

export default function Page() {
  const form = useForm<BlogPostFormData>();
  const { setValue, getValues } = form;

  const [checkingData, setCheckingData] = useState(null)
  const [detail, setDetail] = useState<any>(null)

  const setInitialData = (data: BlogPost) => {
    setValue("_id", data._id);

    setValue("title", data.title);
    setValue("content", data.content);
    setValue("excerpt", data.excerpt);
    setValue("slug", data.slug);

    // pictures
    if(data.image) setValue("gallery", [data.image as StorageFile]);
    else setValue("gallery", []);
    setValue("image", data.image);

    setValue("status", data.status);
    setValue("visibility", data.visibility);
    setValue("pinned", data.pinned);
    setValue("publishedAt", data.publishedAt);

    setValue("tags", data.tags);
    setValue("categories", data.categories);

    setValue("office", data.office);

    setDetail({
      ID: data._id,
      createdBy: data.createdBy,
      createdAt: data.createdAt,

      isConfirmed: data.isConfirmed,
      
      confirmedBy: data.confirmedBy,
      confirmedAt: data.confirmedAt,
    })
  };



  return (
    <>
      <EditAddPage<BlogPostFormData, BlogPost>
        //
        Center={Center}
        Side={Side}
        form={form}
        componentProps={{checkingData, detail}}
        setInitialData={setInitialData}
        endpoint="blog/post"

        TopSubmitCard={BlogPostRegistrantBox}
      />

      <AddEditPostCheckModal 
        set={setCheckingData}
      />
      
      
    </>
  );
}

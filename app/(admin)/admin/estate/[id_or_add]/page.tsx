"use client";

import EditAddPage, { type AddEditComponentProps } from "@/components/@panel/EditAddPage";
import SendEmailBox from "@/components/@panel/Features/@common/SendEmailBox";
import SendSmsBox from "@/components/@panel/Features/@common/SendSmsBox";
import EstateBox from "@/components/@panel/Features/Estate/EstateBox";
import EstateLocationBox from "@/components/@panel/Features/Estate/EstateLocationBox";
import EstateGeneralBox from "@/components/@panel/Features/Estate/EstateGeneralBox";
import { EstateFormData, UserFormData } from "@/types/formsData";
import { Estate, StorageFile, User } from "@/types/interfaces";
import { useForm } from "react-hook-form";
import EstateVisibilityBox from "@/components/@panel/Features/Estate/EstateVisibilityBox";
import EstateMediaBox from "@/components/@panel/Features/Estate/EstateMediaBox";
import EstateTagsBox from "@/components/@panel/Features/Estate/EstateTagsBox";
import EstateFeaturesBox from "@/components/@panel/Features/Estate/EstateFeaturesBox";
import EstateOwnerBox from "@/components/@panel/Features/Estate/EstateOwnerBox";
import EstateSetCategoryModal from "@/components/@panel/Features/Estate/EstateSetCategoryModal";
import { useState } from "react";
import EstateCategoryTypeBox from "@/components/@panel/Features/Estate/EstateCategoryTypeBox";
import EstateRegistrantBox from "@/components/@panel/Features/Estate/EstateRegistrantBox";
import PanelTab from "@/components/@panel/Tab";
import PanelCard from "@/components/@panel/Card";

const Center = (props: AddEditComponentProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-full">
          <EstateBox {...props} />
        </div>
        {/* <div className="col-span-full">
          <PanelCard>
            <PanelTab
              //
              data={[
                {
                  title: "ویژگی های عمومی",
                  content: "kkkk",
                },
                {
                  title: "ویژگی های اختصاصی",
                  content: "nnn",
                },
                {
                  title: "موقعیت مکانی",
                  content: "nnn",
                },
                {
                  title: "گالری و رسانه",
                  content: "nnn",
                },
              ]}
            />
          </PanelCard>
        </div> */}
        <div className="col-span-full md:col-span-1">
          <EstateGeneralBox {...props} />
        </div>
        <div className="col-span-full md:col-span-1">
          <EstateFeaturesBox {...props} />
        </div>
        <div className="col-span-full">
          <EstateLocationBox {...props} />
        </div>
      </div>
    </>
  );
};

const Side = (props: AddEditComponentProps) => {
  return (
    <>
      <EstateMediaBox {...props} />
      <EstateOwnerBox {...props} />
      <EstateTagsBox {...props} />
      <EstateVisibilityBox {...props} />
      <EstateRegistrantBox {...props} />
    </>
  );
};

export default function Page() {
  const form = useForm<EstateFormData>();
  const { setValue, getValues } = form;

  const setInitialData = (data: EstateFormData) => {

    setSelectedCat(data.category)


    setValue("_id", data._id);

    setValue("title", data.title);
    setValue("content", data.content);
    setValue("excerpt", data.excerpt);
    setValue("slug", data.slug);

    // pictures


    setValue("status", data.status);
    setValue("visibility", data.visibility);
    setValue("pinned", data.pinned);
    setValue("publishedAt", data.publishedAt);

    setValue("tags", data.tags);
    setValue("code", data.code);


    setValue("category", data.category);
    setValue("type", data.type);
    setValue("documentType", data.documentType);
    setValue("area", data.area);
    setValue("price", data.price);
    setValue("totalPrice", data.totalPrice);
    setValue("description", data.description);
    setValue("canBarter", data.canBarter);


    setValue("constructionYear", data.constructionYear);
    setValue("roomsCount", data.roomsCount);
    setValue("mastersCount", data.mastersCount);
    setValue("buildingArea", data.buildingArea);
    setValue("unitsCount", data.unitsCount);
    setValue("floor", data.floor);
    setValue("withOldBuilding", data.withOldBuilding);
    setValue("features", data.features);


    setValue("province", data.province);
    setValue("city", data.city);
    setValue("district", data.district);
    setValue("quarter", data.quarter);
    setValue("alley", data.alley);
    setValue("address", data.address);
    setValue("location", data.location);

    setValue("owner", data.owner);
    setValue("createdBy", data.createdBy);
    setValue("confirmedBy", data.confirmedBy);
    setValue("office", data.office);
  };

  const [selectedCat, setSelectedCat] = useState<string | undefined | null>(getValues("category"));



  return (
    <>
      <EditAddPage<EstateFormData, Estate>
        //
        Center={Center}
        Side={Side}
        form={form}
        setInitialData={setInitialData}
        endpoint="estate"
        componentProps={{ selectedCat }}
      />
      {/*  */}
      <EstateSetCategoryModal
        //
        open={selectedCat === null}
        setCategory={(val: string) => {
          setValue("category", val, { shouldValidate: true });
          setSelectedCat(val);
        }}
      />
    </>
  );
}

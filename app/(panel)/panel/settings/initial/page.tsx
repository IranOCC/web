"use client";

import PanelCard from "@/components/@panel/Card";
import InitialSettings from "@/components/@panel/Features/Setting/InitialSettings";
import { Button } from "@/components/Button";
import { handleFieldsError } from "@/lib/axios";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { InitialSettingsFormData } from "@/types/formsData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const form = useForm<InitialSettingsFormData>();
  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful, dirtyFields },
  } = form;

  const router = useRouter();

  const api = useAxiosAuth();

  // submit
  const onSubmit = () => async (data: InitialSettingsFormData) => {
    const _dirtyFields = Object.fromEntries(
      Object.keys(dirtyFields).map((key) => {
        return [key, data[key as keyof InitialSettingsFormData]];
      })
    );
    try {
      await api.patch("/settings/initial", _dirtyFields);
      toast.success("با موفقیت ویرایش شد");
      window.location.reload();
    } catch (error) {
      handleFieldsError(error, setError);
    }
  };

  // get data
  const getData = async () => {
    try {
      const response = await api.get("/settings/initial");

      const {
        //
        title,
        description,
        keywords,
      } = response.data;
      setValue("title", title);
      setValue("description", description);
      setValue("keywords", keywords);
    } catch (error) {
      router.back();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit())} />
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-full	lg:col-span-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-full">
                <InitialSettings form={form} />
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-2">
            <div className="grid grid-cols-1 gap-4">
              <PanelCard>
                <Button
                  //
                  title="ثبت و برگشت به لیست"
                  type="submit"
                  loading={isSubmitting || isLoading || isValidating}
                  onClick={handleSubmit(onSubmit())}
                />
                <Button
                  //
                  title="ثبت"
                  type="submit"
                  loading={isSubmitting || isLoading || isValidating}
                  onClick={handleSubmit(onSubmit())}
                  noSpace
                />
              </PanelCard>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

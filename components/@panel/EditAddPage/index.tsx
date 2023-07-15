"use client";

import { useParams, usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/@panel/Button";
import PanelCard from "@/components/@panel/Card";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { FieldValues, useForm } from "react-hook-form";
import { ReactNode, useEffect, useState } from "react";
import { handleFieldsError } from "@/lib/axios";

type IProps = {
  Center: any;
  Side?: any;
  endpoint: string;
  form: any;
  setInitialData: (data: any) => void;
  componentProps?: any;
  beforeSubmit?: (data: any) => any;
  TopSubmitCard?: any;
};

export default function EditAddPage<F extends FieldValues, T>({ Center, Side = null, TopSubmitCard, beforeSubmit, endpoint, form, setInitialData, componentProps = {} }: IProps) {
  const params = useParams();
  const pathname = usePathname();

  const SECTION = !!params?.section ? (params.section as string) : undefined;
  const isNew = !!params?.id_or_add && (params?.id_or_add as string) === "add";
  const ID = isNew ? undefined : (params?.id_or_add as string);

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

  const baseRoute = (params?.id_or_add ? pathname?.replace(params.id_or_add as string, "") : pathname) || "/";

  // submit
  const onSubmit = (redirect: boolean = SECTION ? false : true) => async (data: F) => {
    if (beforeSubmit) data = beforeSubmit(data);
    try {
      if (isNew) {
        const { data: result } = await api.post(`/admin/${endpoint}`, data);
        toast.success("با موفقیت ایجاد شد");
        if (redirect) router.replace(baseRoute);
        else router.replace(baseRoute + result._id);
      } else {
        await api.patch(`/admin/${endpoint}/` + (SECTION || ID), data);
        toast.success("با موفقیت ویرایش شد");
        if (redirect) router.replace(baseRoute);
        else window.location.reload();
      }
    } catch (error) {
      handleFieldsError(error, setError);
    }
  };

  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const getData = async () => {
    setDataLoading(true);
    try {
      const response = await api.get(`/admin/${endpoint}/` + (SECTION || ID));
      const data = response.data as F;
      setInitialData(data);
      setDataLoading(false);
    } catch (error) {
      router.replace(baseRoute);
    }
  };

  useEffect(() => {
    if (ID) getData();
  }, []);

  const { checkingData } = componentProps;
  if (checkingData !== undefined && checkingData === null) return null;

  return (
    <>
      <div className="p-4">
        <form onSubmit={handleSubmit(onSubmit())} />
        <div className="grid grid-cols-6 gap-4">
          <div className="col-span-full	lg:col-span-4">
            <Center form={form} loading={dataLoading} section={SECTION} props={componentProps} />
          </div>
          <div className="col-span-full lg:col-span-2">
            <div className="grid grid-cols-1 gap-4">
              <PanelCard className="order-last lg:order-first" loading={dataLoading}>
                {TopSubmitCard && <TopSubmitCard form={form} loading={dataLoading} section={SECTION} props={componentProps} />}
                {!SECTION && (
                  <Button
                    //
                    title="ثبت و برگشت به لیست"
                    type="submit"
                    disabled={componentProps?.checkingData?.allowSubmit !== undefined && componentProps.checkingData.allowSubmit === false}
                    loading={isSubmitting || isLoading || isValidating || dataLoading}
                    onClick={handleSubmit(onSubmit())}
                  />
                )}
                <Button
                  //
                  title="ثبت"
                  type="submit"
                  disabled={componentProps?.checkingData?.allowSubmit !== undefined && componentProps.checkingData.allowSubmit === false}
                  loading={isSubmitting || isLoading || isValidating || dataLoading}
                  onClick={handleSubmit(onSubmit(false))}
                  noSpace
                />
              </PanelCard>
              {Side && <Side form={form} loading={dataLoading} section={SECTION} props={componentProps} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export type AddEditComponentProps = {
  form: any;
  loading: boolean;
  section?: string;
  cancelForm?: any;
  props?: any;
};

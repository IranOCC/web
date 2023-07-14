"use client";

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/@panel/Button";
import PanelCard from "@/components/@panel/Card";

import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { FieldValues, useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import PanelTable, { PanelTableProps } from "../Table";
import { handleFieldsError } from "@/lib/axios";

interface IProps extends PanelTableProps {
  FormComponent: any;
  endpoint: string;
  form: any;
  formTitle?: string;
  onEditField?: string;
  setInitialData: (data: any) => void;
}

export default function ListEditPage<F extends FieldValues, T>({ FormComponent, endpoint, form, formTitle, setInitialData, onEditField, ...otherProps }: IProps) {
  const TableProps: PanelTableProps = { ...otherProps, endpoint };

  const params = useParams();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    getValues,
    handleSubmit,
    reset,
    trigger,

    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful, dirtyFields },
  } = form;

  const router = useRouter();
  const api = useAxiosAuth();

  let baseRoute = (params?.id ? pathname?.replace(params.id as string, "") : pathname) || "/";
  baseRoute += baseRoute !== "/" ? "?" + searchParams?.toString() : "/";
  const [updateTable, setUpdateTable] = useState([false]);

  // submit
  const onSubmit = () => {
    return async (data: F) => {
      try {
        if (!getValues("_id")) {
          await api.post(`/admin/${endpoint}`, data);
          toast.success("با موفقیت ایجاد شد");
        } else {
          await api.patch(`/admin/${endpoint}/` + getValues("_id"), data);
          toast.success("با موفقیت ویرایش شد");
        }
        reset();
        setUpdateTable([true]);
        router.replace(baseRoute);
      } catch (error) {
        handleFieldsError(error, setError);
      }
    };
  };

  const onCancel = () => {
    router.replace(baseRoute);
    reset();
  };

  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const getData = async () => {
    setDataLoading(true);
    try {
      const response = await api.get(`/admin/${endpoint}/` + params?.id);
      const data = response.data as F;
      setInitialData(data);
      setDataLoading(false);
    } catch (error) {
      router.replace(baseRoute);
    }
  };

  useEffect(() => {
    if (!!params?.id) getData();
  }, []);

  return (
    <>
      <div className="p-4">
        {updateTable}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-full	lg:col-span-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-full">
                <PanelCard title={!params?.id ? `ایجاد ${formTitle} جدید` : `ویرایش ${formTitle}`} loading={dataLoading}>
                  <form onSubmit={handleSubmit(onSubmit())}>
                    <div className="grid grid-cols-1 gap-4 ">
                      <FormComponent form={form} loading={dataLoading} cancelForm={onCancel} />
                      <div className="grid grid-cols-2 gap-2 ">
                        <Button
                          //
                          title="لغو"
                          type="button"
                          loading={isSubmitting || isLoading || isValidating}
                          noSpace
                          variant="outline"
                          onClick={onCancel}
                        />
                        <Button
                          //
                          title="ثبت"
                          type="submit"
                          loading={isSubmitting || isLoading || isValidating}
                          noSpace
                        />
                      </div>
                    </div>
                  </form>
                </PanelCard>
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-7">
            <div className="grid grid-cols-1 gap-4">
              <PanelTable<T>
                //
                {...TableProps}
                update={updateTable}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

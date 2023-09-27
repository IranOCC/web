import useAxiosAuth from "@/hooks/useAxiosAuth";
import { EstateFormData } from "@/types/formsData";
import { SelectDataType } from "@/types/interfaces";
import { Select, SelectItem, Switch } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Timeout } from "react-number-format/types/types";

export const SpecialFilter = ({ form, dataLoading, onSubmit }: any) => {
  const timeoutRef = useRef<Timeout | null>(null);

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <Controller
          control={form.control}
          name="special"
          render={({ field }) => {
            return (
              <Switch
                //
                className="col-span-full"
                placeholder="املاک ویژه"
                dir="ltr"
                {...field}
                value={field.value?.toString() || ""}
                onValueChange={() => {
                  if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                  }
                  timeoutRef.current = setTimeout(() => {
                    form.handleSubmit(onSubmit)();
                    timeoutRef.current = null;
                  }, 500);
                }}
              >
                املاک ویژه
              </Switch>
            );
          }}
        />
      </div>
    </>
  );
};

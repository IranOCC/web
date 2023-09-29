import useAxiosAuth from "@/hooks/useAxiosAuth";
import { EstateFormData } from "@/types/formsData";
import { SelectDataType } from "@/types/interfaces";
import { Select, SelectItem, Switch } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { Timeout } from "react-number-format/types/types";

export const RentFilter = ({ form, dataLoading, onSubmit }: any) => {
  const timeoutRef = useRef<Timeout | null>(null);

  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <Controller
          control={form.control}
          name="dailyRent"
          render={({ field }) => {
            return (
              <Switch
                //
                className="col-span-full"
                placeholder="اجاره شبانه"
                dir="ltr"
                {...field}
                isSelected={field.value}
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
                اجاره شبانه
              </Switch>
            );
          }}
        />
        <Controller
          control={form.control}
          name="annualRent"
          render={({ field }) => {
            return (
              <Switch
                //
                className="col-span-full"
                placeholder="اجاره سالانه"
                dir="ltr"
                {...field}
                isSelected={field.value}
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
                اجاره سالانه
              </Switch>
            );
          }}
        />
      </div>
    </>
  );
};

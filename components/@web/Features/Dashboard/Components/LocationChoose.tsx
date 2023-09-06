import useAxiosAuth from "@/hooks/useAxiosAuth";
import { usePokemonList } from "@/hooks/useGetList";
import { EstateFormData } from "@/types/formsData";
import { SelectDataType } from "@/types/interfaces";
import { Chip, Input, Select, SelectItem, Selection } from "@nextui-org/react";
import { useInfiniteScroll } from "@nextui-org/use-infinite-scroll";
import Mapir from "mapir-react-typescript";
import React from "react";
import { Key, useState, useEffect } from "react";
import { Control, Controller, FieldValues, UseFormReturn } from "react-hook-form";

const API_KEY =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImQ1NTg4YzVkM2I3YjFjYWU0NWE2OWNjZTM4ZjU3ZTdmN2U1Yjg4YTkxNWMwM2JhOTdiYWJlZWI4OWE2NDMxNDg1Nzc4YTYyNGQ0ZDMwMTc5In0.eyJhdWQiOiI5OTk2IiwianRpIjoiZDU1ODhjNWQzYjdiMWNhZTQ1YTY5Y2NlMzhmNTdlN2Y3ZTViODhhOTE1YzAzYmE5N2JhYmVlYjg5YTY0MzE0ODU3NzhhNjI0ZDRkMzAxNzkiLCJpYXQiOjE1OTQyMDM0MzMsIm5iZiI6MTU5NDIwMzQzMywiZXhwIjoxNTk2Nzk1NDMzLCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.RfZI-G-vJsKB8AaAXLtoR93ilorPnOWqEkGnap18EVEOoiWsFwuQaxSpNzYrzSbPeskmo68FdWvfrfcS0IaXvtU2rwI3D1udVrUlz5oDD_Z7NJMB-Dm9qY6mWC2OTsaTyTgNJ2ZC2q8ZK1aTdoEWUv27QrAsYEu_thQgTvSIPn0RoSFwMa-MHH6v7ATGTFY8MNdrazi2VdvTSR49REcssAn5iNjxFX7C9XLwltOA3VKTtCjY6MjkeVOhVrc2Bgo1QDukFTNSWGiEX0nSm1xKAs-OIXRKxvmmt9Sm6lcaT_2WbyPVn6Mo3aO7AjjhtxPjQZZk1PKtFwRH4r-JJdY2SA";
const Map = Mapir.setToken({
  accessToken: API_KEY,
  transformRequest: (url: string) => {
    return {
      url: url,
      headers: {
        "x-api-key": API_KEY,
        "Mapir-SDK": "reactjs",
      },
    };
  },
});

export const LocationChoose = ({ form }: { form: UseFormReturn<EstateFormData, any, undefined> }) => {
  const [province, setProvince] = useState<Selection>(new Set([]));
  const [center, setCenter] = useState([51.196246, 36.699735]);

  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form;

  const getAddress = (data: any) => {
    setValue("province", new Set([data.province]) as any);
    setValue("city", new Set([data.city || data.county]) as any);
    setValue("district", data.district);
    setValue("quarter", data.neighbourhood || data.primary);
    setValue("alley", data.last);
    setValue("address", data.address_compact);
    console.log("Address:", data);
  };

  return (
    <>
      <div className="relative flex flex-col gap-2">
        <Chip radius="sm" color="default" className={`h-12 w-full max-w-none text-right ${!!errors.location?.message ? "text-danger" : ""}`}>
          {/*  */}
          {!!errors.location?.message ? errors.location?.message : "برای ثبت موقعیت روی نقشه کلیک کنید تا نشانه گر ظاهر شود"}
        </Chip>
        <div className="relative h-[348px] overflow-hidden rounded-lg">
          <div className="absolute h-full w-full overflow-hidden rounded-lg">
            <Controller
              render={({ field }) => {
                async function setMarkerAndAddress(data: number[]) {
                  // if (loading || readOnly || disabled) return;
                  field.onChange([data[1], data[0]].join(","));
                  setCenter([data[0], data[1]]);

                  const url = `https://map.ir/reverse/no?lat=${data[1]}&lon=${data[0]}`;
                  const response = await fetch(url, {
                    headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
                  });
                  const _data = await response.json();
                  getAddress(_data);
                }

                // convert to array
                let value: number[] | null = null;
                if (!!field.value) {
                  const m = (field.value as string).split(",").map((v: string) => +v);
                  // (***)
                  value = [m[1], m[0]];
                }

                return (
                  <>
                    <Mapir
                      //
                      Map={Map}
                      center={center}
                      zoom={[16]}
                      className="!h-[348px] !w-full"
                      userLocation
                      onClick={(m: any, e: any) => setMarkerAndAddress([e.lngLat.lng, e.lngLat.lat])}
                      interactive
                      hash
                    >
                      {/* zoom */}
                      <Mapir.ZoomControl position="bottom-right" />
                      {/* marker */}
                      {!!value && (
                        <Mapir.Marker
                          //
                          coordinates={value}
                          anchor="bottom"
                          Image={"https://map.ir/css/images/marker-default-yellow.svg"}
                        />
                      )}
                    </Mapir>
                  </>
                );
              }}
              name="location"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "موقعیت باید انتخاب شود",
                },
              }}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <LocationProvince form={form} setProvince={setProvince} />
        <LocationCity form={form} province={province} />
        <Controller
          control={control}
          name="district"
          render={({ field }) => {
            return (
              <Input
                //
                className="col-span-1"
                type="text"
                variant="faded"
                label="منطقه"
                {...field}
                isRequired
                classNames={{ errorMessage: "text-right" }}
                errorMessage={errors.district?.message}
                validationState={!!errors.district?.message ? "invalid" : "valid"}
              />
            );
          }}
          rules={{
            required: {
              value: true,
              message: "منطقه الزامی است",
            },
          }}
        />
        <Controller
          control={control}
          name="quarter"
          render={({ field }) => {
            return (
              <Input
                //
                className="col-span-1"
                type="text"
                variant="faded"
                label="محله"
                {...field}
                isRequired
                classNames={{ errorMessage: "text-right" }}
                errorMessage={errors.quarter?.message}
                validationState={!!errors.quarter?.message ? "invalid" : "valid"}
              />
            );
          }}
          rules={{
            required: {
              value: true,
              message: "منطقه الزامی است",
            },
          }}
        />
        <Controller
          control={control}
          name="alley"
          render={({ field }) => {
            return (
              <Input
                //
                className="col-span-1"
                type="text"
                variant="faded"
                label="کوچه"
                {...field}
                classNames={{ errorMessage: "text-right" }}
                errorMessage={errors.alley?.message}
                validationState={!!errors.alley?.message ? "invalid" : "valid"}
              />
            );
          }}
        />
        <Controller
          control={control}
          name="address"
          render={({ field }) => {
            return (
              <Input
                //
                className="col-span-full"
                type="text"
                variant="faded"
                label="آدرس"
                {...field}
                classNames={{ errorMessage: "text-right" }}
                errorMessage={errors.address?.message}
                validationState={!!errors.address?.message ? "invalid" : "valid"}
              />
            );
          }}
        />
      </div>
    </>
  );
};

const LocationProvince = ({ form, setProvince }: { form: UseFormReturn<EstateFormData, any, undefined>; setProvince: any }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectDataType[]>([]);
  const api = useAxiosAuth();
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const data = await api.get("/static/province", {});
        const _items = data.data;
        if (Array.isArray(_items)) setData(_items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    get();
  }, []);

  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form;

  return (
    <Controller
      control={control}
      name="province"
      render={({ field }) => {
        return (
          <Select
            //
            isLoading={loading}
            items={[data[23], data[25], data[26]]}
            label="استان"
            placeholder="استان را انتخاب کنید"
            selectionMode="single"
            variant="faded"
            classNames={{ value: "text-right", errorMessage: "text-right", spinner: "right-auto left-3", selectorIcon: "left-3 right-auto" }}
            onSelectionChange={(v: Selection) => {
              setProvince(v);
              field.onChange(v);
            }}
            selectedKeys={field.value}
            {...field}
            isRequired
            errorMessage={errors.province?.message}
            validationState={!!errors.province?.message ? "invalid" : "valid"}
          >
            {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
          </Select>
        );
      }}
      rules={{
        required: {
          value: true,
          message: "استان الزامی است",
        },
        validate: {
          isValidProvince: (value) => {
            return ["مازندران", "گیلان", "گلستان"].includes(value || "") ? undefined : "تا اطلاع ثانوی فقط امکان ثبت استان های شمالی کشور مقدور می باشد";
          },
        },
      }}
    />
  );
};

const LocationCity = ({ form, province }: { form: UseFormReturn<EstateFormData, any, undefined>; province?: any }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectDataType[]>([]);

  const api = useAxiosAuth();
  useEffect(() => {
    const get = async () => {
      setLoading(true);
      try {
        const data = await api.get("/static/city", { params: { filter: { province: province?.currentKey } } });
        const _items = data.data;
        if (Array.isArray(_items)) setData(_items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    get();
  }, [province]);

  const {
    register,
    unregister,
    resetField,
    setValue,
    setError,
    control,
    handleSubmit,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating, isSubmitted, isSubmitSuccessful },
  } = form;

  return (
    <Controller
      control={control}
      name="city"
      render={({ field }) => {
        return (
          <Select
            //
            isLoading={loading}
            items={data}
            label="شهر"
            placeholder="شهر را انتخاب کنید"
            selectionMode="single"
            variant="faded"
            classNames={{ value: "text-right", errorMessage: "text-right", spinner: "right-auto left-3", selectorIcon: "left-3 right-auto" }}
            {...field}
            isRequired
            errorMessage={errors.city?.message}
            validationState={!!errors.city?.message ? "invalid" : "valid"}
          >
            {(item: SelectDataType) => <SelectItem key={item.value}>{item.title}</SelectItem>}
          </Select>
        );
      }}
      rules={{
        required: {
          value: true,
          message: "شهر الزامی است",
        },
      }}
    />
  );
};

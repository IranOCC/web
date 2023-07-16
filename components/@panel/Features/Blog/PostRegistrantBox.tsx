import { BlogPostFormData } from "@/types/formsData";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Select } from "@/components/@panel/Select";
import { AddEditComponentProps } from "../../EditAddPage";
import { Alert, AlertTitle } from "@mui/material";
import { Button } from "@/components/@panel/Button";
import moment from "jalali-moment";
import useAxiosAuth from "@/hooks/useAxiosAuth";

export default function BlogPostRegistrantBox({ form, loading, props }: AddEditComponentProps) {
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
  } = form as UseFormReturn<BlogPostFormData>;

  useEffect(() => {
    register("office", { required: "آفیس را مشخص کنید" });
  }, []);

  const [publishLoading, setPublishLoading] = useState(false);
  const { checkingData, detail } = props;

  const api = useAxiosAuth();
  const confirmPublish = async () => {
    setPublishLoading(true);
    try {
      await api.patch(`/admin/blog/post/confirm/${detail.ID}`);
      setPublishLoading(false);
      window.location.reload();
    } catch (error) {
      setPublishLoading(false);
    }
  };

  const rejectPublish = async () => {
    setPublishLoading(true);
    try {
      await api.patch(`/admin/blog/post/reject/${detail.ID}`);
      setPublishLoading(false);
      window.location.reload();
    } catch (error) {
      setPublishLoading(false);
    }
  };

  if (!checkingData) return null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 mb-4">
        {}
        {!!detail && (
          <>
            {detail?.isConfirmed && (
              <>
                <Alert severity="success" variant="filled">
                  <AlertTitle>تایید شده</AlertTitle>
                  <p>
                    {detail?.confirmedBy?.fullName} - {moment(detail?.confirmedAt).locale("fa").format("DD MMM YYYY HH:mm:ss")}
                  </p>
                </Alert>
                <Alert severity="warning" variant="filled">
                  <p>در صورت ویرایش نیاز به تایید مجدد مدیریت جهت انتشار خواهد بود</p>
                </Alert>
                {detail?.allowConfirm && (
                  <Button
                    //
                    title="لغو انتشار"
                    type="button"
                    loading={isSubmitting || isLoading || isValidating || publishLoading}
                    noSpace
                    variant="outline"
                    size="small"
                    onClick={rejectPublish}
                  />
                )}
              </>
            )}
            {!detail?.isConfirmed && (
              <>
                <Alert severity="warning" variant="filled">
                  <AlertTitle>تایید نشده</AlertTitle>
                  <p>پست هنوز تایید نشده است و تا زمانی که تایید نشود منتشر نخواهد شد</p>
                </Alert>
                {detail?.allowConfirm && (
                  <Button
                    //
                    title="تایید انتشار"
                    type="button"
                    loading={isSubmitting || isLoading || isValidating || publishLoading}
                    noSpace
                    size="small"
                    onClick={confirmPublish}
                  />
                )}
              </>
            )}
          </>
        )}
        {!detail && (
          <>
            <Alert severity="info" variant="filled">
              <AlertTitle>عدم انتشار قبل از تایید</AlertTitle>
              <p>این پست تا هنگامیکه توسط مدیر تایید نشود، منتشر نخواهد شد</p>
              <p>در صورتی که مدیر هستید، پس از انتشار می توانید آن را تایید کنید</p>
            </Alert>
          </>
        )}
        <hr />
        <Select
          //
          control={control}
          name="office"
          error={errors.office?.message}
          loading={isSubmitting}
          label="شعبه"
          placeholder="انتخاب کنید"
          apiPath="/tools/office/autoComplete"
          searchable
          noSpace
          defaultValue={checkingData?.office?.default}
          disabled={checkingData?.office?.disabled}
          containerClassName={!!checkingData?.office?.hidden ? "hidden" : ""}
          // onChange={(v) => setSelectedOffice(v)}
        />

        {/* {!!selectedOffice && (
          <>
            <Select
              //
              control={control}
              name="createdBy"
              error={errors.createdBy?.message}
              loading={isSubmitting}
              label="ایجاد کننده"
              placeholder="انتخاب کنید"
              apiPath={`/tools/office/${selectedOffice}/member/autoComplete`}
              searchable
              noSpace
              defaultValue={checkingData?.createdBy?.default}
              disabled={checkingData?.createdBy?.disabled}
              containerClassName={!!checkingData?.createdBy?.hidden ? "hidden" : ""}
            />
            <Select
              //
              control={control}
              name="confirmedBy"
              error={errors.confirmedBy?.message}
              loading={isSubmitting}
              label="تایید کننده"
              placeholder="انتخاب کنید"
              apiPath={`/tools/office/${selectedOffice}/member/autoComplete`}
              searchable
              noSpace
              defaultValue={checkingData?.confirmedBy?.default}
              disabled={checkingData?.confirmedBy?.disabled}
              containerClassName={!!checkingData?.confirmedBy?.hidden ? "hidden" : ""}
            />
          </>
        )} */}
      </div>
    </>
  );
}

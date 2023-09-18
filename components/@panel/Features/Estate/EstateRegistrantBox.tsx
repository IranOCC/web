import { CheckBox, Input } from "@/components/Input";
import { EstateFormData } from "@/types/formsData";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import PanelCard from "@/components/@panel/Card";
import { Select } from "@/components/Select";

import { AddEditComponentProps } from "../../EditAddPage";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { Alert, AlertTitle } from "@mui/material";
import moment from "jalali-moment";
import { Button } from "../../../Button";
import { ConfirmRejectModal } from "@/components/@web/Features/Estate/ConfirmRejectModal";

export default function EstateRegistrantBox({ form, loading, props }: AddEditComponentProps) {
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
  } = form as UseFormReturn<EstateFormData>;

  useEffect(() => {
    register("office", { required: "آفیس را مشخص کنید" });
  }, []);

  const [publishLoading, setPublishLoading] = useState(false);
  const { checkingData, detail } = props;

  const [confirmRejectModal, setConfirmRejectModal] = useState<{ id: string; type: "reject" | "confirm" }>();

  const confirmPublish = async () => {
    setConfirmRejectModal({ id: detail.ID, type: "confirm" });
  };

  const rejectPublish = async () => {
    setConfirmRejectModal({ id: detail.ID, type: "reject" });
  };

  if (!checkingData) return null;

  return (
    <>
      <div className="mb-4 grid grid-cols-1 gap-4">
        {!!detail && (
          <>
            {!detail?.isRejected && !detail?.isConfirmed && (
              <>
                <Alert severity="warning" variant="filled">
                  <AlertTitle>در انتظار بررسی</AlertTitle>
                </Alert>
                {checkingData?.allowConfirm && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        //
                        title="رد ملک"
                        type="button"
                        loading={isSubmitting || isLoading || isValidating || publishLoading}
                        noSpace
                        variant="outline"
                        size="small"
                        onClick={rejectPublish}
                      />
                      <Button
                        //
                        title="تایید و انتشار"
                        type="button"
                        loading={isSubmitting || isLoading || isValidating || publishLoading}
                        noSpace
                        variant="fill"
                        size="small"
                        onClick={confirmPublish}
                      />
                    </div>
                    <ConfirmRejectModal
                      //
                      id={confirmRejectModal?.id}
                      type={confirmRejectModal?.type}
                      isOpen={!!confirmRejectModal}
                      setClose={() => setConfirmRejectModal(undefined)}
                      update={() => window.location.reload()}
                    />
                  </>
                )}
              </>
            )}
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
                {checkingData?.allowConfirm && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        //
                        title="رد ملک"
                        type="button"
                        loading={isSubmitting || isLoading || isValidating || publishLoading}
                        noSpace
                        variant="outline"
                        size="small"
                        onClick={rejectPublish}
                      />
                      <Button
                        //
                        title="تایید و انتشار"
                        type="button"
                        loading={isSubmitting || isLoading || isValidating || publishLoading}
                        noSpace
                        variant="fill"
                        size="small"
                        onClick={confirmPublish}
                        disabled
                      />
                    </div>
                    <ConfirmRejectModal
                      //
                      id={confirmRejectModal?.id}
                      type={confirmRejectModal?.type}
                      isOpen={!!confirmRejectModal}
                      setClose={() => setConfirmRejectModal(undefined)}
                      update={() => window.location.reload()}
                    />
                  </>
                )}
              </>
            )}
            {detail?.isRejected && (
              <>
                <Alert severity="error" variant="filled">
                  <AlertTitle>رد شده</AlertTitle>
                  <p>
                    {detail?.rejectedBy?.fullName} - {moment(detail?.rejectedAt).locale("fa").format("DD MMM YYYY HH:mm:ss")}
                  </p>
                  <br />
                  <p>
                    <b>دلیل:</b> {detail?.rejectedReason}
                  </p>
                </Alert>
                <Alert severity="warning" variant="filled">
                  <p>پس از ویرایش و برطرف نمودن مشکل ملک به حالت در انتظار بررسی رفته و در صورت تایید مدیریت منتشر خواهد شد</p>
                </Alert>
                {checkingData?.allowConfirm && (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        //
                        title="رد ملک"
                        type="button"
                        loading={isSubmitting || isLoading || isValidating || publishLoading}
                        noSpace
                        variant="outline"
                        size="small"
                        onClick={rejectPublish}
                        disabled
                      />
                      <Button
                        //
                        title="تایید و انتشار"
                        type="button"
                        loading={isSubmitting || isLoading || isValidating || publishLoading}
                        noSpace
                        variant="fill"
                        size="small"
                        onClick={confirmPublish}
                      />
                    </div>
                    <ConfirmRejectModal
                      //
                      id={confirmRejectModal?.id}
                      type={confirmRejectModal?.type}
                      isOpen={!!confirmRejectModal}
                      setClose={() => setConfirmRejectModal(undefined)}
                      update={() => window.location.reload()}
                    />
                  </>
                )}
              </>
            )}
            <hr />
            ثبت شده توسط: {detail?.createdBy?.fullName}
            <br />
            زمان ایجاد: {moment(detail?.createdAt).locale("fa").format("DD MMM YYYY HH:mm:ss")}
            <br />
            آخرین ویرایش: {moment(detail?.updatedAt).locale("fa").format("DD MMM YYYY HH:mm:ss")}
          </>
        )}
        {!detail && (
          <>
            <Alert severity="info" variant="filled">
              <AlertTitle>عدم انتشار قبل از تایید</AlertTitle>
              <p>این فایل تا هنگامیکه توسط مدیر تایید نشود، منتشر نخواهد شد</p>
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
        />
      </div>
    </>
  );
}

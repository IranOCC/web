import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { RatingFormData } from "@/types/formsData";
import { Rating } from "@mui/material";
import { useContext, useState } from "react";

const RatingButton = ({ rate, userRate }: { rate?: number; userRate?: number }) => {
  const [score, setScore] = useState(rate);
  const [disabled, setDisabled] = useState(!!userRate);

  const { relatedTo, relatedToID } = useContext(WebPreviewContext) as WebPreviewContextType;

  const api = useAxiosAuth();
  const onSubmit = async (data: RatingFormData) => {
    if (!relatedTo || !relatedToID) return;
    data.relatedTo = relatedTo;
    data.relatedToID = relatedToID;
    try {
      const r = await api.post(`/rating`, data);
      toast.success("امتیاز شما ثبت شد");
      setDisabled(true);
      setScore(r.data.rate);
    } catch (error) {
      //
    }
  };

  return (
    <div className="flex items-center justify-center justify-self-center rounded-2xl bg-gray-100 p-1">
      <Rating
        //
        size="medium"
        readOnly={disabled}
        value={score}
        onChange={(e, value) => {
          if (!disabled && value !== null) onSubmit({ score: value });
        }}
      />
    </div>
  );
};

export default RatingButton;

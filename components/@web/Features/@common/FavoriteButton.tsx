import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { ReportFormData } from "@/types/formsData";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { Tooltip } from "antd";
import { useContext, useState } from "react";

const FavoriteButton = ({ isFav, size = 28 }: { isFav: boolean; size?: number }) => {
  const [isFavorite, setFavorite] = useState(isFav);
  const { relatedTo, relatedToID } = useContext(WebPreviewContext) as WebPreviewContextType;

  const api = useAxiosAuth();
  const onSubmit = async () => {
    try {
      if (isFavorite) {
        await api.post(`/estate/favorite/add/${relatedToID}`);
        toast.success("در لیست مورد علاقه ها قرار گرفت");
        setFavorite(true);
      } else {
        await api.post(`/estate/favorite/remove/${relatedToID}`);
        toast.success("از لیست حذف شد");
        setFavorite(false);
      }
    } catch (error) {
      //
    }
  };

  if (isFavorite) {
    return (
      <Tooltip title="حذف از لیست" placement="top" arrow={false}>
        <div
          //
          role="remove-from-favorites"
          onClick={onSubmit}
          className="flex h-fit w-fit cursor-pointer items-center justify-center justify-self-center text-red-500"
        >
          <Favorite style={{ fontSize: size }} />
        </div>
      </Tooltip>
    );
  }
  return (
    <Tooltip title="افزودن به لیست" placement="top" arrow={false}>
      <div
        //
        role="add-to-favorites"
        onClick={onSubmit}
        className="flex h-fit w-fit cursor-pointer items-center justify-center justify-self-center text-gray-500"
      >
        <FavoriteBorderOutlined style={{ fontSize: size }} />
      </div>
    </Tooltip>
  );
};

export default FavoriteButton;

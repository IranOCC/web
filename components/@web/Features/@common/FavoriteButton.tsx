import { CurrentUserContext, CurrentUserContextType } from "@/context/currentUser.context";
import { WebPreviewContext, WebPreviewContextType } from "@/context/webPreview.context";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import { toast } from "@/lib/toast";
import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { Tooltip } from "antd";
import { useContext, useState } from "react";

//

const FavoriteButton = ({ isFav, size = 28 }: { isFav: boolean; size?: number }) => {
  const [isFavorite, setFavorite] = useState(isFav);
  const { relatedTo, relatedToID } = useContext(WebPreviewContext) as WebPreviewContextType;
  const { showLoginModal, setShowLoginModal, isLogin } = useContext(CurrentUserContext) as CurrentUserContextType;

  const api = useAxiosAuth();
  const onSubmit = async () => {
    if (!isLogin) {
      setShowLoginModal(true);
      return;
    }
    try {
      if (isFavorite) {
        await api.delete(`/estate/favorite/${relatedToID}`);
        toast.success("از لیست حذف شد");
        setFavorite(false);
      } else {
        await api.post(`/estate/favorite/${relatedToID}`);
        toast.success("در لیست مورد علاقه ها قرار گرفت");
        setFavorite(true);
      }
    } catch (error) {
      //
    }
  };

  if (isFavorite) {
    return (
      <Tooltip title="حذف از علاقه مندی ها" placement="top" arrow={false}>
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
    <Tooltip title="افزودن به علاقه مندی ها" placement="top" arrow={false}>
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

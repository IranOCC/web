import { Favorite, FavoriteBorderOutlined } from "@mui/icons-material";
import { Tooltip } from "antd";

const FavoriteButton = ({ isFavorite, size = 28 }: { isFavorite: boolean; size?: number }) => {
  if (isFavorite) {
    return (
      <Tooltip title="حذف از لیست" placement="top" arrow={false}>
        <div
          role="remove-from-favorites"
          onClick={() => {
            //
          }}
          className="flex h-fit w-fit cursor-pointer items-center justify-center text-red-500"
        >
          <Favorite style={{ fontSize: size }} />
        </div>
      </Tooltip>
    );
  }
  return (
    <Tooltip title="افزودن به لیست" placement="top" arrow={false}>
      <div
        role="add-to-favorites"
        onClick={() => {
          //
        }}
        className="flex h-fit w-fit cursor-pointer items-center justify-center text-gray-500"
      >
        <FavoriteBorderOutlined style={{ fontSize: size }} />
      </div>
    </Tooltip>
  );
};

export default FavoriteButton;

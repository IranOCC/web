import { FavoriteBorderOutlined, Verified } from "@mui/icons-material";
import { Tooltip } from "antd";

const VerifiedButton = ({ isVerified, size = 28 }: { isVerified: boolean; size?: number }) => {
  if (isVerified) {
    return (
      <Tooltip title="تایید شده" placement="top" arrow={false}>
        <div
          role="verified"
          onClick={() => {
            //
          }}
          className="flex h-fit w-fit cursor-pointer items-center justify-center justify-self-center text-secondary"
        >
          <Verified style={{ fontSize: size }} />
        </div>
      </Tooltip>
    );
  }
  return (
    <Tooltip title="تایید نشده" placement="top" arrow={false}>
      <div
        role="not-verified"
        onClick={() => {
          //
        }}
        className="flex h-fit w-fit cursor-pointer items-center justify-center justify-self-center text-gray-400/70"
      >
        <Verified style={{ fontSize: size }} />
      </div>
    </Tooltip>
  );
};

export default VerifiedButton;

import { ShareOutlined } from "@mui/icons-material";
import { Tooltip } from "antd";

const ShareButton = ({ size = 28 }: { size?: number }) => {
  return (
    <Tooltip title="اشتراک گذاری" placement="top" arrow={false}>
      <div
        role="share"
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              url: location.href,
              title: document.title,
            });
          }
        }}
        className="flex cursor-pointer items-center justify-center text-gray-500"
      >
        <ShareOutlined style={{ fontSize: size }} />
      </div>
    </Tooltip>
  );
};

export default ShareButton;

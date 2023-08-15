import { ReportGmailerrorredOutlined } from "@mui/icons-material";
import { Tooltip } from "antd";

const ReportButton = ({ size = 28 }: { size?: number }) => {
  return (
    <Tooltip title="گزارش مشکل" placement="top" arrow={false}>
      <div
        role="report"
        onClick={() => {
          // if (navigator.share) {
          //   navigator.share({
          //     url: location.href,
          //     title: document.title,
          //   });
          // }
        }}
        className="flex h-fit w-fit cursor-pointer items-center justify-center text-gray-500"
      >
        <ReportGmailerrorredOutlined style={{ fontSize: size }} />
      </div>
    </Tooltip>
  );
};

export default ReportButton;

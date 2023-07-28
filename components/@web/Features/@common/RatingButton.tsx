import { Rating } from "@mui/material";

const RatingButton = ({ value, readOnly }: { value?: number; readOnly?: boolean }) => {
  return (
    <div className="flex items-center justify-center rounded-2xl bg-gray-100 p-1">
      <Rating
        //
        size="medium"
        readOnly={!!readOnly}
        value={value || 0}
        onChange={(e) => {}}
      />
    </div>
  );
};

export default RatingButton;

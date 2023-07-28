import { Rating } from "@mui/material";

const RatingButton = ({ value, readOnly }: { value?: number; readOnly?: boolean }) => {
  return (
    <Rating
      //
      size="medium"
      readOnly={!!readOnly}
      value={value || 0}
      onChange={(e) => {}}
    />
  );
};

export default RatingButton;

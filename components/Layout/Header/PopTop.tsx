import { Popper, Grow, Paper } from "@mui/material";

const PopTop = ({ children, isOpen, anchorRef }: any) => {
  return (
    <Popper open={isOpen} anchorEl={anchorRef.current} placement="bottom-end" transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin: "left top",
          }}
        >
          <Paper>
            <div className="z-10 bg-white border divide-gray-100 shadow-lg min-w-[240px] overflow-hidden">{children}</div>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default PopTop;

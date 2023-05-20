import { Tooltip } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip
    {...props}
    classes={{
      tooltip: className,
    }}
    followCursor={true}
    enterNextDelay={600}
  />
))(() => ({
  padding: "3px 16px",
  fontFamily: "Nunito",
  fontWeight: "400",
  fontSize: "16px",
  lineHeight: "26px",
  backgroundColor: "#000000DE",
}));

export default StyledTooltip;

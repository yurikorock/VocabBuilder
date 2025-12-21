import { Box, CircularProgress } from "@mui/material";

type ProgressBarProps = {
  value: number; // 0-100
  size?: number; // опційно
};

export default function ProgressBar({ value, size = 24 }: ProgressBarProps) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
      }}
    >
      {/* Background circle */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        sx={{
          color: " #d4f8d3",
        }}
      />

      {/* Progress circle */}
      <CircularProgress
        variant="determinate"
        value={value}
        size={size}
        sx={{
          position: "absolute",
          left: 0,
          color: "#2bd627",
        }}
      />
    </Box>
  );
}

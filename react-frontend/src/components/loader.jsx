import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Loader = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CircularProgress thickness={4} size={50} color="secondary" />
    </Box>
  );
};

export default Loader;

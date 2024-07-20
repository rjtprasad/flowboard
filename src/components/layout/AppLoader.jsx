import { Stack, CircularProgress } from "@mui/material";

const AppLoader = () => {
  return (
    <Stack alignItems='center' mt={10}>
      <CircularProgress />
    </Stack>
  );
};

export default AppLoader;

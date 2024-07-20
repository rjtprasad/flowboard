import { AppBar, Stack, Typography, Toolbar, IconButton } from "@mui/material";
import BackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { colors } from "../../theme";
import { memo } from "react";

const BoardTopbar = ({ name, color, lastUpdated, deleteBoard }) => {
  const navigate = useNavigate();

  return (
    <AppBar
      sx={{ borderBottom: "5px solid", borderColor: colors[color] }}
      position="static"
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Stack alignItems="center" direction={"row"} spacing={1}>
          <IconButton onClick={() => navigate(`/boards`)}>
            <BackIcon />
          </IconButton>
          <Typography variant="h6">{name}</Typography>
        </Stack>
        <Stack alignItems="center" direction={"row"} spacing={2}>
          <Typography
            display={{
              xs: "none",
              sm: "block",
            }}
            variant="body2"
          >
            Last updated: {lastUpdated}
          </Typography>
          <IconButton onClick={deleteBoard}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default memo(BoardTopbar);

import {
  AppBar,
  Stack,
  Toolbar,
  Button,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import ImageEl from "../../components/utils/ImageEl";
import LogoImg from "../../assets/logo.svg";
import LogoutIcon from "@mui/icons-material/ExitToApp";
import CreateBoardIcon from "@mui/icons-material/AddCircle";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

const TopBar = ({ openModal }) => {
  const isXs = useMediaQuery((theme) => theme.breakpoints.only("xs"));

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <ImageEl src={LogoImg} alt="Flowboard" sx={{ height: "25px" }} />
        <Stack direction={"row"} spacing={2}>
          {isXs ? (
            <>
              <IconButton onClick={openModal} color="primary">
                <CreateBoardIcon />
              </IconButton>
              <IconButton onClick={() => signOut(auth)}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <>
              <Button onClick={openModal} variant="contained">
                Create Board
              </Button>
              <Button
                startIcon={<LogoutIcon />}
                color="inherit"
                onClick={() => signOut(auth)}
              >
                Logout
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

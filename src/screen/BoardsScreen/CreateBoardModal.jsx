import { useState } from "react";
import {
  Stack,
  Typography,
  Box,
  Dialog,
  Button,
  TextField,
} from "@mui/material";
import ModalHeader from "../../components/layout/ModalHeader";
import { colors } from "../../theme";
import useApp from "../../hooks/useApp";
import useStore from "../../store";

const CreateBoardModal = ({ closeModal }) => {
  const { createBoard } = useApp();
  const [name, setName] = useState("");
  const [color, setColor] = useState(0);
  const [loading, setLoading] = useState(false);
  const { setToastr } = useStore();

  const handleCreate = async () => {
    const tName = name.trim();
    
    if (!tName) return setToastr("You need to enter board name");
    if (!/^[a-zA-Z0-9\s]{1,20}$/.test(tName)) {
      return setToastr(
        "Board name cannot contain special characters and should not be more than 20 chars"
      );
    }

    try {
      setLoading(true);
      await createBoard({ name, color });
      closeModal();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <Dialog open onClose={closeModal} fullWidth maxWidth="xs">
      <Stack p={2}>
        <ModalHeader onClose={closeModal} title="Create Board" />
        <Stack my={5} spacing={3}>
          <TextField
            label="Board Name"
            onChange={(e) => setName(e.target.value)}
          />
          <Stack spacing={1.5} direction="row">
            <Typography>Color: </Typography>

            {colors.map((clr, index) => (
              <Box
                sx={{
                  cursor: "pointer",
                  border: color === index ? "3px solid #383838" : "none",
                  outline: `2px solid ${clr}`,
                }}
                key={clr}
                height={25}
                width={25}
                backgroundColor={clr}
                borderRadius="50%"
                onClick={() => setColor(index)}
              />
            ))}
          </Stack>
        </Stack>
        <Button
          variant="contained"
          size="large"
          onClick={handleCreate}
          disabled={loading}
        >
          Create
        </Button>
      </Stack>
    </Dialog>
  );
};

export default CreateBoardModal;

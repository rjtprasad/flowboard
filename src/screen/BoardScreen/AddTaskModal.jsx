import { useState } from "react";
import {
  Stack,
  Dialog,
  Typography,
  Chip,
  OutlinedInput,
  Button,
} from "@mui/material";
import ModalHeader from "../../components/layout/ModalHeader";

const AddTaskModal = ({ tabName, onClose, addTask }) => {
  const [text, setText] = useState("");

  return (
    <Dialog open fullWidth maxWidth="xs" onClose={onClose}>
      <Stack p={2}>
        <Stack mb={3}>
          <ModalHeader title={"Add Task"} onClose={onClose} />
        </Stack>

        <Stack spacing={2}>
          <Stack spacing={1} direction="row" alignItems="center">
            <Typography>Status:</Typography>
            <Chip size="small" label={tabName} />
          </Stack>
          <OutlinedInput
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Task"
          />
          <Button
            onClick={() => addTask(text)}
            variant="contained"
          >
            Add Task
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddTaskModal;

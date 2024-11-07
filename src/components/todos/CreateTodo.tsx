import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  IconButton,
  Checkbox,
  FormControlLabel,
  Typography,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { BASE_URL, CREATE_TODO } from "../../utils/constant";
import { toast } from "react-toastify";

interface Todo {
  id?: string;
  title: string;
  status: string;
  description: string;
  completed: boolean;
}

interface CreateTodoProps {
  onClose: () => void;
  onTodoCreated: () => void;
  initialData?: Todo | null;
}

const CreateTodo: React.FC<CreateTodoProps> = ({
  onClose,
  onTodoCreated,
  initialData,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Not Started");
  const [completed, setCompleted] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
      setCompleted(initialData.completed);
    } else {
      setTitle("");
      setDescription("");
      setStatus("Not Started");
      setCompleted(false);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    const todoData = { title, description, status, completed };

    try {
      if (initialData) {
        await axios.put(
          `${BASE_URL}${CREATE_TODO}${initialData.id}/`,
          todoData,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        toast.success("Successfully Edited Todo");
      } else {
        await axios.post(`${BASE_URL}${CREATE_TODO}`, todoData, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        toast.success("Successfully Created Todo");
      }
      onTodoCreated();
    } catch (error) {
      console.error("Failed to create/edit todo:", error);
      toast.error(`Problem in ${initialData ? "Editing" : "Creation of"} Todo`);
    }
  };

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        position: "relative",
        mt: 2,
        width: isMobile ? "90%" : "80%",
        margin: isMobile ? "auto" : "2rem 0",
      }}
    >
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <Typography variant="h6" component="h2" gutterBottom>
        {initialData ? "Edit Todo" : "Create New Todo"}
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ mb: 2 }}
          variant="outlined"
        />
        <TextField
          fullWidth
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          sx={{ mb: 2 }}
          variant="outlined"
        />
        <TextField
          select
          fullWidth
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          sx={{ mb: 2 }}
          variant="outlined"
        >
          <MenuItem value="Not Started">Not Started</MenuItem>
          <MenuItem value="Working on It">Working on It</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
          <MenuItem value="Need Guidance">Need Guidance</MenuItem>
        </TextField>
        <FormControlLabel
          control={
            <Checkbox
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              color="primary"
            />
          }
          label="Completed"
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {initialData ? "Update" : "Create"} Todo
        </Button>
      </Box>
    </Paper>
  );
};

export default CreateTodo;

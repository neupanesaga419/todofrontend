import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Todo } from "../../types/todo";

interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onEdit, onDelete }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card sx={{ m: 2, boxShadow: "1px 2px 2px 2px grey" }}>
      <CardContent>
        <Typography variant={isMobile ? "subtitle1" : "h6"}>
          {todo.title}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 1.5 }}>
          {todo.status}
        </Typography>
        <Typography variant="body2">{todo.description}</Typography>
        <Typography variant="caption" color="text.secondary" display="block">
          {todo.completed ? "Completed" : "Incomplete"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<EditIcon />}
            onClick={() => onEdit(todo)}
            sx={{ mb: isMobile ? 1 : 0 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onDelete(todo)}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoCard;

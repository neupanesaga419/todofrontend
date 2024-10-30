import React from "react";
import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Todo } from "../../types/todo";
interface TodoCardProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, onEdit, onDelete }) => (
  <Card sx={{ m: 2, boxShadow: "1px 2px 2px 2px grey" }}>
    <CardContent>
      <Typography variant="h6">{todo.title}</Typography>
      <Typography color="text.secondary" sx={{ mb: 1.5 }}>
        {todo.status}
      </Typography>
      <Typography variant="body2">{todo.description}</Typography>
      <Typography variant="caption" color="text.secondary" display="block">
        {todo.completed ? "Completed" : "Incomplete"}
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<EditIcon />}
          onClick={() => onEdit(todo)}
        >
          Edit
        </Button>
        <Button variant="outlined" color="error" onClick={() => onDelete(todo)}>
          Delete
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default TodoCard;

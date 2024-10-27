import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Modal,
  CircularProgress,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { BASE_URL, CREATE_TODO } from "../utils/constant";
import CreateTodo from "../components/todos/CreateTodo";
import DeleteTodoModal from "../components/todos/DeleteTodoModal";
import { Navbar } from "../components/Navbar";

interface Todo {
  id: string;
  title: string;
  status: string;
  description: string;
  completed: boolean;
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "90vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface GroupedTodos {
  "Not Started": Todo[];
  "Working on It": Todo[];
  Completed: Todo[];
  "Need Guidance": Todo[];
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    const accessToken = localStorage.getItem("accessToken");
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}${CREATE_TODO}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDelete = (todo: Todo) => {
    setTodoToDelete(todo);
    setOpenDeleteModal(true);
  };
  const handleCloseDelete = () => {
    setTodoToDelete(null);
    setOpenDeleteModal(false);
  };
  const handleOpenEdit = (todo: Todo) => {
    setTodoToEdit(todo);
    setOpenCreateModal(true);
  };

  const handleTodoAction = (todo: Todo | null) => {
    if (todo) {
      setTodoToEdit(todo);
    } else {
      setTodoToEdit(null);
    }
    setOpenCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setOpenCreateModal(false);
    setTodoToEdit(null);
  };

  const handleTodoCreatedOrEdited = () => {
    handleCloseCreateModal();
    fetchTodos();
  };

  const handleDelete = async () => {
    if (todoToDelete) {
      const accessToken = localStorage.getItem("accessToken");
      try {
        await axios.delete(`${BASE_URL}${CREATE_TODO}${todoToDelete.id}/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        fetchTodos();
      } catch (error) {
        console.error("Failed to delete todo:", error);
      } finally {
        handleCloseDelete();
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const groupedTodos: GroupedTodos = {
    "Not Started": todos.filter((todo) => todo.status === "Not Started"),
    "Working on It": todos.filter((todo) => todo.status === "Working on It"),
    "Need Guidance": todos.filter((todo) => todo.status === "Need Guidance"),
    Completed: todos.filter((todo) => todo.status === "Completed"),
  };

  const getBorderColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "green";
      case "Not Started":
        return "red";
      case "Working on It":
        return "skyblue";
      case "Need Guidance":
        return "yellow";
      default:
        return "#ccc";
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Navbar />
      <ToastContainer />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box sx={{}}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleTodoAction(null)}
            sx={{
              position: "fixed",
              bottom: 16,
              right: 16,
              zIndex: 1000,
              minWidth: 120,
              borderRadius: 1,
              textTransform: "none",
              padding: "8px 16px",
              backgroundColor: "#1976d2",
              "&:hover": {
                backgroundColor: "#115293",
              },
            }}
          >
            Add Todo
          </Button>
        </Box>

        <Box sx={{ flexGrow: 1, overflow: "auto", padding: "1% 2%" }}>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 2 }}>
              {Object.keys(groupedTodos).map((status) => (
                <Box
                  key={status}
                  className="scrollable"
                  sx={{
                    flex: 1,
                    minWidth: 200,
                    border: `2px solid ${getBorderColor(status)}`,
                    boxShadow: "1px 1px 1px 1px #ccc",
                    borderRadius: 1,
                    maxHeight: "100%",
                    overflowY: "auto",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textAlign: "center",
                      mb: 1,
                      position: "sticky",
                      top: 0,
                      backgroundColor: `${getBorderColor(status)}}`,
                      zIndex: 1,
                    }}
                  >
                    {status}
                  </Typography>

                  {groupedTodos[status as keyof GroupedTodos].length === 0 ? (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                    >
                      No todos
                    </Typography>
                  ) : (
                    groupedTodos[status as keyof GroupedTodos].map((todo) => (
                      <Card
                        key={todo.id}
                        sx={{ m: 2, boxShadow: "1px 2px 2px 2px grey" }}
                      >
                        <CardContent>
                          <Typography variant="h6">{todo.title}</Typography>
                          <Typography color="text.secondary" sx={{ mb: 1.5 }}>
                            {todo.status}
                          </Typography>
                          <Typography variant="body2">
                            {todo.description}
                          </Typography>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                          >
                            {todo.completed ? "Completed" : "Incomplete"}
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              mt: 2,
                            }}
                          >
                            <Button
                              variant="outlined"
                              color="primary"
                              startIcon={<EditIcon />}
                              onClick={() => handleOpenEdit(todo)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => handleOpenDelete(todo)}
                            >
                              Delete
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Modal open={openCreateModal} onClose={handleCloseCreateModal}>
          <Box sx={modalStyle}>
            <Typography variant="h6" component="h2" gutterBottom>
              {todoToEdit ? "Edit Todo" : "Create Todo"}
            </Typography>
            <CreateTodo
              open={openCreateModal}
              onClose={handleCloseCreateModal}
              onTodoCreated={handleTodoCreatedOrEdited}
              initialData={todoToEdit}
            />
          </Box>
        </Modal>

        <DeleteTodoModal
          open={openDeleteModal}
          onClose={handleCloseDelete}
          onConfirm={handleDelete}
          todoTitle={todoToDelete ? todoToDelete.title : ""}
        />
      </Box>
    </Box>
  );
};

export default TodoList;

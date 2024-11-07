import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddIcon from "@mui/icons-material/Add";

import axios from "axios";
import { BASE_URL, CREATE_TODO } from "../utils/constant";
import CreateTodo from "../components/todos/CreateTodo";
import DeleteTodoModal from "../components/todos/DeleteTodoModal";
import { Navbar } from "../components/Navbar";
import { useTodos } from "../hooks/useTodos";
import { Todo } from "../types/todo";
import TodoCard from "../components/todos/TodoCard";

const modalStyle = (isMobile: boolean) => ({
  position: isMobile ? "absolute" : "fixed",
  top: "50%",
  left: isMobile ? "49%" : "50%",
  transform: "translate(-50%, -50%)",
  width: isMobile ? "90%" : "100%",
  maxHeight: "90vh",
  overflowY: isMobile ? "auto" : "hidden",

  p: isMobile ? 2 : 0,
});

interface GroupedTodos {
  "Not Started": Todo[];
  "Working on It": Todo[];
  Completed: Todo[];
  "Need Guidance": Todo[];
}

const TodoList: React.FC = () => {
  const { todos, loading, fetchTodos } = useTodos();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
              bottom: isMobile ? 20 : 80,
              right: isMobile ? 20 : 50,
              zIndex: 1000,
              minWidth: 120,
              borderRadius: 1,
              textTransform: "none",
              padding: "8px 16px",
              backgroundColor: "#1976d2",
              boxShadow: "3px 4px 18px 7px rgba(0, 0, 0, 0.7)",
              "&:hover": {
                backgroundColor: "#115293",
                boxShadow: "0px 6px 25px rgba(0, 0, 0, 0.35)",
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
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 2,
              }}
            >
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
                      fontWeight: 600,
                      fontFamily: "Poppins",
                      padding: "10px",
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
                      <TodoCard
                        key={todo?.id}
                        todo={todo}
                        onEdit={handleOpenEdit}
                        onDelete={handleOpenDelete}
                      />
                    ))
                  )}
                </Box>
              ))}
            </Box>
          )}
        </Box>

        <Modal open={openCreateModal} onClose={handleCloseCreateModal}>
          <Box
            sx={modalStyle(isMobile)}
            maxWidth={isMobile ? "90%" : "40%"}
            margin={isMobile ? "auto" : "initial"}
          >
            <CreateTodo
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

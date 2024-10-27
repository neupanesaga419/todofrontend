// DeleteTodoModal.tsx
import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";

interface DeleteTodoModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  todoTitle: string; 
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const DeleteTodoModal: React.FC<DeleteTodoModalProps> = ({
  open,
  onClose,
  onConfirm,
  todoTitle,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" gutterBottom>
          Confirm Deletion
        </Typography>
        <Typography variant="body1">
          Are you sure you want to delete "{todoTitle}"?
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteTodoModal;

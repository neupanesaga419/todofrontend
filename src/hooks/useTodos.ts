import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL, CREATE_TODO } from "../utils/constant";
import { Todo } from "../types/todo";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchTodos();
  }, []);

  return { todos, loading, fetchTodos };
}; 
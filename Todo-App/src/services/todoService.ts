import api from "./api";
import { Todo, CreateTodoDto, UpdateTodoDto } from "../types/todo";

export const todoService = {
  getUserTodos: async (): Promise<Todo[]> => {
    const response = await api.get<Todo[]>("/todo");
    return response.data;
  },

  getTodoById: async (id: string): Promise<Todo> => {
    const response = await api.get<Todo>(`/todo/${id}`);
    return response.data;
  },

  createTodo: async (todoData: CreateTodoDto): Promise<Todo> => {
    const response = await api.post<Todo>("/todo", todoData);
    return response.data;
  },

  updateTodo: async (id: string, todoData: UpdateTodoDto): Promise<Todo> => {
    const response = await api.patch<Todo>(`/todo/${id}`, todoData);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await api.delete(`/todo/${id}`);
  },
};

export default todoService;

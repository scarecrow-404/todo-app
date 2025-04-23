import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../../types/todo";
import todoService from "../../services/todoService";
import useAuth from "../../hooks/useAuth";
import Link from "next/link";

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTodos = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await todoService.getUserTodos();
      setTodos(data);
    } catch (err) {
      setError("Failed to fetch todos");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo");
      console.error(err);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      await todoService.updateTodo(id, { completed });
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, completed } : todo))
      );
    } catch (err) {
      setError("Failed to update todo");
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading todos...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        {error}
        <button onClick={fetchTodos} className="ml-2 underline">
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Todos</h2>
        <Link
          href="/todos/create"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Create Todo
        </Link>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No todos found. Create your first todo!
        </div>
      ) : (
        <div>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;

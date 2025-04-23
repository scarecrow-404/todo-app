import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Todo, CreateTodoDto, UpdateTodoDto } from "../../types/todo";
import todoService from "../../services/todoService";

interface TodoFormProps {
  todoId?: string;
}

type FormInputs = {
  title: string;
  description: string;
  completed: boolean;
};

const TodoForm: React.FC<TodoFormProps> = ({ todoId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoading, setInitialLoading] = useState(!!todoId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    const fetchTodo = async () => {
      if (!todoId) return;

      try {
        const todo = await todoService.getTodoById(todoId);
        reset({
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
        });
      } catch (err) {
        setError("Failed to fetch todo");
        console.error(err);
      } finally {
        setInitialLoading(false);
      }
    };

    if (todoId) {
      fetchTodo();
    }
  }, [todoId, reset]);

  const onSubmit = async (data: FormInputs) => {
    setLoading(true);
    setError(null);

    try {
      if (todoId) {
        await todoService.updateTodo(todoId, data as UpdateTodoDto);
      } else {
        await todoService.createTodo(data as CreateTodoDto);
      }
      router.push("/todos");
    } catch (err) {
      setError(todoId ? "Failed to update todo" : "Failed to create todo");
      console.error(err);
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="text-center py-10">Loading todo...</div>;
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {todoId ? "Edit Todo" : "Create Todo"}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className={`w-full px-3 py-2 border rounded-lg ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            className={`w-full px-3 py-2 border rounded-lg ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
            rows={4}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-xs mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {todoId && (
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 h-5 w-5"
                {...register("completed")}
              />
              <span className="text-gray-700">Mark as completed</span>
            </label>
          </div>
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? "Saving..." : todoId ? "Update Todo" : "Create Todo"}
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
            onClick={() => router.push("/todos")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;

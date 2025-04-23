import React from "react";
import { Todo } from "../../types/todo";
import Link from "next/link";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string, completed: boolean) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onDelete,
  onToggleComplete,
}) => {
  return (
    <div className="border rounded-lg p-4 mb-3 bg-white shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id, !todo.completed)}
            className="mr-3 h-5 w-5 text-blue-500"
          />
          <div>
            <h3
              className={`font-medium ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.title}
            </h3>
            <p
              className={`text-sm text-gray-600 ${
                todo.completed ? "line-through" : ""
              }`}
            >
              {todo.description}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Created: {new Date(todo.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link
            href={`/todos/${todo.id}/edit`}
            className="px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(todo.id)}
            className="px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;

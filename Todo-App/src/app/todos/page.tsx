"use client";

import React from "react";
import TodoList from "../../components/todos/TodoList";
import withAuth from "../../utils/protectedRoute";
import useAuth from "../../hooks/useAuth";

function TodosPage() {
  const { user, logout } = useAuth();

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Your Todos</h1>
          {user && (
            <p className="text-gray-600">Logged in as {user.username}</p>
          )}
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Logout
        </button>
      </div>
      <TodoList />
    </div>
  );
}

export default withAuth(TodosPage);

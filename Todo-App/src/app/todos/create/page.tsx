"use client";

import React from "react";
import TodoForm from "../../../components/todos/TodoForm";
import withAuth from "../../../utils/protectedRoute";

function CreateTodoPage() {
  return <TodoForm />;
}

export default withAuth(CreateTodoPage);

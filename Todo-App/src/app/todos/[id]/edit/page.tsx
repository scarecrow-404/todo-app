"use client";

import React from "react";
import TodoForm from "../../../../components/todos/TodoForm";
import withAuth from "../../../../utils/protectedRoute";

interface EditTodoPageProps {
  params: {
    id: string;
  };
}

function EditTodoPage({ params }: EditTodoPageProps) {
  return <TodoForm todoId={params.id} />;
}

export default withAuth(EditTodoPage);

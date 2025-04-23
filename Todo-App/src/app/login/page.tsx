"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../../components/auth/LoginForm";
import useAuth from "../../hooks/useAuth";

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/todos");
    }
  }, [isAuthenticated, isLoading, router]);

  return <LoginForm />;
}

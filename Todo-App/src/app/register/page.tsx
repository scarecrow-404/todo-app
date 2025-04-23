"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import RegisterForm from "../../components/auth/RegisterForm";
import useAuth from "../../hooks/useAuth";

export default function Register() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/todos");
    }
  }, [isAuthenticated, isLoading, router]);

  return <RegisterForm />;
}

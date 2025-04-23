"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace("/todos");
      } else {
        router.replace("/login");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-4">Welcome to Todo App</h2>
        <p>Redirecting you...</p>
      </div>
    </div>
  );
}

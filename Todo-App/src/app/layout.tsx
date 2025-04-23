import { Inter } from "next/font/google";
import { AuthProvider } from "../contexts/AuthContext";
import "./globals.css";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "A simple todo application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
              <div className="max-w-4xl mx-auto p-4">
                <h1 className="text-2xl font-bold text-blue-600">Todo App</h1>
              </div>
            </header>
            <main className="max-w-4xl mx-auto p-4">{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}

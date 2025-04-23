"use client";
import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { User, AuthState } from "../types/auth";
import authService from "../services/authService";
import { useRouter } from "next/navigation";
import cookies from "../utils/cookies";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

type AuthAction =
  | { type: "LOGIN_REQUEST" }
  | { type: "LOGIN_SUCCESS"; payload: { user: User; token: string } }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "REGISTER_REQUEST" }
  | { type: "REGISTER_SUCCESS"; payload: { user: User; token: string } }
  | { type: "REGISTER_FAILURE"; payload: string }
  | { type: "LOGOUT" }
  | { type: "INIT_AUTH"; payload: { token: string | null } };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_REQUEST":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        token: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case "INIT_AUTH":
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: !!action.payload.token,
        isLoading: false,
      };
    default:
      return state;
  }
};

export const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const initAuth = () => {
      const { token } = authService.getCurrentUser();
      dispatch({ type: "INIT_AUTH", payload: { token } });
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_REQUEST" });
    try {
      const data = await authService.login({ email, password });
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: data.user, token: data.access_token },
      });
      router.push("/todos");
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error instanceof Error ? error.message : "Login failed",
      });
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    dispatch({ type: "REGISTER_REQUEST" });
    try {
      const data = await authService.register({ username, email, password });
      dispatch({
        type: "REGISTER_SUCCESS",
        payload: { user: data.user, token: data.access_token },
      });
      router.push("/todos");
    } catch (error) {
      dispatch({
        type: "REGISTER_FAILURE",
        payload: error instanceof Error ? error.message : "Registration failed",
      });
    }
  };

  const logout = () => {
    authService.logout();
    dispatch({ type: "LOGOUT" });
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

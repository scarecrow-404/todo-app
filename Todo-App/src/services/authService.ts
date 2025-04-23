import api from "./api";
import {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "../types/auth";
import cookies from "../utils/cookies";

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials);
    cookies.setToken(response.data.access_token);
    return response.data;
  },

  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/users", credentials);
    cookies.setToken(response.data.access_token);
    return response.data;
  },

  logout: (): void => {
    cookies.removeToken();
  },

  getCurrentUser: (): { token: string | null } => {
    const token = cookies.getToken() || null;
    return { token };
  },
};

export default authService;

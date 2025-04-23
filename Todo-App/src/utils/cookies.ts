import Cookies from "js-cookie";

const TOKEN_EXPIRE = 7;

export const cookieOptions = {
  expires: TOKEN_EXPIRE,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

export const cookies = {
  setToken: (token: string): void => {
    Cookies.set("auth_token", token, cookieOptions);
  },

  getToken: (): string | undefined => {
    return Cookies.get("auth_token");
  },

  removeToken: (): void => {
    Cookies.remove("auth_token", { path: "/" });
  },
};

export default cookies;

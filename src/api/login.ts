import request from "@/lib/request.ts";

interface LoginForm {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

export const login = (loginForm: LoginForm) =>
  request.post<never, LoginResponse>("/user/login", loginForm);

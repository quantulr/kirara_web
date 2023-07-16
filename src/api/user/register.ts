import request from "@/lib/request";

interface RegisterForm {
  username: string;
  password: string;
}

interface RegisterResponse {
  message: string;
}

export const register = (registerForm: RegisterForm) =>
  request.post<never, RegisterResponse>("/user/register", registerForm);

import { api } from "@/api/axiosConfig";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await api.post("/register/", { name, email, password });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await api.post("/token/", { email, password });
  return response.data;
};

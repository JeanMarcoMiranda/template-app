import { api } from "@/api/axiosConfig";
import { Department } from "@/types";

export const fetchDepartments = async (): Promise<Department[]> => {
  try {
    const response = await api.get<Department[]>("/departments/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch departments", error);
    throw new Error("Failed to fetch departments");
  }
};

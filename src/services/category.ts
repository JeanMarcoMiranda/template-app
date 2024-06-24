// categoryService.ts
import { api } from "@/api/axiosConfig";
import { Category, AxiosErrorResponse } from "@/types";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<Category[]>("/categories/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
    throw new Error("Failed to fetch categories");
  }
};

export const createCategory = async (category: Category): Promise<Category> => {
  try {
    const response = await api.post<Category>("/categories/", category);
    return response.data;
  } catch (error) {
    if ((error as AxiosErrorResponse).response && (error as AxiosErrorResponse).response.data) {
      const fieldErrors = (error as AxiosErrorResponse).response.data;
      const errorMessage = Object.keys(fieldErrors)
        .map(key => `${key}: ${fieldErrors[key][0]}`)
        .join(', ');
      throw new Error(errorMessage);
    }
    console.error("Failed to create category", error);
    throw new Error("Failed to create category");
  }
};

export const updateCategory = async (
  id: number,
  category: Category
): Promise<Category> => {
  try {
    const response = await api.put<Category>(`/categories/${id}/`, category);
    return response.data;
  } catch (error) {
    if ((error as AxiosErrorResponse).response && (error as AxiosErrorResponse).response.data) {
      const fieldErrors = (error as AxiosErrorResponse).response.data;
      const errorMessage = Object.keys(fieldErrors)
        .map(key => `${key}: ${fieldErrors[key][0]}`)
        .join(', ');
      throw new Error(errorMessage);
    }
    console.error("Failed to update category", error);
    throw new Error("Failed to update category");
  }
};
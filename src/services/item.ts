import { api } from "@/api/axiosConfig";
import { Item } from "@/types";
import { AxiosErrorResponse } from "@/types";

export const fetchItems = async (): Promise<Item[]> => {
  try {
    const response = await api.get<Item[]>("/items/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch items", error);
    throw new Error("Failed to fetch items");
  }
};

export const createItem = async (item: Item): Promise<Item> => {
  try {
    const response = await api.post<Item>("/items/", item);
    return response.data;
  } catch (error) {
    if ((error as AxiosErrorResponse).response && (error as AxiosErrorResponse).response.data) {
      const fieldErrors = (error as AxiosErrorResponse).response.data;
      const errorMessage = Object.keys(fieldErrors)
        .map(key => `${key}: ${fieldErrors[key][0]}`)
        .join(', ');
      throw new Error(errorMessage);
    }
    console.error("Failed to create item", error);
    throw new Error("Failed to create item");
  }
};

export const updateItem = async (id: number, item: Item): Promise<Item> => {
  try {
    const response = await api.put<Item>(`/items/${id}/`, item);
    return response.data;
  } catch (error) {
    if ((error as AxiosErrorResponse).response && (error as AxiosErrorResponse).response.data) {
      const fieldErrors = (error as AxiosErrorResponse).response.data;
      const errorMessage = Object.keys(fieldErrors)
        .map(key => `${key}: ${fieldErrors[key][0]}`)
        .join(', ');
      throw new Error(errorMessage);
    }
    console.error("Failed to update item", error);
    throw new Error("Failed to update item");
  }
};

import { api } from "@/api/axiosConfig";
import { Company } from "@/types";
import { AxiosErrorResponse } from "@/types"; // Importa el tipo de error

export const fetchCompanies = async (): Promise<Company[]> => {
  try {
    const response = await api.get<Company[]>("/companies/");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch companies", error);
    throw new Error("Failed to fetch companies");
  }
};

export const createCompany = async (company: Company): Promise<Company> => {
  try {
    const response = await api.post<Company>("/companies/", company);
    return response.data;
  } catch (error) {
    if ((error as AxiosErrorResponse).response && (error as AxiosErrorResponse).response.data) {
      const fieldErrors = (error as AxiosErrorResponse).response.data;
      const errorMessage = Object.keys(fieldErrors)
        .map(key => `${key}: ${fieldErrors[key][0]}`)
        .join(', ');
      throw new Error(errorMessage);
    }
    console.error("Failed to create company", error);
    throw new Error("Failed to create company");
  }
};

export const updateCompany = async (
  id: number,
  company: Company
): Promise<Company> => {
  try {
    const response = await api.put<Company>(`/companies/${id}/`, company);
    return response.data;
  } catch (error) {
    if ((error as AxiosErrorResponse).response && (error as AxiosErrorResponse).response.data) {
      const fieldErrors = (error as AxiosErrorResponse).response.data;
      const errorMessage = Object.keys(fieldErrors)
        .map(key => `${key}: ${fieldErrors[key][0]}`)
        .join(', ');
      throw new Error(errorMessage);
    }
    console.error("Failed to update company", error);
    throw new Error("Failed to update company");
  }
};

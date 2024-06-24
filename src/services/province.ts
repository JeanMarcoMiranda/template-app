import { api } from "@/api/axiosConfig";
import { Province } from "@/types";

export const fetchProvinces = async (
  departmentId: number
): Promise<Province[]> => {
  try {
    const response = await api.get<Province[]>(
      `/provinces/?department_id=${departmentId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch provinces", error);
    throw new Error("Failed to fetch provinces");
  }
};

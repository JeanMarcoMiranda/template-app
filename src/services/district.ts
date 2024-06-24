import { api } from "@/api/axiosConfig";
import { District } from "@/types";

export const fetchDistricts = async (
  provinceId: number
): Promise<District[]> => {
  try {
    const response = await api.get<District[]>(
      `/districts/?province_id=${provinceId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch districts", error);
    throw new Error("Failed to fetch districts");
  }
};

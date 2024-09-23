import axios from "axios";
import { ProductNutrition100g } from "@/types";

export const createNutrition100g = async (nutritionData: ProductNutrition100g): Promise<ProductNutrition100g> => {
  try {
    const response = await axios.post("/api/nutrition-100g", nutritionData);
    return response.data;
  } catch (error) {
    console.error("Error creating nutrition 100g:", error);
    throw new Error("100g 영양 성분을 생성하는 중 오류가 발생했습니다.");
  }
};

export const updateNutrition100g = async (params: ProductNutrition100g): Promise<ProductNutrition100g> => {
  try {
    const response = await axios.patch("/api/product-nutrition-100gs", params);
    return response.data;
  } catch (error) {
    console.error("Error updating nutrition 100g:", error);
    throw new Error("100g 영양 성분을 업데이트하는 중 오류가 발생했습니다.");
  }
};

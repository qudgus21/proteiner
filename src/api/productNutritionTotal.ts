import axios from "axios";
import { ProductNutritionTotal } from "@/types";

export const createNutritionTotal = async (nutritionData: ProductNutritionTotal): Promise<ProductNutritionTotal> => {
  try {
    const response = await axios.post("/api/product/nutrition-totals", nutritionData);
    return response.data;
  } catch (error) {
    console.error("Error creating nutrition total:", error);
    throw new Error("영양 성분을 생성하는 중 오류가 발생했습니다.");
  }
};

export const updateNutritionTotal = async (params: ProductNutritionTotal): Promise<ProductNutritionTotal> => {
  try {
    const response = await axios.patch("/api/product-nutrition-totals", params);
    return response.data;
  } catch (error) {
    console.error("Error updating nutrition total:", error);
    throw new Error("영양 성분을 업데이트하는 중 오류가 발생했습니다.");
  }
};

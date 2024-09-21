import axios from "axios";
import { ProductTypeWithOptionalChildren } from "@/types";

export const fetchProductTypes = async (): Promise<ProductTypeWithOptionalChildren[]> => {
  try {
    const response = await axios.get("/api/product-types");
    return response.data;
  } catch (error) {
    console.error("Error fetching product types:", error);
    throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
  }
};

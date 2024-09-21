import { Product } from "@/types";

import axios from "axios";

export const fetchProducts = async (params?: URLSearchParams): Promise<Product[]> => {
  try {
    const response = await axios.get("/api/products", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
  }
};

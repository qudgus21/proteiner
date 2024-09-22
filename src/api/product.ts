import { Product, ProductCreate } from "@/types";

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

export const createProduct = async (productData: ProductCreate): Promise<Product> => {
  try {
    const response = await axios.post("/api/products", productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("상품을 생성하는 중 오류가 발생했습니다.");
  }
};

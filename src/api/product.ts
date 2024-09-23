import { Product, ProductCreate, ProductIncludeNutrition, ProductUpdate } from "@/types";

import axios from "axios";

export const getProduct = async (id: string): Promise<ProductIncludeNutrition> => {
  try {
    const response = await axios.get("/api/products", { params: { id } });
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("상품을 가져오는 중 오류가 발생했습니다.");
  }
};

export const getProducts = async (params?: URLSearchParams): Promise<Product[]> => {
  try {
    const response = await axios.get("/api/products", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("상품 리스트를 가져오는 중 오류가 발생했습니다.");
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

export const updateProduct = async (params: ProductUpdate): Promise<Product> => {
  try {
    const response = await axios.patch("/api/products", params);
    return response.data;
  } catch (error) {
    console.error("Error updating nutrition 100g:", error);
    throw new Error("상품을 업데이트 중 오류가 발생했습니다.");
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await axios.delete("/api/products", { params: { id } });
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("상품 삭제 중 오류가 발생했습니다.");
  }
};

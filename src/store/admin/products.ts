// src/store/admin/product.ts

import { create } from "zustand";
import axios from "axios";

// 상태 정의
type Product = {
  id: string;
  name: string;
  price: number;
  pricePer100g?: number;
  productUrl: string;
  affiliateUrl: string;
  imageUrl: string;
};

type ProductStore = {
  products: Product[];
  fetchProducts: (filters?: { [key: string]: any }) => Promise<void>;
};

// Zustand store 생성
export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  fetchProducts: async (filters = {}) => {
    try {
      const response = await axios.get("/api/products", { params: filters });
      set({ products: response.data });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
}));

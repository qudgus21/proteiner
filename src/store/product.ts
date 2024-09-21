import { create } from "zustand";
import { Product } from "@/types";
import { fetchProducts } from "@/api";

interface ProductStoreState {
  products: Product[];
  fetchProducts: (params?: URLSearchParams) => void;
}

const useProductStore = create<ProductStoreState>((set) => ({
  products: [],
  fetchProducts: async (params?: URLSearchParams) => {
    try {
      const products = await fetchProducts(params);
      set({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
}));

export default useProductStore;

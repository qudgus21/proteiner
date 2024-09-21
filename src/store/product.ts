import { create } from "zustand";
import { Product } from "@/types/product";
import { fetchProducts } from "@/api/product";

const useProductStore = create<{
  products: Product[];
  fetchProducts: (params?: URLSearchParams) => void;
}>((set) => ({
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

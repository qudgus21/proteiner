import { create } from "zustand";
import { Product, ProductSite, ProductType, ProductTypeWithOptionalChildren } from "@/types";
import { fetchProducts, fetchProductSites, fetchProductTypes } from "@/api";

interface ProductStoreState {
  products: Product[];
  productSites: ProductSite[];
  productTypes: ProductTypeWithOptionalChildren[];
  fetchProducts: (params?: URLSearchParams) => void;
  fetchProductSites: () => void;
  fetchProductTypes: () => void;
  initialize: () => Promise<void>;
}

const useProductStore = create<ProductStoreState>((set) => ({
  products: [],
  productSites: [],
  productTypes: [],
  fetchProducts: async (params?: URLSearchParams) => {
    try {
      const products = await fetchProducts(params);
      set({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  fetchProductSites: async () => {
    try {
      const productSites = await fetchProductSites();
      set({ productSites });
    } catch (error) {
      console.error("Error fetching product sites:", error);
    }
  },
  fetchProductTypes: async () => {
    try {
      const productTypes = await fetchProductTypes();
      set({ productTypes });
    } catch (error) {
      console.error("Error fetching product types:", error);
    }
  },
  initialize: async () => {
    try {
      const [productSites, productTypes] = await Promise.all([fetchProductSites(), fetchProductTypes()]);
      set({ productSites, productTypes });
    } catch (error) {
      console.error("Error during initialization:", error);
    }
  },
}));

export default useProductStore;

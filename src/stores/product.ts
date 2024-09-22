import { create } from "zustand";
import { Product, ProductSite, ProductTypeWithChildren, ProductTypeWithOptionalChildren } from "@/types";
import { fetchProducts, fetchProductSites, fetchProductTypes } from "@/api";

interface ProductStoreState {
  products: Product[];
  productSites: ProductSite[];
  productTypes: ProductTypeWithChildren[];
  childProductTypes: ProductTypeWithOptionalChildren[];
  getProducts: (params?: URLSearchParams) => void;
  getProductSites: () => void;
  getProductTypes: () => void;
  setChildProductTypes: (productTypes: ProductTypeWithChildren[]) => void;
  initialize: () => Promise<void>;
}

const useProductStore = create<ProductStoreState>((set, get) => ({
  products: [],
  productSites: [],
  productTypes: [],
  childProductTypes: [],
  getProducts: async (params?: URLSearchParams) => {
    try {
      const products = await fetchProducts(params);
      set({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  getProductSites: async () => {
    try {
      const productSites = await fetchProductSites();
      set({ productSites });
    } catch (error) {
      console.error("Error fetching product sites:", error);
    }
  },
  getProductTypes: async () => {
    try {
      const productTypes = await fetchProductTypes();
      set({ productTypes });

      get().setChildProductTypes(productTypes);
    } catch (error) {
      console.error("Error fetching product types:", error);
    }
  },
  setChildProductTypes: (productTypes: ProductTypeWithChildren[]) => {
    const filtered: ProductTypeWithOptionalChildren[] = [];

    productTypes.forEach((parentType) => {
      parentType.children.forEach((childType) => {
        const filteredType = { ...childType };
        filteredType.name = `${parentType.name} - ${childType.name}`;
        filteredType.id = childType.id;
        filtered.push(filteredType);
      });
    });

    set({ childProductTypes: filtered });
  },
  initialize: async () => {
    try {
      await Promise.all([get().getProductSites(), get().getProductTypes()]);
    } catch (error) {
      console.error("Error during initialization:", error);
    }
  },
}));

export default useProductStore;

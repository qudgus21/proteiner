import { create } from "zustand";
import { Product, ProductSite, ProductTypeWithChildren, ProductTypeWithOptionalChildren } from "@/types";
import { getProducts, getProductSites, getProductTypes } from "@/api";

interface ProductStoreState {
  products: Product[];
  productSites: ProductSite[];
  productTypes: ProductTypeWithChildren[];
  childProductTypes: ProductTypeWithOptionalChildren[];
  fetchProducts: (params?: URLSearchParams) => void;
  fetchProductSites: () => void;
  fetchProductTypes: () => void;
  setChildProductTypes: (productTypes: ProductTypeWithChildren[]) => void;
  initialize: () => Promise<void>;
}

const useProductStore = create<ProductStoreState>((set, get) => ({
  products: [],
  productSites: [],
  productTypes: [],
  childProductTypes: [],
  fetchProducts: async (params?: URLSearchParams) => {
    try {
      const products = await getProducts(params);
      set({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },
  fetchProductSites: async () => {
    try {
      const productSites = await getProductSites();
      set({ productSites });
    } catch (error) {
      console.error("Error fetching product sites:", error);
    }
  },
  fetchProductTypes: async () => {
    try {
      const productTypes = await getProductTypes();
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
      await Promise.all([get().fetchProductSites(), get().fetchProductTypes()]);
    } catch (error) {
      console.error("Error during initialization:", error);
    }
  },
}));

export default useProductStore;

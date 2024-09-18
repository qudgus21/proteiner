import { create } from "zustand";
import { ProductSite, ProductTypeWithChildren } from "@/types/type"; // 필요한 타입들을 가져옵니다

type FiltersState = {
  filtersExpanded: {
    site: boolean;
    type: boolean;
    nutrition100: boolean;
    nutritionTotal: boolean;
  };
  toggleFilters: (filterType: "site" | "type" | "nutrition100" | "nutritionTotal") => void;
  nutritionFilters: Record<string, number | undefined>;

  products: any[];
  productSites: ProductSite[];
  parentProductTypes: ProductTypeWithChildren[];
  setProducts: (products: any[]) => void;
  setProductSites: (sites: ProductSite[]) => void;
  setParentProductTypes: (types: ProductTypeWithChildren[]) => void;
};

export const useProductStore = create<FiltersState>((set) => ({
  filtersExpanded: {
    site: false,
    type: false,
    nutrition100: false,
    nutritionTotal: false,
  },
  toggleFilters: (filterType) => {
    set((state) => ({
      filtersExpanded: {
        ...state.filtersExpanded,
        [filterType]: !state.filtersExpanded[filterType],
      },
    }));
  },
  nutritionFilters: {},

  products: [],
  productSites: [],
  parentProductTypes: [],
  setProducts: (products) => set({ products }),
  setProductSites: (sites) => set({ productSites: sites }),
  setParentProductTypes: (types) => set({ parentProductTypes: types }),
}));

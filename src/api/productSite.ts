import axios from "axios";
import { ProductSite } from "@/types/productSite";

export const fetchProductSites = async (): Promise<ProductSite[]> => {
  try {
    const response = await axios.get("/api/product-sites");
    return response.data;
  } catch (error) {
    console.error("Error fetching product sites:", error);
    throw new Error("데이터를 가져오는 중 오류가 발생했습니다.");
  }
};

"use client";

import React from "react";
import Filters from "./components/Filters";
import ProductsList from "./components/ProductsList";
import Pagination from "./components/Pagination";

const ProductsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">상품 리스트</h1>
      <Filters />
      <ProductsList />
      <Pagination />
    </div>
  );
};

export default ProductsPage;

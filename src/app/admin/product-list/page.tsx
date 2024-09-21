import React from "react";
import Filters from "./components/Filters";
import List from "./components/List";

const ProductListPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">상품 목록</h1>
      <Filters />
      <List />
    </div>
  );
};

export default ProductListPage;

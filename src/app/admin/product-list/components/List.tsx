"use client";

import { useEffect, useState } from "react";
import { useProductStore } from "@/stores";
import { Pagination } from "@/components";

const List = () => {
  const { products, fetchProducts } = useProductStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 8;
  const paginatedProducts = products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="card bg-base-100 shadow-xl pb-10">
      <div className="card-body">
        <table className="table w-full">
          <thead>
            <tr>
              <th>상품 이름</th>
              <th>가격</th>
              <th>100g당 가격</th>
              <th>상품 URL</th>
              <th>제휴 URL</th>
              <th>이미지 URL</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.pricePer100g ?? "N/A"}</td>
                <td>
                  <a href={product.productUrl} target="_blank" rel="noopener noreferrer">
                    {product.productUrl}
                  </a>
                </td>
                <td>
                  <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                    {product.affiliateUrl}
                  </a>
                </td>
                <td>
                  <a href={product.imageUrl} target="_blank" rel="noopener noreferrer">
                    {product.imageUrl}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination totalItems={products.length} itemsPerPage={itemsPerPage} currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default List;

"use client";

import Link from "next/link";
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
      <div className="card-body overflow-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th className="w-1/3">상품 이름</th>
              <th className="w-1/6">가격</th>
              <th className="w-1/6">100g당 가격</th>
              <th className="w-1/6">상품 URL</th>
              <th className="w-1/6">제휴 URL</th>
              <th className="w-1/6">이미지 URL</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td className="w-1/3">
                  <div className="max-w-[300px] truncate">
                    <Link href={`/admin/product/${product.id}`}>{product.name}</Link>
                  </div>
                </td>
                <td className="w-1/6">{product.price}</td>
                <td className="w-1/6">{product.pricePer100g}</td>
                <td className="w-1/6">
                  <a href={product.productUrl} target="_blank" rel="noopener noreferrer">
                    <div className="max-w-[150px] truncate">{product.productUrl}</div>
                  </a>
                </td>
                <td className="w-1/6">
                  <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">
                    <div className="max-w-[150px] truncate">{product.affiliateUrl}</div>
                  </a>
                </td>
                <td className="w-1/6">
                  <a href={product.imageUrl} target="_blank" rel="noopener noreferrer">
                    <div className="max-w-[150px] truncate">{product.imageUrl}</div>
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

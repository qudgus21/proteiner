"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">상품 리스트 페이지</h1>
      <div className="card bg-base-100 shadow-xl">
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
              {products.map((product) => (
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
      </div>
    </div>
  );
};

export default ProductsPage;

// src/app/admin/add-product/page.tsx
"use client";

import React, { useState } from "react";
import axios from "axios";

const AddProductPage: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [pricePer100g, setPricePer100g] = useState("");
  const [productUrl, setProductUrl] = useState("");
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/products", {
        name,
        price: parseInt(price),
        pricePer100g: pricePer100g ? parseInt(pricePer100g) : null,
        productUrl,
        affiliateUrl,
        imageUrl,
      });
      // Clear the form or show a success message
      setName("");
      setPrice("");
      setPricePer100g("");
      setProductUrl("");
      setAffiliateUrl("");
      setImageUrl("");
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">상품 등록 페이지</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="label">
                <span className="label-text">상품 이름</span>
              </label>
              <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input input-bordered w-full" />
            </div>
            <div>
              <label htmlFor="price" className="label">
                <span className="label-text">상품 가격</span>
              </label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label htmlFor="pricePer100g" className="label">
                <span className="label-text">100g당 가격 (선택)</span>
              </label>
              <input
                id="pricePer100g"
                type="number"
                value={pricePer100g}
                onChange={(e) => setPricePer100g(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label htmlFor="productUrl" className="label">
                <span className="label-text">상품 URL</span>
              </label>
              <input
                id="productUrl"
                type="url"
                value={productUrl}
                onChange={(e) => setProductUrl(e.target.value)}
                required
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label htmlFor="affiliateUrl" className="label">
                <span className="label-text">제휴 URL (선택)</span>
              </label>
              <input
                id="affiliateUrl"
                type="url"
                value={affiliateUrl}
                onChange={(e) => setAffiliateUrl(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label htmlFor="imageUrl" className="label">
                <span className="label-text">상품 이미지 URL (선택)</span>
              </label>
              <input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>
            <button type="submit" className="btn btn-primary w-full">
              제출
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;

"use client";

import React, { useState } from "react";
import axios from "axios";
import { nutritionColumns, nutritionMapping } from "@/constants";

const AddProductPage: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>();
  const [pricePer100g, setPricePer100g] = useState<number>();
  const [productUrl, setProductUrl] = useState<string>("");
  const [affiliateUrl, setAffiliateUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const [nutrition100g, setNutrition100g] = useState(Object.fromEntries(nutritionColumns.map((col) => [col, ""])));
  const [nutritionTotal, setNutritionTotal] = useState(Object.fromEntries(nutritionColumns.map((col) => [col, ""])));

  const [isNutrition100gOpen, setIsNutrition100gOpen] = useState<boolean>(false);
  const [isNutritionTotalOpen, setIsNutritionTotalOpen] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("/api/products", {
        name,
        price,
        pricePer100g,
        productUrl,
        affiliateUrl,
        imageUrl,
        nutrition100g: Object.fromEntries(nutritionColumns.map((col) => [nutritionMapping[col], parseFloat(nutrition100g[col])])),
        nutritionTotal: Object.fromEntries(nutritionColumns.map((col) => [nutritionMapping[col], parseFloat(nutritionTotal[col])])),
      });
    } catch (error) {
      console.error("Error submitting product:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">상품 등록</h1>
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
                min="0"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
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
                min="0"
                value={pricePer100g}
                onChange={(e) => setPricePer100g(Number(e.target.value))}
                className="input input-bordered w-full"
              />
            </div>
            <div>
              <label htmlFor="productUrl" className="label">
                <span className="label-text">상품 URL</span>
              </label>
              <input
                id="productUrl"
                type="string"
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
                type="string"
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
                type="string"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="input input-bordered w-full"
              />
            </div>

            <div className="flex gap-4">
              {/* 100g당 영양성분 토글 */}
              <div className="flex-1">
                <button type="button" onClick={() => setIsNutrition100gOpen(!isNutrition100gOpen)} className="btn btn-neutral w-full">
                  100g당 영양성분 입력
                </button>
                {isNutrition100gOpen && (
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {nutritionColumns.map((col) => (
                      <div key={col} className="flex flex-col">
                        <label htmlFor={col} className="label">
                          <span className="label-text">{col}</span>
                        </label>
                        <input
                          id={col}
                          type="number"
                          min="0"
                          value={nutrition100g[col]}
                          onChange={(e) =>
                            setNutrition100g({
                              ...nutrition100g,
                              [col]: e.target.value,
                            })
                          }
                          className="input input-bordered"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* 전체 영양성분 토글 */}
              <div className="flex-1">
                <button type="button" onClick={() => setIsNutritionTotalOpen(!isNutritionTotalOpen)} className="btn btn-neutral w-full">
                  전체 영양성분 입력
                </button>
                {isNutritionTotalOpen && (
                  <div className="grid grid-cols-3 gap-4 mt-2">
                    {nutritionColumns.map((col) => (
                      <div key={col} className="flex flex-col">
                        <label htmlFor={`total_${col}`} className="label">
                          <span className="label-text">{col}</span>
                        </label>
                        <input
                          id={`total_${col}`}
                          type="number"
                          min="0"
                          value={nutritionTotal[col]}
                          onChange={(e) =>
                            setNutritionTotal({
                              ...nutritionTotal,
                              [col]: e.target.value,
                            })
                          }
                          className="input input-bordered"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full">
              저장
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;

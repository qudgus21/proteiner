"use client";

import { useRouter } from "next/router";
import React, { useState } from "react";
import { nutritionColumns, nutritionMapping } from "@/constants";
import { useProductStore, useLoadingStore } from "@/stores";
import { createProduct } from "@/api";

const ProductAddPage: React.FC = () => {
  // todo: 오류잡기
  // const router = useRouter();

  const { productSites, childProductTypes } = useProductStore();
  const { setLoading } = useLoadingStore();

  const [selectedSiteId, setSelectedSiteId] = useState<string>("");
  const [selectedTypeId, setSelectedTypeId] = useState<string>("");

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

    const filteredNutrition100g = nutritionColumns.reduce((acc, col) => {
      const value = nutrition100g[col];
      if (value) {
        acc[nutritionMapping[col]] = Number(value); // 빈 값이 아닐 경우에만 추가
      }
      return acc;
    }, {} as Record<string, number>);

    const filteredNutritionTotal = nutritionColumns.reduce((acc, col) => {
      const value = nutritionTotal[col];
      if (value) {
        acc[nutritionMapping[col]] = Number(value); // 빈 값이 아닐 경우에만 추가
      }
      return acc;
    }, {} as Record<string, number>);

    try {
      setLoading(true);

      const createdProduct = await createProduct({
        name,
        price: Number(price),
        pricePer100g,
        productUrl,
        affiliateUrl,
        productTypeId: selectedTypeId,
        siteId: selectedSiteId,
        imageUrl,
        nutrition100g: filteredNutrition100g,
        nutritionTotal: filteredNutritionTotal,
      });

      window.location.href = `/admin/product/${createdProduct.id}`;
      // router.push(`/admin/products/${createdProduct.id}`);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">상품 등록</h1>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 사이트 선택 */}
            <div>
              <label htmlFor="productSite" className="label">
                <span className="label-text">사이트 선택</span>
              </label>
              <select
                id="productSite"
                value={selectedSiteId}
                onChange={(e) => setSelectedSiteId(e.target.value)}
                required
                className="select select-bordered w-full"
              >
                <option value="">사이트를 선택하세요</option>
                {productSites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </select>
            </div>

            {/* 타입 선택 (자식 타입만) */}
            <div>
              <label htmlFor="productType" className="label">
                <span className="label-text">타입 선택</span>
              </label>
              <select
                id="productType"
                value={selectedTypeId}
                onChange={(e) => setSelectedTypeId(e.target.value)}
                required
                className="select select-bordered w-full"
              >
                <option value="">타입을 선택하세요</option>

                {childProductTypes.map((type: any) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

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
                min="1"
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

export default ProductAddPage;

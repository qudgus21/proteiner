"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProduct, updateNutrition100g, updateNutritionTotal, updateProduct, deleteProduct } from "@/api";
import { ProductIncludeNutrition } from "@/types";
import { useProductStore, useLoadingStore } from "@/stores";
import { nutritionColumns, nutritionMapping } from "@/constants";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const { productSites, childProductTypes } = useProductStore();
  const { setLoading } = useLoadingStore();

  const [product, setProduct] = useState<ProductIncludeNutrition | null>(null);

  const [isNutrition100gOpen, setIsNutrition100gOpen] = useState<boolean>(false);
  const [isNutritionTotalOpen, setIsNutritionTotalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchProduct(id as string);
  }, [id]);

  const fetchProduct = async (id: string) => {
    setLoading(true);
    try {
      const fetchedProduct = await getProduct(id);
      setProduct(fetchedProduct);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ProductIncludeNutrition, value: string) => {
    if (product) {
      setProduct({ ...product, [field]: value });
    }
  };

  const handleSiteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const siteId = event.target.value;

    if (product) {
      setProduct({ ...product, siteId });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) return;

    const updatePromises = [
      updateProduct({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        pricePer100g: Number(product.pricePer100g),
        productUrl: product.productUrl,
        affiliateUrl: product.affiliateUrl,
        imageUrl: product.imageUrl,
        siteId: product.siteId,
        productTypeId: product.productTypeId,
      }),
      product.nutritionTotalId &&
        updateNutritionTotal({
          id: product.nutritionTotalId,
          ...product.nutritionTotal,
        }),
      product.nutrition100gId &&
        updateNutrition100g({
          id: product.nutrition100gId,
          ...product.nutrition100g,
        }),
    ].filter(Boolean);

    try {
      await Promise.all(updatePromises);
      alert("수정 완료");
      //todo: router
      window.location.reload();
    } catch (error) {
      alert(error);
    }
  };

  // nutritionTotal 업데이트 함수
  const updateNutritionTotalColumn = (key: string, value: string) => {
    if (product) {
      const updatedNutritionTotal = {
        ...product.nutritionTotal,
        [key]: Number(value) || 0,
      };
      setProduct({ ...product, nutritionTotal: updatedNutritionTotal });
    }
  };

  // nutrition100g 업데이트 함수
  const updateNutrition100gColumn = (key: string, value: string) => {
    if (product) {
      const updatedNutrition100g = {
        ...product.nutrition100g,
        [key]: Number(value) || 0,
      };
      setProduct({ ...product, nutrition100g: updatedNutrition100g });
    }
  };

  const handleRemoveBtnClick = async (e: any) => {
    e.preventDefault();
    if (!product) return;

    const confirmed = window.confirm("삭제하시겠습니까?");
    if (!confirmed) return;

    try {
      await deleteProduct(product.id);
      //todo: router로 변경
      alert("삭제 성공");
      window.location.href = `/admin/product/list`;
    } catch (error) {
      alert("상품 삭제에 실패했습니다.");
    }
  };

  return (
    <div>
      {product && (
        <div>
          <h1 className="text-2xl font-bold mb-4">상품 상세</h1>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 상품 ID */}
                <div>{`Id: ${product.id}`}</div>

                {/* 이미지 */}
                {product.imageUrl && (
                  <div className="mb-4">
                    <img src={product.imageUrl} alt={product.name} className="max-w-xs" />
                  </div>
                )}

                {/* 사이트 선택 */}
                <div>
                  <label htmlFor="productSite" className="label">
                    <span className="label-text">사이트 선택</span>
                  </label>
                  <select
                    id="productSite"
                    value={product.siteId || ""}
                    onChange={handleSiteChange}
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
                    value={product.productTypeId || ""} // product.typeId를 직접 사용
                    onChange={(e) => handleInputChange("productTypeId", e.target.value)} // product 상태를 직접 업데이트
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

                {/* 상품 이름 */}
                <div className="mb-4">
                  <label className="label">
                    <span className="label-text">상품 이름</span>
                  </label>
                  <input
                    type="text"
                    value={product.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* 가격 */}
                <div className="mb-4">
                  <label className="label">
                    <span className="label-text">상품 가격</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={product.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* 100g당 가격 */}
                <div className="mb-4">
                  <label className="label">
                    <span className="label-text">100g당 가격</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={product.pricePer100g}
                    onChange={(e) => handleInputChange("pricePer100g", e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* 상품 URL */}
                <div className="mb-4">
                  <label className="label">
                    <span className="label-text">상품 URL</span>
                  </label>
                  <input
                    type="text"
                    value={product.productUrl}
                    onChange={(e) => handleInputChange("productUrl", e.target.value)}
                    className="input input-bordered w-full"
                  />
                </div>

                {/* 제휴 URL */}
                {product.affiliateUrl && (
                  <div className="mb-4">
                    <label className="label">
                      <span className="label-text">제휴 URL</span>
                    </label>
                    <input
                      type="text"
                      value={product.affiliateUrl}
                      onChange={(e) => handleInputChange("affiliateUrl", e.target.value)}
                      className="input input-bordered w-full"
                    />
                  </div>
                )}

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
                              type="number"
                              value={product.nutrition100g[nutritionMapping[col] as keyof typeof product.nutrition100g] || ""}
                              onChange={(e) => updateNutrition100gColumn(nutritionMapping[col], e.target.value)}
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
                              value={product.nutritionTotal[nutritionMapping[col] as keyof typeof product.nutritionTotal] || ""}
                              onChange={(e) => updateNutritionTotalColumn(nutritionMapping[col], e.target.value)}
                              type="number"
                              min="0"
                              className="input input-bordered"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full">
                  <button type="submit" className="btn btn-primary mt-4 w-full">
                    업데이트
                  </button>
                </div>
                <div className="w-full">
                  <button onClick={handleRemoveBtnClick} className="btn btn-error mt-4 w-full text-white">
                    삭제
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;

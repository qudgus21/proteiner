"use client";

import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import { nutritionColumns } from "@/constants";
import { ProductSite } from "@/types/productSite";
import { ProductTypeWithChildren } from "@/types/productType";

// 필터 타입 정의
type FilterType = "site" | "type" | "nutrition100" | "nutritionTotal";

// 영양성분 필터 범위 타입 정의
type NutritionFilterRange = "min" | "max";

// 영양성분 필터 종류 정의
type NutritionFilterType = "total" | "100g";

const Filters = () => {
  const [productSites, setProductSites] = useState<ProductSite[]>([]);
  const [parentProductTypes, setParentProductTypes] = useState<ProductTypeWithChildren[]>([]);

  const [filtersExpanded, setFiltersExpanded] = useState<{
    site: boolean;
    type: boolean;
    nutrition100: boolean;
    nutritionTotal: boolean;
  }>({
    site: false,
    type: false,
    nutrition100: false,
    nutritionTotal: false,
  });

  // 체크박스 상태 관리
  const [selectedSites, setSelectedSites] = useState<Set<string>>(new Set());
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());

  // 전체 영양성분 필터와 100g 영양성분 필터 상태
  const [nutritionTotalFilters, setNutritionTotalFilters] = useState<{ [key: string]: { min: string; max: string } }>({});
  const [nutrition100gFilters, setNutrition100gFilters] = useState<{ [key: string]: { min: string; max: string } }>({});

  useEffect(() => {
    fetchProductSites();
    fetchProductTypes();
  }, []);

  const fetchProductSites = async () => {
    try {
      const response = await axios.get("/api/product-sites");
      setProductSites(response.data);
    } catch (error) {
      console.log("Error fetching product sites:", error);
    }
  };

  const fetchProductTypes = async () => {
    try {
      const response = await axios.get("/api/product-types");
      setParentProductTypes(response.data);
    } catch (error) {
      console.log("Error fetching product types:", error);
    }
  };

  // 필터 토글
  const toggleFilters = (filterType: FilterType) => {
    setFiltersExpanded((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  // 체크박스 상태 업데이트
  const handleCheckboxChange = (id: string, type: "site" | "type") => {
    if (type === "site") {
      setSelectedSites((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    } else if (type === "type") {
      setSelectedTypes((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
        return newSet;
      });
    }
  };

  // 영양성분 필터 상태 업데이트 (전체 및 100g 분리)
  const handleNutritionFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: NutritionFilterRange,
    column: string,
    filterType: NutritionFilterType
  ) => {
    const value = e.target.value;
    if (filterType === "total") {
      setNutritionTotalFilters((prev) => ({
        ...prev,
        [column]: {
          ...prev[column],
          [type]: value,
        },
      }));
    } else {
      setNutrition100gFilters((prev) => ({
        ...prev,
        [column]: {
          ...prev[column],
          [type]: value,
        },
      }));
    }
  };

  const renderChildren = (children: ProductTypeWithChildren[]) => {
    return children.map((child) => (
      <label className="label cursor-pointer min-w-[150px]" key={child.id}>
        <span className="label-text">{child.name}</span>
        <input type="checkbox" checked={selectedTypes.has(child.id)} onChange={() => handleCheckboxChange(child.id, "type")} className="checkbox" />
        {child.children && child.children.length > 0 && <div className="ml-4">{renderChildren(child.children)}</div>}
      </label>
    ));
  };

  return (
    <section className="mb-4 flex gap-4">
      {/* 사이트 필터 */}
      <div>
        <button onClick={() => toggleFilters("site")} className="btn btn-outline mb-4 flex items-center min-w-[105px]">
          <span className="mr-2">사이트</span>
          {filtersExpanded.site ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {filtersExpanded.site && (
          <div className="form-control">
            {productSites.map((item) => (
              <label className="label cursor-pointer" key={item.id}>
                <span className="label-text">{item.name}</span>
                <input
                  type="checkbox"
                  checked={selectedSites.has(item.id)}
                  onChange={() => handleCheckboxChange(item.id, "site")}
                  className="checkbox"
                />
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 상품유형 필터 */}
      <div>
        <button onClick={() => toggleFilters("type")} className="btn btn-outline mb-4 flex items-center min-w-[105px]">
          <span className="mr-2">상품유형</span>
          {filtersExpanded.type ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {filtersExpanded.type && (
          <div className="form-control">
            {parentProductTypes.map((parent) => (
              <div className="flex items-start" key={parent.id}>
                <label className="label cursor-pointer flex gap-2 min-w-[105px]">
                  <span className="label-text font-bold">{parent.name}</span>
                  <input
                    type="checkbox"
                    checked={selectedTypes.has(parent.id)}
                    onChange={() => handleCheckboxChange(parent.id, "type")}
                    className="checkbox"
                  />
                </label>
                {parent.children && parent.children.length > 0 && <div className="ml-4">{renderChildren(parent.children)}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 전체 영양성분 필터 */}
      <div>
        <button onClick={() => toggleFilters("nutritionTotal")} className="btn btn-outline mb-4 flex items-center">
          <span className="mr-2">전체 영양성분</span>
          {filtersExpanded.nutritionTotal ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {filtersExpanded.nutritionTotal &&
          nutritionColumns.map((column) => (
            <div key={column} className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="number"
                  value={nutritionTotalFilters[column]?.min || ""}
                  onChange={(e) => handleNutritionFilterChange(e, "min", column, "total")}
                  placeholder={`최소 ${column}`}
                  className="input input-bordered mr-4"
                />
                <input
                  type="number"
                  value={nutritionTotalFilters[column]?.max || ""}
                  onChange={(e) => handleNutritionFilterChange(e, "max", column, "total")}
                  placeholder={`최대 ${column}`}
                  className="input input-bordered"
                />
              </div>
            </div>
          ))}
      </div>

      {/* 100g 영양성분 필터 */}
      <div>
        <button onClick={() => toggleFilters("nutrition100")} className="btn btn-outline mb-4 flex items-center">
          <span className="mr-2">100g 영양성분</span>
          {filtersExpanded.nutrition100 ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {filtersExpanded.nutrition100 &&
          nutritionColumns.map((column) => (
            <div key={column} className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="number"
                  value={nutrition100gFilters[column]?.min || ""}
                  onChange={(e) => handleNutritionFilterChange(e, "min", column, "100g")}
                  placeholder={`최소 ${column}`}
                  className="input input-bordered mr-4"
                />
                <input
                  type="number"
                  value={nutrition100gFilters[column]?.max || ""}
                  onChange={(e) => handleNutritionFilterChange(e, "max", column, "100g")}
                  placeholder={`최대 ${column}`}
                  className="input input-bordered"
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Filters;

"use client";

import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import { ProductSite, ProductTypeWithChildren } from "@/types/type";
import { nutritionColumns } from "@/constants";

const Filters = () => {
  const [productSites, setProductSites] = useState<ProductSite[]>([]);
  const [parentProductTypes, setParentProductTypes] = useState<ProductTypeWithChildren[]>([]);
  const [nutritionFilters, setNutritionFilters] = useState<any>({});

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
      console.log("Error fetching product sites:", error);
    }
  };

  const toggleFilters = (filterType: "site" | "type" | "nutrition100" | "nutritionTotal") => {
    setFiltersExpanded((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  const renderChildren = (children: ProductTypeWithChildren[]) => {
    return children.map((child) => (
      <label className="label cursor-pointer min-w-[150px]" key={child.id}>
        <span className="label-text">{child.name}</span>
        <input type="checkbox" defaultChecked className="checkbox" />
        {child.children && child.children.length > 0 && <div className="ml-4">{renderChildren(child.children)}</div>}
      </label>
    ));
  };

  return (
    <section className="mb-4 flex gap-4">
      {/* 사이트 */}
      <div>
        <button
          onClick={() => {
            toggleFilters("site");
          }}
          className="btn btn-outline mb-4 flex items-center min-w-[105px]"
        >
          <span className="mr-2">사이트</span>
          {filtersExpanded.site ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {filtersExpanded.site && (
          <div className="form-control">
            {productSites.map((item) => {
              return (
                <label className="label cursor-pointer" key={item.id}>
                  <span className="label-text">{item.name}</span>
                  <input type="checkbox" defaultChecked className="checkbox" />
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 타입 */}
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
                  <input type="checkbox" defaultChecked className="checkbox" />
                </label>
                {parent.children && parent.children.length > 0 && <div className="ml-4">{renderChildren(parent.children)}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 전체 영양성분 */}
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
                  value={nutritionFilters[`${column}_min`] === undefined ? "" : nutritionFilters[`${column}_min`]}
                  // onChange={(e) => handleNutritionFilterChange(e, "min", column)}
                  placeholder={`최소 ${column}`}
                  className="input input-bordered mr-4"
                />
                <input
                  type="number"
                  value={nutritionFilters[`${column}_max`] === undefined ? "" : nutritionFilters[`${column}_max`]}
                  // onChange={(e) => handleNutritionFilterChange(e, "max", column)}
                  placeholder={`최대 ${column}`}
                  className="input input-bordered"
                />
              </div>
            </div>
          ))}
      </div>

      {/* 100g 영양성분 */}
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
                  value={nutritionFilters[`${column}_min`] === undefined ? "" : nutritionFilters[`${column}_min`]}
                  // onChange={(e) => handleNutritionFilterChange(e, "min", column)}
                  placeholder={`최소 ${column}`}
                  className="input input-bordered mr-4"
                />
                <input
                  type="number"
                  value={nutritionFilters[`${column}_max`] === undefined ? "" : nutritionFilters[`${column}_max`]}
                  // onChange={(e) => handleNutritionFilterChange(e, "max", column)}
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

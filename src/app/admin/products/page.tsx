"use client";

import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import { ProductSite, ProductTypeWithChildren } from "@/types/type";
import { nutritionColumns } from "@/constants";

const ProductsPage: React.FC = () => {
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

  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedSites, setSelectedSites] = useState<string[]>([]);
  const [selectedProductType, setSelectedProductType] = useState<string>("");
  const [nutritionFilters, setNutritionFilters] = useState<any>({});
  const [siteExpanded, setSiteExpanded] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(false);

  useEffect(() => {
    fetchProducts();
    fetchProductSites();
    fetchProductTypes();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

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

  const totalPages = 3;

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">상품 리스트</h1>
      <div className="mb-4 flex gap-4">
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
      </div>

      {/* Product List */}
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

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-4">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="btn btn-sm mx-1">
          {"<"}
        </button>
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)} className="btn btn-sm mx-1">
            {"<<"}
          </button>
        )}
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + Math.max(currentPage - 2, 1)).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`btn btn-sm mx-1 ${pageNumber === currentPage ? "btn-active" : ""}`}
          >
            {pageNumber}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)} className="btn btn-sm mx-1">
            {">>"}
          </button>
        )}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="btn btn-sm mx-1">
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ProductsPage;

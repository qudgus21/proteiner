"use client";

import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { nutritionColumns } from "@/constants";
import { ProductTypeWithOptionalChildren, ProductTypeWithChildren, ProductSite } from "@/types";
import { useLoadingStore, useProductStore } from "@/stores";

// 필터 타입 정의
type FilterType = "site" | "type" | "nutrition100" | "nutritionTotal";

// 영양성분 필터 범위 타입 정의
type NutritionFilterRange = "min" | "max";

const Filters = () => {
  const { productSites, productTypes, fetchProducts } = useProductStore();
  const { setLoading } = useLoadingStore();

  const [name, setName] = useState("");

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
    checkInitialData();
  }, [productSites, productTypes]);

  const checkInitialData = () => {
    const siteIds = productSites.map((site: ProductSite) => site.id);

    setSelectedSites(new Set(siteIds));

    const typeSet = new Set<string>();
    productTypes.forEach((parantType: ProductTypeWithOptionalChildren) => {
      typeSet.add(parantType.id);
      if (parantType.children) {
        parantType.children.forEach((childType) => {
          typeSet.add(childType.id);
        });
      }
    });
    setSelectedTypes(typeSet);
  };

  // 필터 토글
  const toggleFilters = (filterType: FilterType) => {
    setFiltersExpanded((prev) => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  // 사이트 체크박스 상태 업데이트
  const handleSiteCheckboxChange = (id: string) => {
    setSelectedSites((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  // 자식 체크박스가 모두 선택된 경우 부모를 선택하도록
  const handleChildCheckboxChange = (parentId: string, childId: string) => {
    setSelectedTypes((prev) => {
      const newSet = new Set(prev);
      newSet.has(childId) ? newSet.delete(childId) : newSet.add(childId);

      // 모든 자식이 선택된 경우 부모도 선택
      const parent = productTypes.find((p): p is ProductTypeWithChildren => p.id === parentId);

      if (parent?.children.every((child) => newSet.has(child.id))) {
        newSet.add(parentId);
      } else {
        newSet.delete(parentId);
      }
      return newSet;
    });
  };

  // 부모 체크박스가 선택된 경우 모든 자식 선택하도록
  const handleParentCheckboxChange = (parentId: string) => {
    setSelectedTypes((prev) => {
      const parent = productTypes.find((p) => p.id === parentId);
      const newSet = new Set(prev);

      if (newSet.has(parentId)) {
        parent?.children?.forEach((child) => newSet.delete(child.id));
        newSet.delete(parentId);
      } else {
        parent?.children?.forEach((child) => newSet.add(child.id));
        newSet.add(parentId);
      }

      return newSet;
    });
  };

  // 전체 영양성분 필터 상태 업데이트
  const handleNutritionTotalFilterChange = (e: React.ChangeEvent<HTMLInputElement>, type: NutritionFilterRange, column: string) => {
    const value = e.target.value;
    setNutritionTotalFilters((prev) => ({
      ...prev,
      [column]: {
        ...prev[column],
        [type]: value,
      },
    }));
  };

  // 100g 영양성분 필터 상태 업데이트
  const handleNutrition100gFilterChange = (e: React.ChangeEvent<HTMLInputElement>, type: NutritionFilterRange, column: string) => {
    const value = e.target.value;
    setNutrition100gFilters((prev) => ({
      ...prev,
      [column]: {
        ...prev[column],
        [type]: value,
      },
    }));
  };

  const buildQueryParams = () => {
    const params = new URLSearchParams();

    // 이름 필터
    if (name) {
      params.append("name", name);
    }

    // 사이트 필터
    if (selectedSites.size > 0) {
      params.append("sites", Array.from(selectedSites).join(","));
    }

    // 상품유형 필터
    if (selectedTypes.size > 0) {
      params.append("types", Array.from(selectedTypes).join(","));
    }

    // 전체 영양성분 필터
    for (const [key, { min, max }] of Object.entries(nutritionTotalFilters)) {
      if (min !== undefined && min !== null && min !== "") {
        params.append(`nutritionTotal_${key}_min`, min.toString());
      }
      if (max !== undefined && max !== null && max !== "") {
        params.append(`nutritionTotal_${key}_max`, max.toString());
      }
    }

    // 100g 영양성분 필터
    for (const [key, { min, max }] of Object.entries(nutrition100gFilters)) {
      if (min !== undefined && min !== null && min !== "") {
        params.append(`nutrition100_${key}_min`, min.toString());
      }
      if (max !== undefined && max !== null && max !== "") {
        params.append(`nutrition100_${key}_max`, max.toString());
      }
    }

    return params;
  };

  const handleFetchBtnClick = async () => {
    const params: URLSearchParams = buildQueryParams();

    setLoading(true);
    try {
      await fetchProducts(params);
    } catch (error) {
      console.error("Error loading product data:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSelectedSites(new Set());
    setSelectedTypes(new Set());
    setNutritionTotalFilters({});
    setNutrition100gFilters({});
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleFetchBtnClick();
    }
  };

  return (
    <section className="mb-4 flex gap-4">
      {/* 이름 필터 */}
      <div>
        <input
          type="text"
          value={name}
          onKeyDown={handleKeyDown}
          onChange={(e) => setName(e.target.value)}
          placeholder="상품 이름 입력"
          className="input input-bordered w-[200px] mb-4"
        />
      </div>

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
                <input type="checkbox" checked={selectedSites.has(item.id)} onChange={() => handleSiteCheckboxChange(item.id)} className="checkbox" />
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 상품유형 필터 */}
      <div>
        <button onClick={() => toggleFilters("type")} className="btn btn-outline mb-4 flex items-center min-w-[120px]">
          <span className="mr-2">상품유형</span>
          {filtersExpanded.type ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {filtersExpanded.type && (
          <div className="form-control">
            {productTypes.map((parent) => (
              <div className="flex items-start" key={parent.id}>
                <label className="label cursor-pointer flex gap-2 min-w-[105px]">
                  <span className="label-text font-bold">{parent.name}</span>
                  <input
                    type="checkbox"
                    checked={selectedTypes.has(parent.id)}
                    onChange={() => {
                      handleParentCheckboxChange(parent.id);
                    }}
                    className="checkbox"
                  />
                </label>
                {parent.children && parent.children.length > 0 && (
                  <div className="ml-4">
                    {parent.children.map((child) => (
                      <label className="label cursor-pointer min-w-[150px]" key={child.id}>
                        <span className="label-text">{child.name}</span>
                        <input
                          type="checkbox"
                          checked={selectedTypes.has(child.id)}
                          onChange={() => child.parentId && handleChildCheckboxChange(child.parentId, child.id)}
                          className="checkbox"
                        />
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 전체 영양성분 필터 */}
      <div>
        <button onClick={() => toggleFilters("nutritionTotal")} className="btn btn-outline mb-4 flex items-center min-w-[120px]">
          <span className="mr-2">전체 성분</span>
          {filtersExpanded.nutritionTotal ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {filtersExpanded.nutritionTotal &&
          nutritionColumns.map((column) => (
            <div key={column} className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="number"
                  value={nutritionTotalFilters[column]?.min || ""}
                  onChange={(e) => handleNutritionTotalFilterChange(e, "min", column)}
                  placeholder={`최소 ${column}`}
                  className="input input-bordered mr-4 w-[120px]"
                />
                <input
                  type="number"
                  value={nutritionTotalFilters[column]?.max || ""}
                  onChange={(e) => handleNutritionTotalFilterChange(e, "max", column)}
                  placeholder={`최대 ${column}`}
                  className="input input-bordered w-[120px]"
                />
              </div>
            </div>
          ))}
      </div>

      {/* 100g 영양성분 필터 */}
      <div>
        <button onClick={() => toggleFilters("nutrition100")} className="btn btn-outline mb-4 flex items-center min-w-[125px]">
          <span className="mr-2">100g 성분</span>
          {filtersExpanded.nutrition100 ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {filtersExpanded.nutrition100 &&
          nutritionColumns.map((column) => (
            <div key={column} className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="number"
                  value={nutrition100gFilters[column]?.min || ""}
                  onChange={(e) => handleNutrition100gFilterChange(e, "min", column)}
                  placeholder={`최소 ${column}`}
                  className="input input-bordered mr-4 w-[120px]"
                />
                <input
                  type="number"
                  value={nutrition100gFilters[column]?.max || ""}
                  onChange={(e) => handleNutrition100gFilterChange(e, "max", column)}
                  placeholder={`최대 ${column}`}
                  className="input input-bordered w-[120px]"
                />
              </div>
            </div>
          ))}
      </div>
      <button
        onClick={() => {
          handleFetchBtnClick();
        }}
        className="btn btn-active btn-neutral w-[100px]"
      >
        검색
      </button>
      <button
        className="btn btn-warning w-[100px]"
        onClick={() => {
          resetFilters();
        }}
      >
        초기화
      </button>
    </section>
  );
};

export default Filters;

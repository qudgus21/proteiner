"use client";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getProduct } from "@/api";
import { Product } from "@prisma/client";

const ProductDetailPage: React.FC = () => {
  // const router = useRouter();
  // const { id } = router.query; // URL에서 ID 가져오기
  // const [product, setProduct] = useState<Product | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // const fetchProduct = async () => {
    //   if () {
    //     try {
    //       // const fetchedProduct = await getProductById(id as string);
    //       // setProduct(fetchedProduct);
    //     } catch (err) {
    //       // setError("상품을 불러오는 데 실패했습니다.");
    //       // console.error(err);
    //     } finally {
    //       // setLoading(false);
    //     }
    //   }
    // };

    // fetchProduct();
  }, []);

  // if (loading) {
  //   return <div>로딩 중...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  // if (!product) {
  //   return <div>상품을 찾을 수 없습니다.</div>;
  // }

  return (
    <div></div>
    // <div>
    //   <h1 className="text-2xl font-bold">{product.name}</h1>
    //   <img src={product.imageUrl} alt={product.name} className="mt-4" />
    //   <p className="mt-2">가격: {product.price} 원</p>
    //   <p className="mt-2">100g당 가격: {product.pricePer100g ? product.pricePer100g + " 원" : "정보 없음"}</p>
    //   <p className="mt-2">상품 URL: <a href={product.productUrl} className="link">{product.productUrl}</a></p>
    //   <p className="mt-2">제휴 URL: {product.affiliateUrl ? <a href={product.affiliateUrl} className="link">{product.affiliateUrl}</a> : "정보 없음"}</p>

    //   {/* 영양 정보 표시 */}
    //   <h2 className="text-xl font-semibold mt-4">100g당 영양성분</h2>
    //   {product.nutrition100g ? (
    //     <ul>
    //       <li>칼로리: {product.nutrition100g.calories || "정보 없음"}</li>
    //       <li>탄수화물: {product.nutrition100g.carbohydrates || "정보 없음"}</li>
    //       <li>단백질: {product.nutrition100g.protein || "정보 없음"}</li>
    //       <li>지방: {product.nutrition100g.fat || "정보 없음"}</li>
    //       {/* 추가 영양 정보 표시 */}
    //     </ul>
    //   ) : (
    //     <p>100g당 영양정보가 없습니다.</p>
    //   )}

    //   <h2 className="text-xl font-semibold mt-4">전체 영양성분</h2>
    //   {product.nutritionTotal ? (
    //     <ul>
    //       <li>칼로리: {product.nutritionTotal.calories || "정보 없음"}</li>
    //       <li>탄수화물: {product.nutritionTotal.carbohydrates || "정보 없음"}</li>
    //       <li>단백질: {product.nutritionTotal.protein || "정보 없음"}</li>
    //       <li>지방: {product.nutritionTotal.fat || "정보 없음"}</li>
    //       {/* 추가 영양 정보 표시 */}
    //     </ul>
    //   ) : (
    //     <p>전체 영양정보가 없습니다.</p>
    //   )}
    // </div>
  );
};

export default ProductDetailPage;

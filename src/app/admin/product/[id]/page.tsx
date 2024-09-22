import { useEffect } from "react";
// import { useRouter } from "next/router";

const ProductDetailPage = () => {
  // const router = useRouter();
  // const { id } = router.query;
  // const [product, setProduct] = useState(null);
  // const [loading, setLoading] = useState(true);

  // if (loading) return <div>Loading...</div>;
  // if (!product) return <div>Product not found</div>;

  return (
    <div className="card bg-base-100 shadow-xl">
      안녕난 상세 페이지야
      {/* <div className="card-body">
        <h2 className="card-title">{product.name}</h2>
        <p>가격: {product.price}</p>
        <p>100g당 가격: {product.pricePer100g ?? "N/A"}</p>
        <p>상품 URL: <a href={product.productUrl} target="_blank" rel="noopener noreferrer">{product.productUrl}</a></p>
        <p>제휴 URL: <a href={product.affiliateUrl} target="_blank" rel="noopener noreferrer">{product.affiliateUrl}</a></p>
        <p>이미지 URL: <a href={product.imageUrl} target="_blank" rel="noopener noreferrer">{product.imageUrl}</a></p>
      </div> */}
    </div>
  );
};

export default ProductDetailPage;

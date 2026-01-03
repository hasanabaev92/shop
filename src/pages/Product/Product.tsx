import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../../mock/fakeFetches"
import { useParams } from "react-router"
import ProductBigCard from "../../components/ProductBigCard/ProductBigCard";

function Product() {
  const paramses = useParams();
  // http://localhost:5173/product/b53d6a25-8446-479b-84df-0b39eece9401

  const {isPending, error, data } = useQuery({
    queryKey: ["BIGPRODUCT", paramses.ZZZ],
    queryFn: () => getProductById(paramses.ZZZ),
    enabled: !!paramses.ZZZ
  })

  if (isPending) return (<div>Загрузка...</div>);
  if (!data) return (<div>Товар не найден</div>);
  if (error) return (<div>Ошибка загрузки товара</div>);

  return (
    <>
      <div>Товар</div>
      <ProductBigCard product={data} />
    </>
  )
}

export default Product
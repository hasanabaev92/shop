import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../../mock/fakeFetches"
import { useParams } from "react-router"
import ProductBigCard from "../../components/ProductBigCard/ProductBigCard";

function Product() {
  const paramses = useParams();

  const {isPending, error, data } = useQuery({
    queryKey: ["BIGPRODUCT", paramses.id],
    queryFn: () => getProductById(paramses.id),
    enabled: !!paramses.id
  })

  if (!data) return;

  return (
    <>
        <div>Товар</div>
        <ProductBigCard id={data?.id} name={data?.name} lost={data?.lost} price={data?.price}  />
    </>
  )
}

export default Product
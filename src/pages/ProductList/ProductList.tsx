import { useQuery } from "@tanstack/react-query"
import { getProducts } from "../../mock/fakeFetches"
import ProductMiniCard from "../../components/ProductMiniCard/ProductMiniCard"
import './ProductList.css'

function ProductList() {
  const { isPending, error, data } = useQuery({
    queryKey:["PRODUCTS"],
    queryFn: getProducts
  })

  const ProductDiv = data?.map((x) => (
    <ProductMiniCard key={x.id} name={x.name} price={x.price} lost={x.lost}  />
  ))


  return (

    <>
        <div className="product-list-container">{ProductDiv}</div>
    </>
  )
}

export default ProductList
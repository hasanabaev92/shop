import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "react-router"

import { getProducts } from "../../mock/fakeFetches"

import ProductMiniCard from "../../components/ProductMiniCard/ProductMiniCard"

import type { ProductT } from "../../types/productType"

import './ProductList.css'


function ProductList() {
  const { isPending, error, data } = useQuery({
    queryKey:["PRODUCTS"],
    queryFn: getProducts
  })

  const navigate = useNavigate();

  const handleClickProduct = (id: ProductT['id']) => {
    navigate(`/product/${id}`)

  }

  const ProductDiv = data?.map((x) => (
      <ProductMiniCard onclickFn={() => handleClickProduct(x.id)} key={x.id} name={x.name} price={x.price} lost={x.lost}  />
  ))


  return (

    <>
        <div className="product-list-container">{ProductDiv}</div>
    </>
  )
}

export default ProductList
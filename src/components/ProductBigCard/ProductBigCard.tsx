import type { ProductT } from "../../types/productType"

type ProductBigCardContract = ProductT;

function ProductBigCard({id,name,price,lost}: ProductBigCardContract) {

  return (
    <div className="bigCard">
      <div>Артикул: {id}</div>
      <div>Имя: {name}</div>
      <div>Цена: {price}</div>
      <div>Остаток на складе:{lost} штук</div>
    </div>
  )
}

export default ProductBigCard
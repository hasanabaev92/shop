import type { ProductT } from "../../types/productType"
import './ProductMiniCard.css'

type ProductMiniCardContract = Omit<ProductT, 'id'>

function ProductMiniCard({name,price,lost}: ProductMiniCardContract) {

  return (
    <div className="card-mini">
      <div>{name}</div>
      <div>Цена: {price} руб.</div>
      <div>Остаток на складе: {lost} шт.</div>
    </div>
  )
}

export default ProductMiniCard
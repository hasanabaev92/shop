import type { ProductCartT } from "../../types/productType"

type ProductCartCardContract = ProductCartT;

function ProductCartCard({id,name,price, orderCount}: ProductCartCardContract) {

  return (
    <div className="bigCard">
      <div>Артикул: {id}</div>
      <div>Имя: {name}</div>
      <div>Цена: {price}</div>
      <div>Кол-во: {orderCount}</div>
    </div>
  )
}

export default ProductCartCard
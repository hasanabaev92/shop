import { useCartStore } from "../../store/cartStore";
import type { ProductT } from "../../types/productType"

type ProductBigCardContract = {product: ProductT};

function ProductBigCard({product}: ProductBigCardContract) {
  const addInCartFn = useCartStore((state) => state.addToCart)

  return (
    <div className="bigCard">
      <div>Артикул: {product.id}</div>
      <div>Имя: {product.name}</div>
      <div>Цена: {product.price}</div>
      <div>Остаток на складе:{product.lost} штук</div>
      <div>
        <button onClick={() => addInCartFn(product)}>В корзину</button>
      </div>
    </div>
  )
}

export default ProductBigCard
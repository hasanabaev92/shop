import { useShallow } from "zustand/shallow";

import { useCartStore } from "../../store/cartStore";
import type { ProductCartT } from "../../types/productType";

type ProductCartCardContract = {product:ProductCartT};

function ProductCartCard({product}: ProductCartCardContract) {
  const { addToCart, decOneProductFromCart, removeOneProductFromCart } =
    useCartStore(
      useShallow((state) => ({
        addToCart: state.addToCart,
        decOneProductFromCart: state.decOneProductFromCart,
        removeOneProductFromCart: state.removeOneProductFromCart,
      }))
    );

  return (
    <div className="bigCard">
      <div>Артикул: {product.id}</div>
      <div>Имя: {product.name}</div>
      <div>Цена: {product.price}</div>
      <div>Кол-во: {product.orderCount}</div>
      <div>
        <button onClick={() => decOneProductFromCart(product.id)}>минус</button>
        <button onClick={() => addToCart(product)}>плюс</button>
        <button onClick={() => removeOneProductFromCart(product.id)}>очистить</button>
      </div>
    </div>
  );
}

export default ProductCartCard;

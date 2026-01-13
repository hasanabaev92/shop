import { useShallow } from "zustand/shallow";
import { useCartStore } from "../../store/cartStore";
import ProductCartCard from "../../components/ProductCartCard/ProductCartCard";

function Cart() {
  const { productList, totalPrice, clearCart } = useCartStore(
    useShallow((state) => ({
      productList: state.productList,
      totalPrice: state.totalPrice(),
      clearCart: state.clearCart,
    }))
  );

  const productArray = Object.values(productList);


  const ProductDiv = productArray?.map((x) => (
      <ProductCartCard  product={x} />
  ))


  return (
    <>
      <div>Корзина</div>

      <div>
        <button onClick={clearCart}>Очистить корзину</button>
        <div>Итого: {totalPrice} руб.</div>
      </div>

      <div>
        {ProductDiv}
      </div>
    </>
  );
}

export default Cart;

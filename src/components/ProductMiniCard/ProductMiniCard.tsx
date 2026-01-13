import { useCartStore } from "../../store/cartStore";
import type { ProductT } from "../../types/productType";
import "./ProductMiniCard.css";

type ProductMiniCardContract = {
  product: ProductT;
  onclickFn: () => void;
};

function ProductMiniCard({ product, onclickFn }: ProductMiniCardContract) {
  const addInCartFn = useCartStore((state) => state.addToCart);
  const isInCart = useCartStore((state) => state.isInCart(product.id));

  const handleAddCart = (
    event: React.MouseEvent<HTMLButtonElement>,
    product: ProductT
  ) => {
    event.stopPropagation();
    addInCartFn(product);
  };

  return (
    <div onClick={onclickFn} className="card-mini">
      <div>{product.name}</div>
      <div>Цена: {product.price} руб.</div>
      <div>Остаток на складе: {product.lost} шт.</div>
      <div>
        {!isInCart && (
          <button onClick={($event) => handleAddCart($event, product)}>
            Добавить в корзину
          </button>
        )}

        {isInCart && <button disabled>Уже в корзине</button>}
      </div>
    </div>
  );
}

export default ProductMiniCard;

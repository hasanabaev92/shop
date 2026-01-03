import { create } from "zustand";

import type { CartT } from "../types/cartType";
import type { ProductT } from "../types/productType";

type CartStoreT = CartT & {
  addToCart: (product: ProductT) => void;
  decOneProductFromCart: (id: ProductT["id"]) => void;
  removeOneProductFromCart: (id: ProductT["id"]) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStoreT>((set, get, store) => ({
  productList: {},
  totalPrice: () => {
    const productList = get().productList;

    let sum = 0;

    if (Object.keys(productList).length === 0) return sum;

    for (const key in productList) {
      sum += productList[key].price * productList[key].orderCount;
    }

    return sum;
  },
  addToCart: (product) => {
    const productList = get().productList;

    if (!productList[product.id]) {
      set({
        productList: {
          ...productList,
          [product.id]: {
            ...product,
            orderCount: 1,
          },
        },
      });
    } else {
      set({
        productList: {
          ...productList,
          [product.id]: {
            ...productList[product.id],
            orderCount: productList[product.id].orderCount + 1,
          },
        },
      });
    }
  },
  decOneProductFromCart: (id) => {
    const productList = get().productList;
    if (productList[id]) {
      if (productList[id].orderCount > 1) {
        set({
          productList: {
            ...productList,
            [id]: {
              ...productList[id],
              orderCount: productList[id].orderCount - 1,
            },
          },
        });
      } else {
        get().removeOneProductFromCart(id);
      }
    }
  },
  removeOneProductFromCart: (id) => {
    const productList = get().productList;
    delete productList[id];

    set({
      productList: {
        ...productList,
      },
    });
  },
  clearCart: () => {
    set(store.getInitialState());
  },
}));

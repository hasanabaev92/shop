import type { ProductCartT } from "./productType";

export type CartT = {
  productList: {
    [key: ProductCartT["id"]]: ProductCartT;
  }
  totalPrice: number;
}

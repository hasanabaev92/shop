import { fakerRU as faker } from '@faker-js/faker';

import type { ProductListT, ProductT } from "../types/productType";

let productsDataBase: ProductListT = [];

function generateRandomRpoduct(): ProductT {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    lost: faker.number.int({min: 5, max: 1000}),
    price: faker.number.int({min: 100, max: 10000})
  }
}

export function generateRandomRpoducts() {
  const productsDataBaseRandom: ProductListT = faker.helpers.multiple(generateRandomRpoduct, {
    count: { min: 15, max: 25}
  })

  productsDataBase = [...productsDataBaseRandom]
}


export const getProducts = async () => {
  await new Promise((res) => setTimeout(res, 500)); // ждем 500мс

  return productsDataBase;
};

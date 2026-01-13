import { describe, it, expect, beforeEach } from 'vitest'

import type { ProductT } from '../types/productType'
import type { AddProductT } from '../types/schemas/addProduct.schema'
import {
  generateRandomRpoducts,
  getProducts,
  getProductById,
  addProductFn,
} from '../mock/fakeFetches'

const mockAddProduct: AddProductT = {
  name: 'New Product',
  price: 150,
  lost: 15,
}

beforeEach(() => {
  generateRandomRpoducts()
})

describe('Fake Fetches', () => {
  it('should generate random products', async () => {
    const products = await getProducts()

    expect(products).toBeDefined()
    expect(products.length).toBeGreaterThanOrEqual(15)
    expect(products.length).toBeLessThanOrEqual(25)
  })

  it('should get all products', async () => {
    const products = await getProducts()

    expect(Array.isArray(products)).toBe(true)
    expect(products.length).toBeGreaterThan(0)
    expect(products[0]).toHaveProperty('id')
    expect(products[0]).toHaveProperty('name')
    expect(products[0]).toHaveProperty('price')
    expect(products[0]).toHaveProperty('lost')
  })

  it('should get product by id', async () => {
    const products = await getProducts()
    const productId = products[0].id

    const product = await getProductById(productId)

    expect(product).toBeDefined()
    expect(product?.id).toBe(productId)
  })

  it('should return undefined for non-existent product id', async () => {
    const product = await getProductById('non-existent-id')

    expect(product).toBeUndefined()
  })

  it('should return undefined when id is undefined', async () => {
    const product = await getProductById(undefined)

    expect(product).toBeUndefined()
  })

  it('should add new product', async () => {
    const productsBefore = await getProducts()
    const lengthBefore = productsBefore.length

    const result = await addProductFn(mockAddProduct)

    expect(result.code).toBe(200)
    expect(result.newId).toBeDefined()

    const productsAfter = await getProducts()
    expect(productsAfter.length).toBe(lengthBefore + 1)

    const newProduct = productsAfter.find((p: ProductT) => p.id === result.newId)
    expect(newProduct).toBeDefined()
    expect(newProduct?.name).toBe(mockAddProduct.name)
    expect(newProduct?.price).toBe(mockAddProduct.price)
    expect(newProduct?.lost).toBe(mockAddProduct.lost)
  })

  it('should generate product with valid structure', async () => {
    const products = await getProducts()

    expect(products[0]).toHaveProperty('id')
    expect(products[0]).toHaveProperty('name')
    expect(products[0]).toHaveProperty('price')
    expect(products[0]).toHaveProperty('lost')

    expect(typeof products[0].id).toBe('string')
    expect(typeof products[0].name).toBe('string')
    expect(typeof products[0].price).toBe('number')
    expect(typeof products[0].lost).toBe('number')
  })
})

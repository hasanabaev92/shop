import { describe, it, expect, beforeEach } from 'vitest'

import type { ProductT } from '../types/productType'
import { useCartStore } from './cartStore'

const mockProduct1: ProductT = {
  id: '1',
  name: 'Test Product 1',
  price: 100,
  lost: 10,
}

const mockProduct2: ProductT = {
  id: '2',
  name: 'Test Product 2',
  price: 200,
  lost: 20,
}

beforeEach(() => {
  useCartStore.getState().clearCart()
})

describe('CartStore', () => {
  it('should initialize with empty product list', () => {
    const { productList } = useCartStore.getState()
    expect(productList).toEqual({})
  })

  it('should add product to cart', () => {
    const { addToCart } = useCartStore.getState()
    addToCart(mockProduct1)

    const { productList } = useCartStore.getState()
    expect(productList[mockProduct1.id]).toEqual({
      ...mockProduct1,
      orderCount: 1,
    })
  })

  it('should increment order count when adding same product again', () => {
    const { addToCart } = useCartStore.getState()
    addToCart(mockProduct1)
    addToCart(mockProduct1)

    const { productList } = useCartStore.getState()
    expect(productList[mockProduct1.id].orderCount).toBe(2)
  })

  it('should calculate total price correctly', () => {
    const { addToCart, totalPrice } = useCartStore.getState()
    addToCart(mockProduct1)
    addToCart(mockProduct1)
    addToCart(mockProduct2)

    expect(totalPrice()).toBe(100 * 2 + 200 * 1)
  })

  it('should return 0 for empty cart total price', () => {
    const { totalPrice } = useCartStore.getState()
    expect(totalPrice()).toBe(0)
  })

  it('should decrement order count', () => {
    const { addToCart, decOneProductFromCart } = useCartStore.getState()
    addToCart(mockProduct1)
    addToCart(mockProduct1)

    decOneProductFromCart(mockProduct1.id)

    const { productList } = useCartStore.getState()
    expect(productList[mockProduct1.id].orderCount).toBe(1)
  })

  it('should remove product when decrementing from 1', () => {
    const { addToCart, decOneProductFromCart, isInCart } = useCartStore.getState()
    addToCart(mockProduct1)

    decOneProductFromCart(mockProduct1.id)

    expect(isInCart(mockProduct1.id)).toBe(false)
  })

  it('should remove product from cart', () => {
    const { addToCart, removeOneProductFromCart, isInCart } = useCartStore.getState()
    addToCart(mockProduct1)
    addToCart(mockProduct1)

    removeOneProductFromCart(mockProduct1.id)

    expect(isInCart(mockProduct1.id)).toBe(false)
  })

  it('should clear cart', () => {
    const { addToCart, clearCart, productList } = useCartStore.getState()
    addToCart(mockProduct1)
    addToCart(mockProduct2)

    clearCart()

    expect(productList).toEqual({})
  })

  it('should check if product is in cart', () => {
    const { addToCart, isInCart } = useCartStore.getState()

    expect(isInCart(mockProduct1.id)).toBe(false)

    addToCart(mockProduct1)

    expect(isInCart(mockProduct1.id)).toBe(true)
  })
})

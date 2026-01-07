import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/react'

import type { ProductT } from '../../types/productType'
import ProductMiniCard from './ProductMiniCard'
import { useCartStore } from '../../store/cartStore'

const mockProduct: ProductT = {
  id: '1',
  name: 'Test Product',
  price: 100,
  lost: 10,
}

const mockOnclickFn = vi.fn()

beforeEach(() => {
  mockOnclickFn.mockClear()
  useCartStore.getState().clearCart()
})

describe('ProductMiniCard', () => {
  it('should render product information', () => {
    const { getByText } = render(
      <ProductMiniCard product={mockProduct} onclickFn={mockOnclickFn} />,
    )

    expect(getByText('Test Product')).toBeInTheDocument()
    expect(getByText('Цена: 100 руб.')).toBeInTheDocument()
    expect(getByText('Остаток на складе: 10 шт.')).toBeInTheDocument()
  })

  it('should render "Add to cart" button when product is not in cart', () => {
    const { getByText } = render(
      <ProductMiniCard product={mockProduct} onclickFn={mockOnclickFn} />,
    )

    expect(getByText('Добавить в корзину')).toBeInTheDocument()
  })

  it('should render "Already in cart" disabled button when product is in cart', () => {
    useCartStore.getState().addToCart(mockProduct)

    const { getByText } = render(
      <ProductMiniCard product={mockProduct} onclickFn={mockOnclickFn} />,
    )

    expect(getByText('Уже в корзине')).toBeInTheDocument()
    const button = getByText('Уже в корзине')
    expect(button).toBeDisabled()
  })

  it('should call onclickFn when card is clicked', () => {
    const { container } = render(
      <ProductMiniCard product={mockProduct} onclickFn={mockOnclickFn} />,
    )

    const card = container.querySelector('.card-mini') as HTMLElement
    fireEvent.click(card)

    expect(mockOnclickFn).toHaveBeenCalledTimes(1)
  })

  it('should add product to cart when add button is clicked', () => {
    const { getByText } = render(
      <ProductMiniCard product={mockProduct} onclickFn={mockOnclickFn} />,
    )

    const addButton = getByText('Добавить в корзину')
    fireEvent.click(addButton)

    expect(useCartStore.getState().isInCart(mockProduct.id)).toBe(true)
  })
})

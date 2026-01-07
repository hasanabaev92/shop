import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router'

import TopBar from './TopBar'

describe('TopBar', () => {
  it('should render navigation buttons', () => {
    const { getByText } = render(
      <BrowserRouter>
        <TopBar />
      </BrowserRouter>,
    )

    expect(getByText('Список товаров')).toBeInTheDocument()
    expect(getByText('Админ')).toBeInTheDocument()
    expect(getByText('Корзина')).toBeInTheDocument()
  })

  it('should have correct links', () => {
    const { container } = render(
      <BrowserRouter>
        <TopBar />
      </BrowserRouter>,
    )

    const links = container.querySelectorAll('a')
    expect(links[0].getAttribute('href')).toBe('/')
    expect(links[1].getAttribute('href')).toBe('/admin')
    expect(links[2].getAttribute('href')).toBe('/Cart')
  })
})

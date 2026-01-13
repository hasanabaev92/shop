import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { BrowserRouter, Routes, Route } from 'react-router'

import Layout from './Layout'

const TestChild = () => <div>Test Content</div>

describe('Layout', () => {
  it('should render TopBar', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TestChild />} />
          </Route>
        </Routes>
      </BrowserRouter>,
    )

    expect(getByText('Список товаров')).toBeInTheDocument()
    expect(getByText('Админ')).toBeInTheDocument()
    expect(getByText('Корзина')).toBeInTheDocument()
  })

  it('should render Outlet for nested routes', () => {
    const { getByText, container } = render(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TestChild />} />
          </Route>
        </Routes>
      </BrowserRouter>,
    )

    expect(getByText('Test Content')).toBeInTheDocument()
    expect(container.querySelector('.layout')).toBeInTheDocument()
  })
})

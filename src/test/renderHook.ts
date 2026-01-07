export function renderHook<Result>(callback: () => Result): {
  result: { current: Result }
  rerender: () => void
  unmount: () => void
} {
  const result = { current: callback() }

  return {
    result,
    rerender: () => {
      result.current = callback()
    },
    unmount: () => {
      // Cleanup if needed
    },
  }
}


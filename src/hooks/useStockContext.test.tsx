import {useStockContext, StockContext} from './useStockContext'
import {render} from '@testing-library/react'

const TestComponent = () => {
  const context = useStockContext()
  expect(context).toBeDefined()
  return null
}

describe('useStockContext', () => {
  it('should return a valid context when used within StockContextProvider', () => {
    render(
      <StockContext.Provider
        value={{
          stocks: [],
          subscribe: jest.fn(),
          unsubscribe: jest.fn,
          error: '',
        }}
      >
        <TestComponent />
      </StockContext.Provider>
    )
  })

  it('should throw an error when used outside of StockContextProvider', () => {
    expect(() => render(<TestComponent />)).toThrow('useStockContext must be used within a StockContextProvider')
  })
})

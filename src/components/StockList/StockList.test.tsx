import {render} from '@testing-library/react'
import StockList from '@/components/StockList'
import * as StockContextHook from '@/hooks/useStockContext'
import mockStocks from '@/__mocks__/stocks'

const renderComponent = () => {
  return render(
    <StockContextHook.StockContext.Provider
      value={{
        stocks: [],
        subscribe: jest.fn(),
        unsubscribe: jest.fn(),
        error: '',
      }}
    >
      <StockList />
    </StockContextHook.StockContext.Provider>
  )
}

describe('<StockList>', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render stock list when stocks are available', () => {
    jest
      .spyOn(StockContextHook, 'useStockContext')
      .mockImplementation(() => ({stocks: mockStocks, unsubscribe: jest.fn(), error: '', subscribe: jest.fn()}))

    const {getByText} = renderComponent()
    expect(getByText('ISIN')).toBeInTheDocument()
    expect(getByText('Price')).toBeInTheDocument()
    expect(getByText('Bid')).toBeInTheDocument()
    expect(getByText('Ask')).toBeInTheDocument()
  })

  it('should display error message when error is present', () => {
    const mockError = 'Error fetching stocks'
    jest
      .spyOn(StockContextHook, 'useStockContext')
      .mockImplementation(() => ({stocks: mockStocks, unsubscribe: jest.fn(), error: mockError, subscribe: jest.fn()}))

    const {getByText} = renderComponent()
    expect(getByText(mockError)).toBeInTheDocument()
  })

  it('should show not subscribed to any stocks when stocks array is empty', () => {
    jest
      .spyOn(StockContextHook, 'useStockContext')
      .mockImplementation(() => ({stocks: [], unsubscribe: jest.fn(), error: '', subscribe: jest.fn()}))

    const {getByText} = renderComponent()
    expect(getByText('You have not subscribed to any stocks')).toBeInTheDocument()
  })
})

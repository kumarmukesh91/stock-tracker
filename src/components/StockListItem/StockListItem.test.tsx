import {render, fireEvent} from '@testing-library/react'
import mockStocks from '@/__mocks__/stocks'
import StockListItem from '@/components/StockListItem'

describe('<StockListItem/>', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render stock information correctly when valid data is provided', () => {
    const unsubscribe = jest.fn()
    const stock = mockStocks[0]
    const {getByText} = render(<StockListItem stock={stock} unsubscribe={unsubscribe} />)

    expect(getByText(stock.isin)).toBeInTheDocument()
    expect(getByText(stock.price)).toBeInTheDocument()
    expect(getByText(stock.bid)).toBeInTheDocument()
    expect(getByText(stock.ask)).toBeInTheDocument()
  })

  it('should call unsubscribe function with correct ISIN when button is clicked', () => {
    const unsubscribe = jest.fn()
    const stock = mockStocks[1]

    const {getByRole} = render(<StockListItem stock={stock} unsubscribe={unsubscribe} />)

    fireEvent.click(getByRole('button'))

    expect(unsubscribe).toHaveBeenCalledWith(stock.isin)
  })
})

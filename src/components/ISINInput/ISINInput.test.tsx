import {render, fireEvent} from '@testing-library/react'
import {StockContext} from '@/hooks/useStockContext'
import ISINInput from '@/components/ISINInput'

const subscribeFn = jest.fn()
const unsSubscribeFn = jest.fn()

const renderComponent = () => {
  return render(
    <StockContext.Provider
      value={{
        stocks: [],
        subscribe: subscribeFn,
        unsubscribe: unsSubscribeFn,
        error: '',
      }}
    >
      <ISINInput />
    </StockContext.Provider>
  )
}

describe('<ISINInput/>', () => {
  it('should subscribe stock successfully when a valid ISIN is submitted', () => {
    const {getByPlaceholderText, getByText} = renderComponent()
    const input = getByPlaceholderText('Enter ISIN (eg: US0378331005)') as HTMLInputElement
    const button = getByText('Subscribe')

    fireEvent.change(input, {target: {value: 'US0378331005'}})
    fireEvent.click(button)

    expect(subscribeFn).toHaveBeenCalledWith('US0378331005')
    expect(input.value).toBe('')
  })

  it('should clear error message after successful subscription', () => {
    const {getByPlaceholderText, getByText, queryByText} = renderComponent()
    const input = getByPlaceholderText('Enter ISIN (eg: US0378331005)')
    const button = getByText('Subscribe')

    fireEvent.change(input, {target: {value: 'US0378331005'}})
    fireEvent.click(button)

    expect(queryByText('Invalid ISIN. Must be a 12-character alphanumeric code.')).toBeNull()
    expect(queryByText('Stock is already subscribed.')).toBeNull()
  })

  it('should display error message when ISIN is empty', () => {
    const {getByText} = renderComponent()
    const button = getByText('Subscribe')

    fireEvent.click(button)

    expect(getByText('Invalid ISIN. Must be a 12-character alphanumeric code.')).toBeInTheDocument()
  })

  it('should display error message when ISIN is invalid', () => {
    const {getByPlaceholderText, getByText} = renderComponent()
    const input = getByPlaceholderText('Enter ISIN (eg: US0378331005)')
    const button = getByText('Subscribe')

    fireEvent.change(input, {target: {value: 'INVALIDISIN'}})
    fireEvent.click(button)

    expect(getByText('Invalid ISIN. Must be a 12-character alphanumeric code.')).toBeInTheDocument()
  })
})

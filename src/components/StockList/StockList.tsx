import Typography from '@/elements/typography'
import {useStockContext} from '@/hooks/useStockContext'
import StockListItem from '@/components/StockListItem'
import './StockList.scss'

// It renders a list of stocks that the user has subscribed to.
const headers = ['ISIN', 'Price', 'Bid', 'Ask']
export const StockList = () => {
  const {stocks, unsubscribe, error} = useStockContext()

  // If the user has not subscribed to any stocks, display a message
  if (!stocks.length) {
    return (
      <Typography variant="h3" component="h3" aria-live="assertive" aria-atomic="true" className="no-subscription">
        You have not subscribed to any stocks
      </Typography>
    )
  }

  return (
    <>
      {error && (
        <Typography variant="body2" status="error" className="server-error">
          {error}
        </Typography>
      )}

      <div className="stock-list">
        <div className="stock-list-header">
          {headers.map((header) => (
            <Typography variant="body1" className={`stock-attribute ${header}`} key={header}>
              {header}
            </Typography>
          ))}
          <Typography className="stock-attribute" />
        </div>
        {stocks.map((stock) => (
          <StockListItem stock={stock} unsubscribe={unsubscribe} key={stock.isin} />
        ))}
      </div>
    </>
  )
}

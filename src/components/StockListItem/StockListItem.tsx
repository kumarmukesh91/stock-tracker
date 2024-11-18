import Typography from '@/elements/typography'
import {TrashIcon} from '@/elements/icons'
import {Stock} from '@/types/Stock'
import './StockListItem.scss'

type StockListItemProps = {
  stock: Stock
  unsubscribe: (isin: string) => void
}

// It renders a single stock item with its ISIN, price, bid, and ask values.
export const StockListItem = ({stock, unsubscribe}: StockListItemProps) => {
  return (
    <div className="stock-list-item">
      <Typography variant="body2" className="stock-attribute isin">
        {stock.isin}
      </Typography>
      <Typography variant="body2" className="stock-attribute price">
        {stock.price}
      </Typography>
      <Typography variant="body2" className="stock-attribute bid">
        {stock.bid}
      </Typography>
      <Typography variant="body2" className="stock-attribute ask">
        {stock.ask}
      </Typography>
      <div className="stock-attribute unsubscribe" aria-label={`Unsubscribe from stock ${stock.isin}`}>
        <button onClick={() => unsubscribe(stock.isin)} aria-label="unsubscribe">
          <TrashIcon height="1.2rem" width="1.2rem" />
        </button>
      </div>
    </div>
  )
}

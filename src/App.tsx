import ISINInput from './components/ISINInput'
import StockList from './components/StockList'
import {useStockService} from './hooks/useStockService'
import {StockContext} from './hooks/useStockContext'
import './App.scss'

const App = () => {
  const ISINService = useStockService()

  // It provides the StockContext to its children components.
  return (
    <StockContext.Provider value={ISINService}>
      <div className="stock-watch">
        <h1 className="hero-title">Stock Watch List</h1>
        <ISINInput />
        <StockList />
      </div>
    </StockContext.Provider>
  )
}

export default App

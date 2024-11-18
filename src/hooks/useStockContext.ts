import {useContext, createContext} from 'react'
import {useStockService} from './useStockService'

export const StockContext = createContext<ReturnType<typeof useStockService> | undefined>(undefined)

// This custom hook is used to access the StockContext
export function useStockContext() {
  const context = useContext(StockContext)
  // Throws an error if used outside of the StockContextProvider
  if (!context) {
    throw new Error('useStockContext must be used within a StockContextProvider')
  }
  // It returns the context value which includes the stocks, error, subscribe, and unsubscribe functions
  return context
}

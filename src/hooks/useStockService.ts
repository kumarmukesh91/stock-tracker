import {useEffect, useMemo, useRef, useState} from 'react'
import {Stock} from '@/types/Stock'
import {usePersistenceState} from './usePersistenceState'

const WEB_SOCKET_URL = 'ws://localhost:8425'
const getDefaultStockValue = (isin: string): Stock => ({
  isin,
  ask: 0,
  bid: 0,
  price: 0,
})

// This custom hook is used to fetch stock data from the server and manage the subscription list.
export const useStockService = () => {
  const wsRef = useRef<WebSocket | null>(null)
  // Store the stock data in a dictionary with the ISIN as the key for quick access
  const [stocks, setStocks] = useState<Record<string, Stock>>({})
  // Persist the subscription list (list of ISIN) in the browser's local storage
  const [subscriptionList, setSubscriptionList] = usePersistenceState<Stock['isin'][]>('stock-watch-list', [])
  const [error, setError] = useState('')

  // This function is used to subscribe to a stock by its ISIN
  const subscribe = (isin: string) => {
    wsRef.current?.send(JSON.stringify({subscribe: isin}))

    // Add the stock to the subscription list and set the default value for the stock
    setStocks({
      ...stocks,
      [isin]: getDefaultStockValue(isin),
    })
    setSubscriptionList([...subscriptionList, isin])
  }

  // This function is used to unsubscribe from a stock by its ISIN
  const unsubscribe = (isin: string) => {
    wsRef.current?.send(JSON.stringify({unsubscribe: isin}))

    // Remove the stock from the subscription list and the stock dictionary
    setSubscriptionList(subscriptionList.filter((sub) => sub !== isin))
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {[isin]: _, ...newStocks} = stocks
    setStocks(newStocks)
  }

  //Generate a new list of stocks based on the subscription list for rendering
  //Memoization is used to prevent unnecessary re-renders
  const subscribedStockList = useMemo(() => {
    const stockList: Stock[] = []
    for (const isin of subscriptionList) {
      if (stocks[isin]) stockList.push(stocks[isin])
    }

    return stockList
  }, [subscriptionList, stocks])

  useEffect(() => {
    // Create a new WebSocket connection if it does not exist or is closed
    if (!wsRef.current || wsRef.current.readyState === WebSocket.CLOSED) {
      wsRef.current = new WebSocket(WEB_SOCKET_URL)
    }

    // Handle incoming messages from the server
    wsRef.current.onmessage = (event) => {
      try {
        // Parse the incoming message and update the stock data
        const data = JSON.parse(event.data)

        // Format the price, bid, and ask values to 2 decimal places
        data.bid = parseFloat(data.bid).toFixed(2)
        data.ask = parseFloat(data.ask).toFixed(2)
        data.price = parseFloat(data.price).toFixed(2)

        setStocks((prevStocks) => ({...prevStocks, [data.isin]: data}))
      } catch (error) {
        console.error('Error parsing message from server:', error)
      }
    }

    // Handle WebSocket connection events
    wsRef.current.onopen = () => {
      // Subscribe to the stocks in the subscription list if the user previously subscribed to any
      if (subscriptionList.length) {
        subscriptionList.forEach((sub) => wsRef.current?.send(JSON.stringify({subscribe: sub})))
      }
    }

    wsRef.current.onerror = () => {
      setError('Error connecting to server. Prices may not be up to date.')
    }

    wsRef.current.onclose = () => {
      setError('Server connection closed. Prices may not be up to date.')
    }

    // Close the WebSocket connection when the component is unmounted
    return () => {
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current?.close()
      }
    }
  }, [])

  return {subscribe, unsubscribe, stocks: subscribedStockList, error}
}

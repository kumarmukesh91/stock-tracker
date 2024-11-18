import {useEffect, useState} from 'react'

// This custom hook is used to persist the state of a component in the browser's local storage.
export const usePersistenceState = <T>(key: string, defaultValue: T) => {
  const [state, setState] = useState<T>(() => {
    const persistedValue = localStorage.getItem(key)
    try {
      // If the value is not found in local storage, return the default value
      return persistedValue ? JSON.parse(persistedValue) : defaultValue
    } catch {
      // If there is an error parsing the JSON, return the default value
      console.error(`Unable to parse JSON for key ${key}`)
      return defaultValue
    }
  })

  useEffect(() => {
    try {
      // Store the state in local storage
      localStorage.setItem(key, JSON.stringify(state))
    } catch {
      // If there is an error storing the state, log an error message
      console.error(`Unable to persist state for key ${key}`)
    }
  }, [key, state])

  // using as const to infer the correct type for the returned array
  return [state, setState] as const
}

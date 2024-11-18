import {renderHook} from '@testing-library/react'
import {usePersistenceState} from './usePersistenceState'

describe('usePersistenceState', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })
  it('should initialize state with default value when no persisted value exists', () => {
    const key = 'test-key'
    const defaultValue = 'default'
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null)

    const {result} = renderHook(() => usePersistenceState(key, defaultValue))

    expect(result.current[0]).toBe(defaultValue)
  })

  it('should handle invalid JSON data in localStorage gracefully', () => {
    const key = 'testKey'
    const defaultValue = 'default'
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('invalid JSON')
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {})

    const {result} = renderHook(() => usePersistenceState(key, defaultValue))

    expect(result.current[0]).toBe(defaultValue)
    expect(consoleErrorSpy).toHaveBeenCalledWith(`Unable to parse JSON for key ${key}`)

    consoleErrorSpy.mockRestore()
  })
})

import {useState} from 'react'
import Typography from '@/elements/typography'
import {useStockContext} from '@/hooks/useStockContext'
import {validateIsin} from '@/utils/inputValidator'
import './ISINInput.scss'

// It renders a form with an input field for the user to enter an ISIN code.
// It also has a button to submit the form.
export const ISINInput = () => {
  const [isin, setIsin] = useState('')
  const [error, setError] = useState('')
  const {stocks, subscribe} = useStockContext()

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsin(e.target.value)
    if (!e.target.value.length) setError('')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Prevent submitting the form if the ISIN is invalid or already subscribed
    if (!isin || !validateIsin(isin)) {
      setError('Invalid ISIN. Must be a 12-character alphanumeric code.')
      return
    }

    // Prevent submitting the form if the ISIN is already subscribed
    if (stocks.some((stock) => stock.isin === isin)) {
      setError('Stock is already subscribed.')
      return
    }

    subscribe(isin)
    setIsin('')
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="isin-form">
      <label htmlFor="isin" className="label-isin">
        <div className="isin-input error">
          <input
            type="text"
            name="isin"
            id="isin"
            placeholder="Enter ISIN (eg: US0378331005)"
            aria-required="true"
            aria-invalid={!!error}
            value={isin}
            onChange={onInputChange}
            autoFocus={true}
          />
          <button type="submit" aria-label="Subscribe to stock">
            Subscribe
          </button>
        </div>
        <Typography variant="body2" status="error" className="input-error">
          {error}
        </Typography>
      </label>
    </form>
  )
}

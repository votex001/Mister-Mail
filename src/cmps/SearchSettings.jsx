import { useEffect, useRef, useState } from 'react'
import { mailService } from '../services/mail.service'
import { useSearchParams } from 'react-router-dom'

export function SearchSettings() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [beforeValue, setBeforeValue] = useState(
    searchParams.get('before') || new Date().toLocaleDateString('en-CA')
  )
  const [afterValue, setAfterValue] = useState(searchParams.get('after'))
  const [txtInput, setTxtInput] = useState(searchParams.get('txt') || '')
  const selectRef = useRef()
  function disabled() {
    if (
      beforeValue !== new Date().toLocaleDateString('en-CA') ||
      afterValue ||
      txtInput
    ) {
      return false
    } else {
      return true
    }
  }
  disabled()
  useEffect(() => {
    if (
      searchParams.get('before') &&
      new Date(Number(searchParams.get('before'))).getTime()
    ) {
      const convertToDate = new Date(
        Number(searchParams.get('before'))
      ).toLocaleDateString('en-CA')
      setBeforeValue(convertToDate)
    }
  }, [searchParams])

  function onSelect(e) {
    const convertValueDate = mailService.convertOption(e.target.value)
    setAfterValue(convertValueDate)
  }
  function onSubmit() {
    const before =
      beforeValue && beforeValue !== new Date().toLocaleDateString('en-CA')
        ? new Date(beforeValue).getTime()
        : ''

    setSearchParams((prev) => {
      if (before) {
        prev.set('before', before)
      } else {
        prev.delete('before')
      }
      if (afterValue) {
        prev.set('after', afterValue)
      } else {
        prev.delete('after')
      }
      return prev
    })

    if (txtInput) {
      setSearchParams((prev) => {
        prev.set('txt', txtInput)
        return prev
      })
    }
  }
  function onReset() {
    setSearchParams((prev) => {
      prev.delete('before')
      prev.delete('after')
      prev.delete('txt')
      return prev
    })
    selectRef.current.value = 'default'
    setTxtInput('')
    setBeforeValue(new Date().toLocaleDateString('en-CA'))
  }

  return (
    <section className="search-settings">
      <div className="search-form">
        <label htmlFor="txt" className="include-lbl">
          Include:
        </label>

        <input
          id="txt"
          className="settings-txt"
          value={txtInput}
          onChange={(e) => setTxtInput(e.target.value)}
          autoComplete="off"
        ></input>

        <h1>After:</h1>
        <select
          onChange={onSelect}
          defaultValue="default"
          className="before-date"
          ref={selectRef}
        >
          <option value={'default'} disabled>
            Before
          </option>
          <option value={'1day'}>1 day</option>
          <option value={'3days'}>3 days</option>
          <option value={'1week'}>1 week</option>
          <option value={'2weeks'}>2 weeks</option>
          <option value={'1month'}>1 month</option>
          <option value={'2month'}>2 month</option>
          <option value={'6month'}>6 month</option>
          <option value={'1year'}>1 year</option>
        </select>

        <h1>Before:</h1>
        <input
          type="date"
          className="after-date"
          value={`${beforeValue}`}
          min={new Date(afterValue).toLocaleDateString('en-CA')}
          max={new Date().toLocaleDateString('en-CA')}
          onChange={(e) => setBeforeValue(e.target.value)}
        />

        <div className="buttons">
          <button
            className="settings-reset"
            onClick={onReset}
            disabled={disabled()}
          >
            Reset
          </button>

          <button className="settings-submit" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
    </section>
  )
}

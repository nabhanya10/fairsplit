import { useState, useEffect, useCallback } from 'react'

/**
 * Persist React state to localStorage under the given key.
 * Falls back gracefully if localStorage is unavailable.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // ignore write errors (e.g. storage full or unavailable)
    }
  }, [key, value])

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(key)
    } catch {
      // ignore
    }
    setValue(initialValue)
  }, [key, initialValue])

  return [value, setValue, remove]
}

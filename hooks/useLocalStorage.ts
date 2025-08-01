import { useState, useEffect } from 'react'

/**
 * Core hook for localStorage functionality - reusable across SaaS projects
 */
export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] => {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

/**
 * Hook to clear specific localStorage keys
 */
export const useClearLocalStorage = () => {
  const clearKeys = (keys: string[]) => {
    if (typeof window !== 'undefined') {
      keys.forEach(key => {
        window.localStorage.removeItem(key)
      })
    }
  }

  const clearAll = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.clear()
    }
  }

  return { clearKeys, clearAll }
} 
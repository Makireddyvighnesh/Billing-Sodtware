// src/utils/localStorage.js

export const getData = (key) => {
    if (typeof window === 'undefined') return null
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  }
  
  export const setData = (key, data) => {
    if (typeof window === 'undefined') return
    localStorage.setItem(key, JSON.stringify(data))
  }
  
// src/app/items/page.js
"use client";

import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import styles from '../../styles/Items.module.css'

const Items = () => {
  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [filteredItems, setFilteredItems] = useState([])

  const [newItemName, setNewItemName] = useState('')
  const [newItemPrice, setNewItemPrice] = useState('')

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || []
    setItems(storedItems)
  }, [])

  useEffect(() => {
    setFilteredItems(
      items.filter(item =>
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.id?.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, items])

  const addItem = () => {
    if (newItemName && newItemPrice) {
      const newItem = {
        id: `ITM-${Date.now()}`,
        name: newItemName,
        price: parseFloat(newItemPrice)
      }
      const updatedItems = [...items, newItem]
      setItems(updatedItems)
      localStorage.setItem('items', JSON.stringify(updatedItems))
      setNewItemName('')
      setNewItemPrice('')
    } else {
      alert('Please enter both name and price.')
    }
  }

  const deleteItem = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const updatedItems = items.filter(item => item.id !== id)
      setItems(updatedItems)
      localStorage.setItem('items', JSON.stringify(updatedItems))
    }
  }

  const exportCSV = () => {
    const csv = Papa.unparse(items)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'items.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className={styles.items}>
      <h1>Items</h1>
      <div className={styles.header}>
        <div className={styles.addItem}>
          <input
            type="text"
            placeholder="Item Name"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={newItemPrice}
            onChange={(e) => setNewItemPrice(e.target.value)}
          />
          <button onClick={addItem}>Add Item</button>
        </div>
        <div className={styles.searchExport}>
          <input
            type="text"
            placeholder="Search by ID or Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={exportCSV}>Export to CSV</button>
        </div>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Name</th>
            <th>Price ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.price.toFixed(2)}</td>
                <td>
                  {/* Edit functionality can be added here */}
                  <button onClick={() => deleteItem(item.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No items found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Items

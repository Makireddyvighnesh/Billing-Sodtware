
// src/app/generate-bill/page.js

"use client";

import { useState, useEffect } from 'react'
import Papa from 'papaparse'
import styles from '../../styles/GenerateBill.module.css'

const GenerateBill = () => {
  const [items, setItems] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [customerContact, setCustomerContact] = useState('')
  const [date, setDate] = useState('')
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || []
    setItems(storedItems)
    const today = new Date().toISOString().split('T')[0]
    setDate(today)
  }, [])

  useEffect(() => {
    const calcTotal = selectedItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    setTotal(calcTotal)
  }, [selectedItems])

  const toggleItem = (item) => {
    const exists = selectedItems.find(i => i.id === item.id)
    if (exists) {
      setSelectedItems(selectedItems.filter(i => i.id !== item.id))
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }])
    }
  }

  const updateQuantity = (id, quantity) => {
    setSelectedItems(selectedItems.map(item => item.id === id ? { ...item, quantity: parseInt(quantity) } : item))
  }

  const saveInvoice = () => {
    if (!customerName) {
      alert('Please enter customer name.')
      return
    }
    if (selectedItems.length === 0) {
      alert('Please select at least one item.')
      return
    }
    const invoice = {
      id: `INV-${Date.now()}`,
      date,
      customer: customerName,
      contact: customerContact,
      items: selectedItems,
      total,
      status: 'Pending',
    }
    const storedInvoices = JSON.parse(localStorage.getItem('invoices')) || []
    localStorage.setItem('invoices', JSON.stringify([...storedInvoices, invoice]))
    alert('Invoice saved successfully!')
    window.location.href = '/invoices'
  }

  const exportCSV = () => {
    const invoiceData = {
      InvoiceID: `INV-${Date.now()}`,
      Date: date,
      Customer: customerName,
      Contact: customerContact,
      Items: selectedItems.map(item => `${item.name} x${item.quantity}`).join(', '),
      Total: total.toFixed(2),
    }
    const csv = Papa.unparse([invoiceData])
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `${invoiceData.InvoiceID}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const printBill = () => {
    window.print()
  }

  return (
    <div className={styles.generateBill}>
      <h1>Generate Bill</h1>
      <div className={styles.customerDetails}>
        <label>Customer Name:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter customer name"
        />
        <label>Contact (Optional):</label>
        <input
          type="text"
          value={customerContact}
          onChange={(e) => setCustomerContact(e.target.value)}
          placeholder="Enter contact information"
        />
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className={styles.itemsSelection}>
        <h2>Select Items</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Select</th>
              <th>Item Name</th>
              <th>Price ($)</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map(item => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.find(i => i.id === item.id) ? true : false}
                      onChange={() => toggleItem(item)}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>
                    {selectedItems.find(i => i.id === item.id) ? (
                      <input
                        type="number"
                        min="1"
                        value={selectedItems.find(i => i.id === item.id).quantity}
                        onChange={(e) => updateQuantity(item.id, e.target.value)}
                        className={styles.quantityInput}
                      />
                    ) : (
                      '-'
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No items available. Please add items first.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className={styles.summary}>
        <h3>Total: ${total.toFixed(2)}</h3>
      </div>
      <div className={styles.actions}>
        <button onClick={saveInvoice}>Save Invoice</button>
        <button onClick={exportCSV}>Export to CSV</button>
        <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={printBill}>Print Bill</button>
      </div>
    </div>
  )
}

export default GenerateBill

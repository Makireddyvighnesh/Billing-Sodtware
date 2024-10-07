// src/app/invoices/page.js
"use client";
import { useState, useEffect } from 'react'
import styles from '../../styles/Invoices.module.css'

const Invoices = () => {
  const [invoices, setInvoices] = useState([])
  const [search, setSearch] = useState('')
  const [filteredInvoices, setFilteredInvoices] = useState([])

  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem('invoices')) || []
    setInvoices(storedInvoices)
  }, [])

  useEffect(() => {
    setFilteredInvoices(
      invoices.filter(inv =>
        inv.id.toLowerCase().includes(search.toLowerCase()) ||
        inv.customer.toLowerCase().includes(search.toLowerCase())
      )
    )
  }, [search, invoices])

  const deleteInvoice = (id) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      const updatedInvoices = invoices.filter(inv => inv.id !== id)
      setInvoices(updatedInvoices)
      localStorage.setItem('invoices', JSON.stringify(updatedInvoices))
    }
  }

  return (
    <div className={styles.invoices}>
      <h1>Invoices</h1>
      <div className={styles.header}>
        <button onClick={() => window.location.href='/generate-bill'}>Create New Invoice</button>
        <input
          type="text"
          placeholder="Search by ID or Customer"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Invoice ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Total</th>
            {/* <th>Status</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredInvoices.length > 0 ? (
            filteredInvoices.map(inv => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>{inv.date}</td>
                <td>{inv.customer}</td>
                <td>${inv.total.toFixed(2)}</td>
                {/* <td>{inv.status}</td> */}
                <td>
                  <button onClick={() => alert('View Invoice')}>View</button>
                  <button onClick={() => deleteInvoice(inv.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6"> No invoices found. Create a new invoice to get started.</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination can be implemented here if needed */}
    </div>
  )
}

export default Invoices

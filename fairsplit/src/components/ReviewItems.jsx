import React, { useState } from 'react'
import { Plus, Trash2, Receipt as ReceiptIcon } from 'lucide-react'
import Button from './Button.jsx'
import { useBill } from '../hooks/useBill.jsx'
import { useToast } from '../hooks/useToast.jsx'
import { formatCurrency, getTotal } from '../utils/calculations.js'

export default function ReviewItems() {
  const { bill, updateItem, addItem, removeItem, setRestaurantName } = useBill()
  const { showToast } = useToast()
  const total = getTotal(bill.items)

  const handlePriceChange = (id, value) => {
    const num = value === '' ? '' : Number(value)
    updateItem(id, { price: Number.isNaN(num) ? 0 : num })
  }

  const handleAdd = () => {
    addItem({ name: '', price: 0 })
    showToast('Item added', 'success')
  }

  const handleRemove = (id, name) => {
    removeItem(id)
    showToast(`Removed "${name || 'item'}"`, 'info')
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Review the items</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Edit names and prices, or add anything the scan missed.</p>
        </div>
        <div className="w-full sm:w-64">
          <label htmlFor="restaurant-name" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Restaurant name
          </label>
          <div className="relative">
            <ReceiptIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="restaurant-name"
              type="text"
              value={bill.restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
              placeholder="e.g. The Garden Bistro"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-card-dark pl-9 pr-3 py-2 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark shadow-softer overflow-hidden">
        {/* Header row - desktop only */}
        <div className="hidden sm:grid grid-cols-[1fr_140px_56px] gap-3 px-5 py-3 border-b border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          <span>Item</span>
          <span>Price (₹)</span>
          <span className="text-right">Remove</span>
        </div>

        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {bill.items.length === 0 && (
            <li className="px-5 py-10 text-center text-sm text-slate-400">
              No items yet. Add one below or go back to upload a receipt.
            </li>
          )}
          {bill.items.map((item, idx) => (
            <li
              key={item.id}
              className="grid grid-cols-[1fr_auto] sm:grid-cols-[1fr_140px_56px] gap-3 px-5 py-3 items-center animate-fade-in"
              style={{ animationDelay: `${idx * 40}ms` }}
            >
              <input
                type="text"
                value={item.name}
                onChange={(e) => updateItem(item.id, { name: e.target.value })}
                placeholder="Item name"
                aria-label={`Item ${idx + 1} name`}
                className="w-full rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-transparent px-2.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 outline-none transition"
              />
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">₹</span>
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => handlePriceChange(item.id, e.target.value)}
                  aria-label={`Item ${idx + 1} price`}
                  className="w-full sm:w-[140px] rounded-lg border border-transparent hover:border-slate-200 dark:hover:border-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 bg-transparent pl-6 pr-2.5 py-2 text-sm font-mono font-semibold text-slate-700 dark:text-slate-200 outline-none transition"
                />
              </div>
              <button
                onClick={() => handleRemove(item.id, item.name)}
                aria-label={`Remove ${item.name || 'item'}`}
                className="justify-self-end grid h-9 w-9 place-items-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40">
          <Button variant="secondary" size="sm" onClick={handleAdd}>
            <Plus className="h-4 w-4" /> Add item
          </Button>
          <div className="text-right">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total</p>
            <p className="font-display font-bold text-xl text-slate-900 dark:text-white font-mono">{formatCurrency(total)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

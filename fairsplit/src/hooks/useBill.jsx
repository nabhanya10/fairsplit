import React, { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from './useLocalStorage.js'
import { DEMO_ITEMS, DEMO_FRIENDS, DEMO_ASSIGNMENTS, RESTAURANT_NAME } from '../utils/sampleData.js'
import { generateId } from '../utils/calculations.js'

const BillContext = createContext(null)

const EMPTY_BILL = {
  receiptImage: null,
  receiptFileName: null,
  restaurantName: '',
  items: [],
  friends: [],
  assignments: {},
  step: 1,
}

export function BillProvider({ children }) {
  const [bill, setBill] = useLocalStorage('fairsplit-bill', EMPTY_BILL)

  const actions = useMemo(() => ({
    setStep: (step) => setBill((b) => ({ ...b, step })),

    setReceiptImage: (dataUrl, fileName) =>
      setBill((b) => ({ ...b, receiptImage: dataUrl, receiptFileName: fileName })),

    loadDemo: () =>
      setBill(() => ({
        receiptImage: null,
        receiptFileName: 'demo-receipt.jpg',
        restaurantName: RESTAURANT_NAME,
        items: DEMO_ITEMS.map((i) => ({ ...i })),
        friends: DEMO_FRIENDS.map((f) => ({ ...f })),
        assignments: JSON.parse(JSON.stringify(DEMO_ASSIGNMENTS)),
        step: 2,
      })),

    simulateOcr: () =>
      setBill((b) => ({
        ...b,
        restaurantName: b.restaurantName || RESTAURANT_NAME,
        items: b.items.length ? b.items : DEMO_ITEMS.map((i) => ({ ...i, id: generateId('item') })),
      })),

    addItem: (item) =>
      setBill((b) => ({
        ...b,
        items: [...b.items, { id: generateId('item'), name: item?.name || 'New item', price: item?.price ?? 0 }],
      })),

    updateItem: (id, updates) =>
      setBill((b) => ({
        ...b,
        items: b.items.map((it) => (it.id === id ? { ...it, ...updates } : it)),
      })),

    removeItem: (id) =>
      setBill((b) => {
        const { [id]: _removed, ...rest } = b.assignments
        return { ...b, items: b.items.filter((it) => it.id !== id), assignments: rest }
      }),

    addFriend: (name) =>
      setBill((b) => ({
        ...b,
        friends: [...b.friends, { id: generateId('friend'), name }],
      })),

    removeFriend: (id) =>
      setBill((b) => {
        const newAssignments = {}
        Object.entries(b.assignments).forEach(([itemId, friendIds]) => {
          newAssignments[itemId] = friendIds.filter((fid) => fid !== id)
        })
        return {
          ...b,
          friends: b.friends.filter((f) => f.id !== id),
          assignments: newAssignments,
        }
      }),

    toggleAssignment: (itemId, friendId) =>
      setBill((b) => {
        const current = b.assignments[itemId] || []
        const next = current.includes(friendId)
          ? current.filter((id) => id !== friendId)
          : [...current, friendId]
        return { ...b, assignments: { ...b.assignments, [itemId]: next } }
      }),

    setRestaurantName: (name) => setBill((b) => ({ ...b, restaurantName: name })),

    resetBill: () => setBill(() => ({ ...EMPTY_BILL })),
  }), [setBill])

  const value = useMemo(() => ({ bill, ...actions }), [bill, actions])

  return <BillContext.Provider value={value}>{children}</BillContext.Provider>
}

export function useBill() {
  const ctx = useContext(BillContext)
  if (!ctx) throw new Error('useBill must be used within a BillProvider')
  return ctx
}

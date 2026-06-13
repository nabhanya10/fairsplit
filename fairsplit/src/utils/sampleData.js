// Sample data used to simulate OCR extraction for the MVP.
// In a production version, this would be replaced by a real OCR/receipt-parsing API.

export const DEMO_ITEMS = [
  { id: 'item-1', name: 'Pizza Margherita', price: 450 },
  { id: 'item-2', name: 'Chicken Burger', price: 280 },
  { id: 'item-3', name: 'French Fries', price: 150 },
  { id: 'item-4', name: 'Coke', price: 60 },
  { id: 'item-5', name: 'Brownie', price: 180 },
]

export const DEMO_FRIENDS = [
  { id: 'friend-1', name: 'Nabhanya' },
  { id: 'friend-2', name: 'Rahul' },
  { id: 'friend-3', name: 'Aditi' },
  { id: 'friend-4', name: 'Sam' },
]

// Demo assignments: map of itemId -> array of friendIds
// Designed so the example math in the brief works out:
// Pizza (450) -> Nabhanya, Rahul => 225 each
export const DEMO_ASSIGNMENTS = {
  'item-1': ['friend-1', 'friend-2'], // Pizza Margherita -> Nabhanya, Rahul
  'item-2': ['friend-2', 'friend-3'], // Chicken Burger -> Rahul, Aditi
  'item-3': ['friend-1', 'friend-3', 'friend-4'], // Fries -> Nabhanya, Aditi, Sam
  'item-4': ['friend-4'], // Coke -> Sam
  'item-5': ['friend-1', 'friend-2', 'friend-3', 'friend-4'], // Brownie -> everyone
}

export const RESTAURANT_NAME = 'The Garden Bistro'
export const DEMO_RECEIPT_DATE = new Date().toLocaleDateString('en-IN', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
})

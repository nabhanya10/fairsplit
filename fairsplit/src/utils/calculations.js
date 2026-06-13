/**
 * Core bill-splitting calculations.
 */

export function formatCurrency(amount) {
  const value = Number.isFinite(amount) ? amount : 0
  return `₹${value.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/**
 * Returns the bill total across all items.
 */
export function getTotal(items) {
  return items.reduce((sum, item) => sum + (Number(item.price) || 0), 0)
}

/**
 * Calculates how much each friend owes based on item assignments.
 * @param {Array} items - [{ id, name, price }]
 * @param {Array} friends - [{ id, name }]
 * @param {Object} assignments - { [itemId]: [friendId, ...] }
 * @returns {Object} { perFriend: { [friendId]: amount }, unassigned: [item], total }
 */
export function calculateSplit(items, friends, assignments) {
  const perFriend = {}
  friends.forEach((f) => {
    perFriend[f.id] = 0
  })

  const unassigned = []

  items.forEach((item) => {
    const price = Number(item.price) || 0
    const assignedTo = (assignments[item.id] || []).filter((fid) =>
      friends.some((f) => f.id === fid)
    )

    if (assignedTo.length === 0) {
      unassigned.push(item)
      return
    }

    const share = price / assignedTo.length
    assignedTo.forEach((fid) => {
      perFriend[fid] = (perFriend[fid] || 0) + share
    })
  })

  return {
    perFriend,
    unassigned,
    total: getTotal(items),
  }
}

/**
 * Returns sorted breakdown array plus highest/lowest spenders.
 */
export function getBreakdown(friends, perFriend) {
  const breakdown = friends.map((f) => ({
    id: f.id,
    name: f.name,
    amount: perFriend[f.id] || 0,
  }))

  const sorted = [...breakdown].sort((a, b) => b.amount - a.amount)
  const highest = sorted[0] || null
  const lowest = sorted[sorted.length - 1] || null

  return { breakdown, highest, lowest }
}

/**
 * Returns the per-person share for a single item given how many friends it's split among.
 */
export function getItemShare(price, assignedCount) {
  if (!assignedCount) return 0
  return (Number(price) || 0) / assignedCount
}

export function generateId(prefix = 'id') {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

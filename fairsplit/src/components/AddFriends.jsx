import React, { useState } from 'react'
import { UserPlus, X, Users } from 'lucide-react'
import Button from './Button.jsx'
import { useBill } from '../hooks/useBill.jsx'
import { useToast } from '../hooks/useToast.jsx'

const AVATAR_COLORS = [
  'bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-300',
  'bg-success-100 text-success-700 dark:bg-success-500/20 dark:text-success-300',
  'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300',
  'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300',
  'bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300',
]

export function avatarColor(index) {
  return AVATAR_COLORS[index % AVATAR_COLORS.length]
}

export function initials(name) {
  return (name || '?').trim().slice(0, 1).toUpperCase()
}

export default function AddFriends() {
  const { bill, addFriend, removeFriend } = useBill()
  const { showToast } = useToast()
  const [name, setName] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) return
    if (bill.friends.some((f) => f.name.toLowerCase() === trimmed.toLowerCase())) {
      showToast(`${trimmed} is already in the group`, 'error')
      return
    }
    addFriend(trimmed)
    setName('')
    showToast(`${trimmed} added to the group`, 'success')
  }

  const handleRemove = (id, friendName) => {
    removeFriend(id)
    showToast(`${friendName} removed from the group`, 'info')
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Who's splitting this bill?</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Add everyone at the table. You can remove someone later if needed.</p>
      </div>

      <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <UserPlus className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name, e.g. Priya"
            aria-label="Friend's name"
            className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-card-dark pl-10 pr-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition"
          />
        </div>
        <Button type="submit" disabled={!name.trim()} className="shrink-0">
          <UserPlus className="h-4 w-4" /> Add friend
        </Button>
      </form>

      {bill.friends.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 p-10 text-center">
          <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary-50 dark:bg-primary-500/10 text-primary-500">
            <Users className="h-6 w-6" />
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">No one added yet. Add at least one person to continue.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {bill.friends.map((friend, idx) => (
            <div
              key={friend.id}
              className="group flex items-center gap-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-card-dark pl-2 pr-3 py-1.5 shadow-softer hover:shadow-soft transition-all duration-200 animate-scale-in"
            >
              <span className={`grid h-8 w-8 place-items-center rounded-full font-display font-bold text-sm ${avatarColor(idx)}`}>
                {initials(friend.name)}
              </span>
              <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{friend.name}</span>
              <button
                onClick={() => handleRemove(friend.id, friend.name)}
                aria-label={`Remove ${friend.name}`}
                className="grid h-5 w-5 place-items-center rounded-full text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-sm text-slate-400">
        {bill.friends.length} {bill.friends.length === 1 ? 'person' : 'people'} added
      </p>
    </div>
  )
}

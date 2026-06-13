import React, { useMemo, useState } from 'react'
import {
  TrendingUp, TrendingDown, Users, Receipt, Download, Copy, Share2,
  RotateCcw, AlertTriangle, PartyPopper,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from './Button.jsx'
import { useBill } from '../hooks/useBill.jsx'
import { useToast } from '../hooks/useToast.jsx'
import { avatarColor, initials } from './AddFriends.jsx'
import { calculateSplit, getBreakdown, getTotal, formatCurrency, generateId } from '../utils/calculations.js'
import { downloadSummaryPdf } from '../utils/pdfExport.js'

export default function ResultsSummary() {
  const { bill, resetBill } = useBill()
  const { showToast } = useToast()
  const navigate = useNavigate()
  const [confirmingReset, setConfirmingReset] = useState(false)

  const { perFriend, unassigned, total } = useMemo(
    () => calculateSplit(bill.items, bill.friends, bill.assignments),
    [bill.items, bill.friends, bill.assignments]
  )
  const { breakdown, highest, lowest } = useMemo(
    () => getBreakdown(bill.friends, perFriend),
    [bill.friends, perFriend]
  )
  const sortedBreakdown = useMemo(() => [...breakdown].sort((a, b) => b.amount - a.amount), [breakdown])

  const summaryText = useMemo(() => {
    const lines = [
      `FairSplit summary${bill.restaurantName ? ` — ${bill.restaurantName}` : ''}`,
      `Total: ${formatCurrency(total)} · ${bill.friends.length} people`,
      '',
      ...sortedBreakdown.map((p) => `${p.name}: ${formatCurrency(p.amount)}`),
    ]
    return lines.join('\n')
  }, [bill.restaurantName, bill.friends.length, total, sortedBreakdown])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText)
      showToast('Summary copied to clipboard', 'success')
    } catch {
      showToast('Could not copy — try selecting the text manually', 'error')
    }
  }

  const handleShare = async () => {
    const fakeId = generateId('bill').slice(-10)
    const link = `${window.location.origin}${window.location.pathname}#/shared/${fakeId}`
    try {
      await navigator.clipboard.writeText(link)
      showToast('Shareable link copied (simulated)', 'success')
    } catch {
      showToast(`Share link: ${link}`, 'info')
    }
  }

  const handleDownloadPdf = () => {
    downloadSummaryPdf({
      items: bill.items,
      friends: bill.friends,
      breakdown: sortedBreakdown,
      total,
      highest,
      lowest,
      restaurantName: bill.restaurantName,
    })
    showToast('PDF downloaded', 'success')
  }

  const handleReset = () => {
    if (!confirmingReset) {
      setConfirmingReset(true)
      setTimeout(() => setConfirmingReset(false), 3000)
      return
    }
    resetBill()
    showToast('Bill reset — start fresh whenever you\'re ready', 'info')
    navigate('/app')
  }

  if (bill.items.length === 0 || bill.friends.length === 0) {
    return (
      <div className="animate-fade-in text-center py-14">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-amber-50 dark:bg-amber-500/10 text-amber-500">
          <AlertTriangle className="h-7 w-7" />
        </div>
        <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">Nothing to calculate yet</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">
          Add at least one item and one friend to see the breakdown.
        </p>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6 flex items-center gap-2">
        <PartyPopper className="h-6 w-6 text-success-500" />
        <div>
          <h2 className="font-display font-bold text-2xl text-slate-900 dark:text-white">Here's the damage</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-0.5">
            {bill.restaurantName ? `${bill.restaurantName} · ` : ''}everyone pays their fair share.
          </p>
        </div>
      </div>

      {/* Top stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard icon={Receipt} label="Total bill" value={formatCurrency(total)} accent="primary" />
        <StatCard icon={Users} label="People" value={bill.friends.length} accent="primary" />
        <StatCard
          icon={TrendingUp}
          label="Highest"
          value={highest ? formatCurrency(highest.amount) : '—'}
          sub={highest?.name}
          accent="amber"
        />
        <StatCard
          icon={TrendingDown}
          label="Lowest"
          value={lowest ? formatCurrency(lowest.amount) : '—'}
          sub={lowest?.name}
          accent="success"
        />
      </div>

      {unassigned.length > 0 && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-200 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
          <p>
            {unassigned.length} item{unassigned.length > 1 ? 's' : ''} ({unassigned.map((i) => i.name || 'Untitled').join(', ')}) {unassigned.length > 1 ? 'are' : 'is'} not
            assigned to anyone and won't be included in the totals. Go back to the assign step to fix this.
          </p>
        </div>
      )}

      {/* Breakdown */}
      <div className="receipt-paper receipt-edge rounded-t-2xl border border-slate-200/60 dark:border-slate-800 shadow-soft px-5 sm:px-7 pt-6 pb-5">
        <div className="text-center mb-5">
          <p className="font-display font-bold text-slate-900 dark:text-white">{bill.restaurantName || 'Bill summary'}</p>
          <p className="text-xs text-slate-400 mt-0.5">{new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>

        <ul className="space-y-3">
          {sortedBreakdown.map((person, idx) => {
            const isHighest = highest && person.id === highest.id && highest.amount > 0
            const isLowest = lowest && person.id === lowest.id && lowest.id !== highest?.id
            return (
              <li
                key={person.id}
                className="flex items-center justify-between gap-3 dotted-divider pb-3 animate-fade-in-up opacity-0"
                style={{ animationDelay: `${idx * 70}ms` }}
              >
                <div className="flex items-center gap-3">
                  <span className={`grid h-9 w-9 place-items-center rounded-full font-display font-bold text-sm ${avatarColor(idx)}`}>
                    {initials(person.name)}
                  </span>
                  <div>
                    <p className="font-medium text-slate-700 dark:text-slate-200">{person.name}</p>
                    {isHighest && <p className="text-xs text-amber-500 font-semibold">Highest spender</p>}
                    {isLowest && <p className="text-xs text-success-600 dark:text-success-400 font-semibold">Lowest spender</p>}
                  </div>
                </div>
                <p className="font-mono font-bold text-lg text-slate-900 dark:text-white">{formatCurrency(person.amount)}</p>
              </li>
            )
          })}
        </ul>

        <div className="mt-2 flex items-center justify-between font-display font-bold text-slate-900 dark:text-white text-lg">
          <span>Total</span>
          <span className="font-mono">{formatCurrency(total)}</span>
        </div>
      </div>
      <div className="rounded-b-2xl bg-primary-600/5 dark:bg-primary-500/10 border-x border-b border-slate-200/60 dark:border-slate-800 -mt-px px-5 sm:px-7 py-3 text-center text-xs text-slate-400">
        Generated with FairSplit
      </div>

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={handleDownloadPdf}>
          <Download className="h-4 w-4" /> Download PDF
        </Button>
        <Button variant="secondary" onClick={handleCopy}>
          <Copy className="h-4 w-4" /> Copy summary
        </Button>
        <Button variant="secondary" onClick={handleShare}>
          <Share2 className="h-4 w-4" /> Share link
        </Button>
        <Button variant={confirmingReset ? 'danger' : 'ghost'} onClick={handleReset} className="ml-auto">
          <RotateCcw className="h-4 w-4" /> {confirmingReset ? 'Click again to confirm' : 'Reset bill'}
        </Button>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, sub, accent = 'primary' }) {
  const accents = {
    primary: 'bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-300',
    success: 'bg-success-50 text-success-600 dark:bg-success-500/10 dark:text-success-300',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-300',
  }
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-card-dark p-4 shadow-softer">
      <div className={`mb-2 inline-grid h-8 w-8 place-items-center rounded-lg ${accents[accent]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white font-mono truncate">{value}</p>
      {sub && <p className="text-xs text-slate-400 truncate">{sub}</p>}
    </div>
  )
}

import { jsPDF } from 'jspdf'
import { formatCurrency } from './calculations.js'

/**
 * Generates and downloads a PDF summary of the bill split.
 */
export function downloadSummaryPdf({ items, friends, breakdown, total, highest, lowest, restaurantName }) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const marginX = 48
  let y = 56

  // Header
  doc.setFillColor(79, 70, 229)
  doc.rect(0, 0, 595, 90, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(22)
  doc.text('FairSplit', marginX, 48)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('Bill summary', marginX, 68)

  y = 120
  doc.setTextColor(30, 41, 59)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text(restaurantName || 'Receipt', marginX, y)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(100, 116, 139)
  doc.text(new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }), marginX, y + 16)

  y += 40

  // Items table
  doc.setTextColor(30, 41, 59)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Items', marginX, y)
  y += 14

  doc.setDrawColor(226, 232, 240)
  doc.line(marginX, y, 547, y)
  y += 16

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  items.forEach((item) => {
    doc.text(item.name, marginX, y)
    doc.text(formatCurrency(item.price), 547, y, { align: 'right' })
    y += 18
    if (y > 750) {
      doc.addPage()
      y = 56
    }
  })

  y += 6
  doc.setDrawColor(226, 232, 240)
  doc.line(marginX, y, 547, y)
  y += 18

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('Total', marginX, y)
  doc.text(formatCurrency(total), 547, y, { align: 'right' })

  y += 36

  // Breakdown
  doc.setFontSize(12)
  doc.text('Who owes what', marginX, y)
  y += 14
  doc.setDrawColor(226, 232, 240)
  doc.line(marginX, y, 547, y)
  y += 16

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  breakdown.forEach((person) => {
    let label = person.name
    if (highest && person.id === highest.id) label += '  (highest)'
    if (lowest && person.id === lowest.id && lowest.id !== highest?.id) label += '  (lowest)'
    doc.text(label, marginX, y)
    doc.text(formatCurrency(person.amount), 547, y, { align: 'right' })
    y += 18
    if (y > 750) {
      doc.addPage()
      y = 56
    }
  })

  y += 20
  doc.setFontSize(9)
  doc.setTextColor(148, 163, 184)
  doc.text(`Generated with FairSplit · ${friends.length} people · ${items.length} items`, marginX, y)

  doc.save('fairsplit-summary.pdf')
}

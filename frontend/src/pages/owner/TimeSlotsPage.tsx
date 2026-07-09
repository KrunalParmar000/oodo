import { useState } from 'react'
import { LayoutDashboard, Building2, Layers, CalendarClock, BookOpen, BarChart3, User, ChevronLeft, ChevronRight, Lock } from 'lucide-react'
import { Button, Badge } from '../../components/ui'
import Sidebar from '../../components/layout/Sidebar'
import type { Page } from '../../App'

const hours = ['6AM','7AM','8AM','9AM','10AM','11AM','12PM','1PM','2PM','3PM','4PM','5PM','6PM','7PM','8PM','9PM','10PM']
const courts = ['Court A (Tennis)', 'Court B (Tennis)', 'Court C (Badminton)', 'Court D (Badminton)', 'Basketball 1']

type SlotStatus = 'available' | 'booked' | 'blocked' | 'maintenance'

const initialSlots: Record<string, Record<string, SlotStatus>> = {
  'Court A (Tennis)': { '6AM': 'booked', '7AM': 'booked', '8AM': 'available', '9AM': 'available', '10AM': 'blocked', '11AM': 'available', '12PM': 'available', '1PM': 'booked', '2PM': 'available', '3PM': 'available', '4PM': 'booked', '5PM': 'booked', '6PM': 'booked', '7PM': 'available', '8PM': 'available', '9PM': 'available', '10PM': 'available' },
  'Court B (Tennis)': { '6AM': 'available', '7AM': 'booked', '8AM': 'booked', '9AM': 'available', '10AM': 'available', '11AM': 'booked', '12PM': 'blocked', '1PM': 'available', '2PM': 'booked', '3PM': 'available', '4PM': 'available', '5PM': 'available', '6PM': 'booked', '7PM': 'booked', '8PM': 'available', '9PM': 'available', '10PM': 'blocked' },
  'Court C (Badminton)': { '6AM': 'maintenance', '7AM': 'maintenance', '8AM': 'available', '9AM': 'booked', '10AM': 'available', '11AM': 'available', '12PM': 'available', '1PM': 'booked', '2PM': 'booked', '3PM': 'available', '4PM': 'booked', '5PM': 'available', '6PM': 'available', '7PM': 'booked', '8PM': 'available', '9PM': 'available', '10PM': 'available' },
  'Court D (Badminton)': { '6AM': 'available', '7AM': 'available', '8AM': 'available', '9AM': 'booked', '10AM': 'booked', '11AM': 'blocked', '12PM': 'blocked', '1PM': 'available', '2PM': 'available', '3PM': 'booked', '4PM': 'available', '5PM': 'booked', '6PM': 'booked', '7PM': 'available', '8PM': 'available', '9PM': 'available', '10PM': 'available' },
  'Basketball 1': { '6AM': 'available', '7AM': 'booked', '8AM': 'available', '9AM': 'available', '10AM': 'available', '11AM': 'booked', '12PM': 'booked', '1PM': 'available', '2PM': 'available', '3PM': 'booked', '4PM': 'booked', '5PM': 'available', '6PM': 'booked', '7PM': 'booked', '8PM': 'available', '9PM': 'available', '10PM': 'available' },
}

const slotColors: Record<SlotStatus, string> = {
  available: 'bg-[#d1fae5] text-[#065f46] hover:bg-[#a7f3d0]',
  booked: 'bg-[#fee2e2] text-[#991b1b] cursor-not-allowed',
  blocked: 'bg-[#fef9c3] text-[#854d0e] hover:bg-[#fef08a]',
  maintenance: 'bg-[#f1f5f9] text-[#94a3b8] cursor-not-allowed',
}

const days = ['Sun Jul 6', 'Mon Jul 7', 'Tue Jul 8', 'Wed Jul 9', 'Thu Jul 10', 'Fri Jul 11', 'Sat Jul 12']

export default function TimeSlotsPage({ nav }: { nav: (p: Page) => void }) {
  const [selectedDay, setSelectedDay] = useState(3)
  const [selectedCourt, setSelectedCourt] = useState(0)

  const sidebarItems = [
    { page: 'owner-dashboard' as Page, label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { page: 'owner-facilities' as Page, label: 'Facilities', icon: <Building2 size={16} /> },
    { page: 'owner-courts' as Page, label: 'Courts', icon: <Layers size={16} /> },
    { page: 'owner-slots' as Page, label: 'Time Slots', icon: <CalendarClock size={16} /> },
    { page: 'owner-bookings' as Page, label: 'Bookings', icon: <BookOpen size={16} /> },
    { page: 'owner-reports' as Page, label: 'Reports', icon: <BarChart3 size={16} /> },
    { page: 'owner-profile' as Page, label: 'Profile', icon: <User size={16} /> },
  ]

  const currentSlots = initialSlots[courts[selectedCourt]]

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar nav={nav} current="owner-slots" items={sidebarItems} role="owner" userName="David Chen" userEmail="david@arenacomplex.com" />
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#e2e8f0] px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#0f172a]">Time Slot Management</h1>
            <p className="text-sm text-[#64748b]">Manage availability and block slots</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary"><Lock size={14} /> Block Slots</Button>
            <Button>+ Add Schedule</Button>
          </div>
        </div>

        <div className="p-8">
          {/* Week selector */}
          <div className="flex items-center gap-3 mb-6">
            <button className="w-8 h-8 rounded-lg border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f8fafc]"><ChevronLeft size={14} /></button>
            <div className="flex gap-1 flex-1 overflow-x-auto">
              {days.map((d, i) => (
                <button key={d} onClick={() => setSelectedDay(i)} className={`shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${selectedDay === i ? 'bg-[#2563eb] text-white' : 'bg-white border border-[#e2e8f0] text-[#64748b] hover:border-[#2563eb]'}`}>{d}</button>
              ))}
            </div>
            <button className="w-8 h-8 rounded-lg border border-[#e2e8f0] flex items-center justify-center hover:bg-[#f8fafc]"><ChevronRight size={14} /></button>
          </div>

          {/* Court selector */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {courts.map((c, i) => (
              <button key={c} onClick={() => setSelectedCourt(i)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCourt === i ? 'bg-[#0f172a] text-white' : 'bg-white border border-[#e2e8f0] text-[#64748b] hover:border-[#0f172a]'}`}>{c}</button>
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-4 mb-5 flex-wrap">
            {[
              { color: 'bg-[#d1fae5]', label: 'Available' },
              { color: 'bg-[#fee2e2]', label: 'Booked' },
              { color: 'bg-[#fef9c3]', label: 'Blocked' },
              { color: 'bg-[#f1f5f9]', label: 'Maintenance' },
            ].map(l => (
              <div key={l.label} className="flex items-center gap-2">
                <span className={`w-4 h-4 rounded-md ${l.color}`} />
                <span className="text-xs text-[#64748b]">{l.label}</span>
              </div>
            ))}
          </div>

          {/* Slot grid */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#0f172a]">{courts[selectedCourt]}</h3>
              <p className="text-sm text-[#64748b]">{days[selectedDay]}</p>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-9 gap-2">
              {hours.map(h => {
                const status = currentSlots[h]
                return (
                  <button key={h} className={`py-3 rounded-xl text-xs font-semibold transition-all ${slotColors[status]} border border-transparent hover:border-current`}>
                    {h}
                    <div className="text-[9px] mt-0.5 opacity-70 capitalize">{status}</div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Multi-court overview */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] mt-5 overflow-hidden">
            <div className="px-6 py-4 border-b border-[#f1f5f9]">
              <h3 className="font-bold text-[#0f172a]">All Courts Overview — {days[selectedDay]}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-[#f8fafc]">
                    <th className="text-left px-4 py-2.5 text-xs font-semibold text-[#94a3b8] w-36">Court</th>
                    {hours.map(h => <th key={h} className="text-center px-1 py-2.5 text-xs font-semibold text-[#94a3b8]">{h}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {courts.map(c => (
                    <tr key={c} className="border-b border-[#f8fafc] last:border-0">
                      <td className="px-4 py-2 text-xs font-medium text-[#334155]">{c.split('(')[0].trim()}</td>
                      {hours.map(h => {
                        const s = initialSlots[c][h]
                        return (
                          <td key={h} className="px-1 py-2">
                            <div className={`h-6 rounded-md ${s === 'available' ? 'bg-[#d1fae5]' : s === 'booked' ? 'bg-[#fecaca]' : s === 'blocked' ? 'bg-[#fef9c3]' : 'bg-[#f1f5f9]'}`} />
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

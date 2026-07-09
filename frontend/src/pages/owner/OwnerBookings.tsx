import { useState } from 'react'
import { LayoutDashboard, Building2, Layers, CalendarClock, BookOpen, BarChart3, User, Search, Filter } from 'lucide-react'
import { Badge } from '../../components/ui'
import Sidebar from '../../components/layout/Sidebar'
import type { Page } from '../../App'

const bookings = [
  { id: 'QB-84751', user: 'Michael Torres', avatar: 'MT', venue: 'Arena Sports Complex', court: 'Court A (Tennis)', date: 'Jul 13, 2025', time: '6:00 PM', status: 'confirmed', amount: 25 },
  { id: 'QB-84620', user: 'Priya Sharma', avatar: 'PS', venue: 'Arena Sports Complex', court: 'Court B (Tennis)', date: 'Jul 13, 2025', time: '7:00 PM', status: 'confirmed', amount: 30 },
  { id: 'QB-84450', user: 'James Walker', avatar: 'JW', venue: 'Arena Sports Complex', court: 'Court C (Badminton)', date: 'Jul 12, 2025', time: '8:00 PM', status: 'pending', amount: 22 },
  { id: 'QB-84200', user: 'Sarah Kim', avatar: 'SK', venue: 'Riverside Courts', court: 'Basketball 1', date: 'Jul 11, 2025', time: '7:00 PM', status: 'confirmed', amount: 35 },
  { id: 'QB-84100', user: 'Carlos Ruiz', avatar: 'CR', venue: 'Arena Sports Complex', court: 'Court A (Tennis)', date: 'Jul 10, 2025', time: '9:00 AM', status: 'completed', amount: 25 },
  { id: 'QB-83900', user: 'Emily Davis', avatar: 'ED', venue: 'Arena Sports Complex', court: 'Court B (Tennis)', date: 'Jul 9, 2025', time: '6:00 PM', status: 'completed', amount: 30 },
  { id: 'QB-83700', user: 'Amit Patel', avatar: 'AP', venue: 'Riverside Courts', court: 'Football A', date: 'Jul 8, 2025', time: '10:00 AM', status: 'cancelled', amount: 50 },
]

const statusConfig: Record<string, { label: string; variant: 'green' | 'blue' | 'yellow' | 'red' | 'gray' }> = {
  confirmed: { label: 'Confirmed', variant: 'green' },
  pending: { label: 'Pending', variant: 'yellow' },
  completed: { label: 'Completed', variant: 'blue' },
  cancelled: { label: 'Cancelled', variant: 'red' },
}

export default function OwnerBookings({ nav }: { nav: (p: Page) => void }) {
  const [tab, setTab] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all')
  const [search, setSearch] = useState('')

  const sidebarItems = [
    { page: 'owner-dashboard' as Page, label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { page: 'owner-facilities' as Page, label: 'Facilities', icon: <Building2 size={16} /> },
    { page: 'owner-courts' as Page, label: 'Courts', icon: <Layers size={16} /> },
    { page: 'owner-slots' as Page, label: 'Time Slots', icon: <CalendarClock size={16} /> },
    { page: 'owner-bookings' as Page, label: 'Bookings', icon: <BookOpen size={16} /> },
    { page: 'owner-reports' as Page, label: 'Reports', icon: <BarChart3 size={16} /> },
    { page: 'owner-profile' as Page, label: 'Profile', icon: <User size={16} /> },
  ]

  const filtered = bookings.filter(b => {
    if (tab === 'upcoming' && !['confirmed', 'pending'].includes(b.status)) return false
    if (tab === 'completed' && b.status !== 'completed') return false
    if (tab === 'cancelled' && b.status !== 'cancelled') return false
    if (search && !b.user.toLowerCase().includes(search.toLowerCase()) && !b.court.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar nav={nav} current="owner-bookings" items={sidebarItems} role="owner" userName="David Chen" userEmail="david@arenacomplex.com" />
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#e2e8f0] px-8 py-5">
          <h1 className="text-xl font-bold text-[#0f172a] mb-1">Bookings</h1>
          <p className="text-sm text-[#64748b]">{bookings.length} total bookings</p>
        </div>
        <div className="p-8">
          {/* Summary cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Confirmed', val: bookings.filter(b => b.status === 'confirmed').length, c: 'text-[#10b981]' },
              { label: 'Pending', val: bookings.filter(b => b.status === 'pending').length, c: 'text-[#f59e0b]' },
              { label: 'Completed', val: bookings.filter(b => b.status === 'completed').length, c: 'text-[#2563eb]' },
              { label: 'Cancelled', val: bookings.filter(b => b.status === 'cancelled').length, c: 'text-[#ef4444]' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-[#e2e8f0] p-4">
                <p className={`text-2xl font-extrabold ${s.c}`}>{s.val}</p>
                <p className="text-xs text-[#64748b]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex gap-3 mb-5">
            <div className="flex items-center gap-2 flex-1 bg-white border border-[#e2e8f0] rounded-xl px-4 py-2.5 max-w-xs">
              <Search size={15} className="text-[#94a3b8]" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings..." className="flex-1 bg-transparent outline-none text-sm placeholder-[#94a3b8]" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm font-medium text-[#334155] hover:bg-[#f8fafc]"><Filter size={14} /> Filter</button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white border border-[#e2e8f0] rounded-xl p-1 mb-6 w-fit">
            {(['all', 'upcoming', 'completed', 'cancelled'] as const).map(t => (
              <button key={t} onClick={() => setTab(t)} className={`px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-colors ${tab === t ? 'bg-[#2563eb] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'}`}>{t}</button>
            ))}
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#f8fafc] bg-[#f8fafc]">
                  {['Booking ID', 'Player', 'Venue / Court', 'Date', 'Time', 'Amount', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => {
                  const s = statusConfig[b.status]
                  return (
                    <tr key={b.id} className="border-b border-[#f8fafc] last:border-0 hover:bg-[#f8fafc] transition-colors">
                      <td className="px-5 py-4 font-mono text-xs text-[#64748b]">{b.id}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#dbeafe] text-[#2563eb] flex items-center justify-center text-xs font-bold">{b.avatar}</div>
                          <span className="text-sm font-medium text-[#0f172a]">{b.user}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-[#0f172a]">{b.court}</p>
                        <p className="text-xs text-[#94a3b8]">{b.venue}</p>
                      </td>
                      <td className="px-5 py-4 text-sm text-[#64748b] whitespace-nowrap">{b.date}</td>
                      <td className="px-5 py-4 text-sm text-[#64748b]">{b.time}</td>
                      <td className="px-5 py-4 text-sm font-bold text-[#0f172a]">${b.amount}</td>
                      <td className="px-5 py-4"><Badge variant={s.variant}>{s.label}</Badge></td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <button className="text-xs text-[#2563eb] font-semibold hover:underline">View</button>
                          {b.status === 'pending' && <button className="text-xs text-[#10b981] font-semibold hover:underline">Confirm</button>}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

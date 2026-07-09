import { useState } from 'react'
import { Search, Calendar, MapPin, Clock, Filter } from 'lucide-react'
import { Badge, Button } from '../../components/ui'
import UserNavbar from '../../components/layout/UserNavbar'
import type { Page } from '../../App'

const bookings = [
  { id: 'QB-2025-84751', venue: 'Arena Sports Complex', sport: 'Tennis', court: 'Court A', date: 'Jul 13, 2025', time: '6:00 PM – 7:00 PM', status: 'upcoming', amount: 27, img: 'photo-1554068865-24cecd4e34b8' },
  { id: 'QB-2025-84620', venue: 'Downtown Basketball Hub', sport: 'Basketball', court: 'Court 2', date: 'Jul 11, 2025', time: '7:00 PM – 9:00 PM', status: 'upcoming', amount: 62, img: 'photo-1546519638-68e109498ffc' },
  { id: 'QB-2025-83998', venue: 'GreenPark Football Fields', sport: 'Football', court: 'Field A', date: 'Jul 6, 2025', time: '10:00 AM – 12:00 PM', status: 'completed', amount: 90, img: 'photo-1529900748604-07564a03e7a6' },
  { id: 'QB-2025-83750', venue: 'AquaLife Swim Center', sport: 'Swimming', court: 'Lane 3', date: 'Jun 28, 2025', time: '8:00 AM – 9:00 AM', status: 'completed', amount: 22, img: 'photo-1530549387789-4c1017266635' },
  { id: 'QB-2025-82100', venue: 'City Volleyball Courts', sport: 'Volleyball', court: 'Court B', date: 'Jun 15, 2025', time: '5:00 PM – 6:00 PM', status: 'cancelled', amount: 35, img: 'photo-1547347298-4074fc3086f0' },
]

const statusConfig: Record<string, { label: string; variant: 'blue' | 'green' | 'red' | 'orange' | 'gray' }> = {
  upcoming: { label: 'Upcoming', variant: 'blue' },
  completed: { label: 'Completed', variant: 'green' },
  cancelled: { label: 'Cancelled', variant: 'red' },
}

export default function MyBookingsPage({ nav }: { nav: (p: Page) => void }) {
  const [tab, setTab] = useState<'all' | 'upcoming' | 'completed' | 'cancelled'>('all')
  const [search, setSearch] = useState('')

  const filtered = bookings.filter(b => {
    if (tab !== 'all' && b.status !== tab) return false
    if (search && !b.venue.toLowerCase().includes(search.toLowerCase()) && !b.sport.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <UserNavbar nav={nav} current="user-bookings" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-extrabold text-[#0f172a]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>My Bookings</h1>
          <Button size="sm" variant="outline" onClick={() => nav('user-venues')}><Calendar size={14} /> Book Again</Button>
        </div>

        {/* Search + filter */}
        <div className="flex gap-3 mb-5">
          <div className="flex items-center gap-2 flex-1 bg-white border border-[#e2e8f0] rounded-xl px-4 py-2.5">
            <Search size={15} className="text-[#94a3b8]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search bookings..." className="flex-1 bg-transparent outline-none text-sm text-[#0f172a] placeholder-[#94a3b8]" />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#e2e8f0] rounded-xl text-sm font-medium text-[#334155] hover:bg-[#f8fafc]">
            <Filter size={14} /> Filter
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white border border-[#e2e8f0] rounded-xl p-1 mb-6 overflow-x-auto">
          {(['all', 'upcoming', 'completed', 'cancelled'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`flex-1 py-2 rounded-lg text-sm font-semibold capitalize transition-colors whitespace-nowrap ${tab === t ? 'bg-[#2563eb] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'}`}>
              {t} <span className={`text-xs ml-1 ${tab === t ? 'text-blue-100' : 'text-[#94a3b8]'}`}>({bookings.filter(b => t === 'all' || b.status === t).length})</span>
            </button>
          ))}
        </div>

        {/* Booking cards */}
        <div className="flex flex-col gap-4">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-[#e2e8f0] py-16 text-center">
              <div className="text-4xl mb-3">📋</div>
              <p className="font-bold text-[#0f172a]">No bookings found</p>
              <p className="text-sm text-[#64748b] mt-1">Try a different filter or search query</p>
            </div>
          ) : filtered.map(b => {
            const s = statusConfig[b.status]
            return (
              <div key={b.id} className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex">
                  <div className="w-28 shrink-0 hidden sm:block overflow-hidden">
                    <img src={`https://images.unsplash.com/${b.img}?w=120&h=120&fit=crop&auto=format`} alt={b.venue} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant={s.variant}>{s.label}</Badge>
                          <span className="text-xs text-[#94a3b8] font-mono">{b.id}</span>
                        </div>
                        <h3 className="font-bold text-[#0f172a]">{b.venue}</h3>
                        <p className="text-sm text-[#64748b]">{b.sport} · {b.court}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-lg font-extrabold text-[#0f172a]">${b.amount}</p>
                        <p className="text-xs text-[#94a3b8]">paid</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-[#64748b]">
                      <span className="flex items-center gap-1"><Calendar size={11} /> {b.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11} /> {b.time}</span>
                      <span className="flex items-center gap-1"><MapPin size={11} /> {b.venue}</span>
                    </div>
                    {b.status === 'upcoming' && (
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" onClick={() => nav('user-venue-detail')}>View Details</Button>
                        <Button size="sm" variant="ghost" className="text-red-500 hover:bg-red-50">Cancel</Button>
                      </div>
                    )}
                    {b.status === 'completed' && (
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">Leave Review</Button>
                        <Button size="sm" variant="primary" onClick={() => nav('user-booking')}>Book Again</Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { LayoutDashboard, Building2, Layers, CalendarClock, BookOpen, BarChart3, User, Plus, Edit, Trash2 } from 'lucide-react'
import { Button, Badge, Modal } from '../../components/ui'
import Sidebar from '../../components/layout/Sidebar'
import type { Page } from '../../App'

const courts = [
  { id: 1, name: 'Court A', sport: 'Tennis', price: 25, hours: '6AM–11PM', status: 'available', facility: 'Arena Sports Complex' },
  { id: 2, name: 'Court B', sport: 'Tennis', price: 30, hours: '6AM–11PM', status: 'booked', facility: 'Arena Sports Complex' },
  { id: 3, name: 'Court C', sport: 'Badminton', price: 22, hours: '8AM–10PM', status: 'available', facility: 'Arena Sports Complex' },
  { id: 4, name: 'Court D', sport: 'Badminton', price: 22, hours: '8AM–10PM', status: 'maintenance', facility: 'Arena Sports Complex' },
  { id: 5, name: 'Basketball 1', sport: 'Basketball', price: 35, hours: '7AM–9PM', status: 'available', facility: 'Riverside Courts' },
  { id: 6, name: 'Football A', sport: 'Football', price: 50, hours: '6AM–10PM', status: 'booked', facility: 'Riverside Courts' },
]

const statusConfig: Record<string, { label: string; variant: 'green' | 'red' | 'yellow' | 'gray' }> = {
  available: { label: 'Available', variant: 'green' },
  booked: { label: 'Booked', variant: 'red' },
  maintenance: { label: 'Maintenance', variant: 'yellow' },
}

const sportIcons: Record<string, string> = {
  Tennis: '🎾', Basketball: '🏀', Football: '⚽', Badminton: '🏸', Volleyball: '🏐', Swimming: '🏊',
}

export default function CourtManagement({ nav }: { nav: (p: Page) => void }) {
  const [showModal, setShowModal] = useState(false)
  const [filterSport, setFilterSport] = useState('All')

  const sidebarItems = [
    { page: 'owner-dashboard' as Page, label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { page: 'owner-facilities' as Page, label: 'Facilities', icon: <Building2 size={16} /> },
    { page: 'owner-courts' as Page, label: 'Courts', icon: <Layers size={16} /> },
    { page: 'owner-slots' as Page, label: 'Time Slots', icon: <CalendarClock size={16} /> },
    { page: 'owner-bookings' as Page, label: 'Bookings', icon: <BookOpen size={16} /> },
    { page: 'owner-reports' as Page, label: 'Reports', icon: <BarChart3 size={16} /> },
    { page: 'owner-profile' as Page, label: 'Profile', icon: <User size={16} /> },
  ]

  const sports = ['All', ...Array.from(new Set(courts.map(c => c.sport)))]
  const filtered = courts.filter(c => filterSport === 'All' || c.sport === filterSport)

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar nav={nav} current="owner-courts" items={sidebarItems} role="owner" userName="David Chen" userEmail="david@arenacomplex.com" />
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#e2e8f0] px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#0f172a]">Court Management</h1>
            <p className="text-sm text-[#64748b]">{courts.length} courts across your facilities</p>
          </div>
          <Button onClick={() => setShowModal(true)}><Plus size={15} /> Add Court</Button>
        </div>

        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Courts', val: courts.length, color: 'bg-[#dbeafe] text-[#2563eb]' },
              { label: 'Available', val: courts.filter(c => c.status === 'available').length, color: 'bg-[#d1fae5] text-[#10b981]' },
              { label: 'Booked', val: courts.filter(c => c.status === 'booked').length, color: 'bg-[#fee2e2] text-[#ef4444]' },
              { label: 'Maintenance', val: courts.filter(c => c.status === 'maintenance').length, color: 'bg-[#fef9c3] text-[#854d0e]' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-[#e2e8f0] p-4">
                <div className={`text-2xl font-extrabold mb-1 ${s.color.split(' ')[1]}`}>{s.val}</div>
                <p className="text-xs text-[#64748b]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Sport filter */}
          <div className="flex gap-2 mb-5 overflow-x-auto">
            {sports.map(s => (
              <button key={s} onClick={() => setFilterSport(s)} className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${filterSport === s ? 'bg-[#2563eb] text-white' : 'bg-white border border-[#e2e8f0] text-[#64748b] hover:border-[#2563eb]'}`}>{s}</button>
            ))}
          </div>

          {/* Courts table */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#f8fafc] bg-[#f8fafc]">
                  {['Court', 'Sport', 'Facility', 'Price/hr', 'Operating Hours', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => {
                  const s = statusConfig[c.status]
                  return (
                    <tr key={c.id} className="border-b border-[#f8fafc] last:border-0 hover:bg-[#f8fafc] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-[#f1f5f9] rounded-xl flex items-center justify-center text-xl">{sportIcons[c.sport]}</div>
                          <span className="font-semibold text-[#0f172a]">{c.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4"><Badge variant="blue">{c.sport}</Badge></td>
                      <td className="px-6 py-4 text-sm text-[#64748b]">{c.facility}</td>
                      <td className="px-6 py-4 text-sm font-bold text-[#0f172a]">${c.price}</td>
                      <td className="px-6 py-4 text-sm text-[#64748b]">{c.hours}</td>
                      <td className="px-6 py-4"><Badge variant={s.variant}>{s.label}</Badge></td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => setShowModal(true)} className="text-[#64748b] hover:text-[#2563eb] transition-colors"><Edit size={15} /></button>
                          <button className="text-[#64748b] hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <Modal open={showModal} onClose={() => setShowModal(false)} title="Add / Edit Court">
          <div className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-[#374151]">Court Name</label><input className="rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm outline-none focus:border-[#2563eb]" placeholder="Court A" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-[#374151]">Sport Type</label>
                <select className="rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm outline-none focus:border-[#2563eb]">
                  {['Tennis', 'Basketball', 'Football', 'Badminton', 'Swimming', 'Volleyball'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-[#374151]">Price Per Hour ($)</label><input type="number" className="rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm outline-none focus:border-[#2563eb]" placeholder="25" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-[#374151]">Availability Status</label>
                <select className="rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm outline-none focus:border-[#2563eb]">
                  <option>Available</option><option>Booked</option><option>Maintenance</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-[#374151]">Open Time</label><input type="time" className="rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm outline-none focus:border-[#2563eb]" defaultValue="06:00" /></div>
              <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-[#374151]">Close Time</label><input type="time" className="rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm outline-none focus:border-[#2563eb]" defaultValue="23:00" /></div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button fullWidth onClick={() => setShowModal(false)}>Save Court</Button>
              <Button variant="secondary" fullWidth onClick={() => setShowModal(false)}>Cancel</Button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  )
}

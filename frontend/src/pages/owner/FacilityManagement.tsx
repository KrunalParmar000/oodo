import { useState } from 'react'
import { LayoutDashboard, Building2, Layers, CalendarClock, BookOpen, BarChart3, User, Plus, Edit, Trash2, MapPin, Star, Eye } from 'lucide-react'
import { Button, Badge, Modal } from '../../components/ui'
import Sidebar from '../../components/layout/Sidebar'
import type { Page } from '../../App'

const facilities = [
  { id: 1, name: 'Arena Sports Complex', location: 'Manhattan, NY', sports: ['Tennis', 'Badminton'], courts: 8, status: 'active', rating: 4.9, bookings: 1284, img: 'photo-1554068865-24cecd4e34b8' },
  { id: 2, name: 'Riverside Courts', location: 'Brooklyn, NY', sports: ['Basketball', 'Football'], courts: 4, status: 'active', rating: 4.7, bookings: 643, img: 'photo-1546519638-68e109498ffc' },
  { id: 3, name: 'SkyDome Indoor Arena', location: 'Queens, NY', sports: ['Volleyball', 'Badminton'], courts: 6, status: 'pending', rating: 0, bookings: 0, img: 'photo-1547347298-4074fc3086f0' },
]

export default function FacilityManagement({ nav }: { nav: (p: Page) => void }) {
  const [showModal, setShowModal] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null)

  const sidebarItems = [
    { page: 'owner-dashboard' as Page, label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { page: 'owner-facilities' as Page, label: 'Facilities', icon: <Building2 size={16} /> },
    { page: 'owner-courts' as Page, label: 'Courts', icon: <Layers size={16} /> },
    { page: 'owner-slots' as Page, label: 'Time Slots', icon: <CalendarClock size={16} /> },
    { page: 'owner-bookings' as Page, label: 'Bookings', icon: <BookOpen size={16} /> },
    { page: 'owner-reports' as Page, label: 'Reports', icon: <BarChart3 size={16} /> },
    { page: 'owner-profile' as Page, label: 'Profile', icon: <User size={16} /> },
  ]

  const FacilityForm = () => (
    <div className="flex flex-col gap-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-[#374151]">Facility Name</label><input className="rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm outline-none focus:border-[#2563eb]" placeholder="Arena Sports Complex" /></div>
        <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-[#374151]">Location</label><input className="rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm outline-none focus:border-[#2563eb]" placeholder="123 Sports Ave, New York" /></div>
      </div>
      <div className="flex flex-col gap-1.5"><label className="text-sm font-medium text-[#374151]">Description</label><textarea rows={3} className="rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm outline-none focus:border-[#2563eb] resize-none" placeholder="Describe your facility..." /></div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#374151]">Sports Supported</label>
        <div className="flex flex-wrap gap-2">
          {['Tennis', 'Basketball', 'Football', 'Badminton', 'Swimming', 'Volleyball'].map(s => (
            <label key={s} className="flex items-center gap-2 text-sm text-[#334155] cursor-pointer">
              <input type="checkbox" className="accent-[#2563eb] rounded" /> {s}
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#374151]">Amenities</label>
        <div className="flex flex-wrap gap-2">
          {['Parking', 'Wi-Fi', 'Showers', 'Cafeteria', 'Floodlights', 'Lockers'].map(a => (
            <label key={a} className="flex items-center gap-2 text-sm text-[#334155] cursor-pointer">
              <input type="checkbox" className="accent-[#2563eb] rounded" /> {a}
            </label>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-[#374151]">Upload Photos</label>
        <div className="border-2 border-dashed border-[#e2e8f0] rounded-xl p-6 text-center hover:border-[#2563eb] transition-colors cursor-pointer">
          <div className="text-3xl mb-2">📷</div>
          <p className="text-sm font-medium text-[#64748b]">Click to upload or drag & drop</p>
          <p className="text-xs text-[#94a3b8]">JPG, PNG up to 10MB each · Max 10 photos</p>
        </div>
      </div>
      <div className="flex gap-3 pt-2">
        <Button fullWidth onClick={() => setShowModal(false)}>Save Facility</Button>
        <Button variant="secondary" fullWidth onClick={() => setShowModal(false)}>Cancel</Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar nav={nav} current="owner-facilities" items={sidebarItems} role="owner" userName="David Chen" userEmail="david@arenacomplex.com" />
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#e2e8f0] px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#0f172a]">Facility Management</h1>
            <p className="text-sm text-[#64748b]">{facilities.length} facilities registered</p>
          </div>
          <Button onClick={() => setShowModal(true)}><Plus size={15} /> Add Facility</Button>
        </div>
        <div className="p-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {facilities.map(f => (
              <div key={f.id} className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-40">
                  <img src={`https://images.unsplash.com/${f.img}?w=400&h=180&fit=crop&auto=format`} alt={f.name} className="w-full h-full object-cover" />
                  <div className="absolute top-3 right-3">
                    <Badge variant={f.status === 'active' ? 'green' : 'yellow'}>{f.status}</Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-[#0f172a] mb-1">{f.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-[#94a3b8] mb-3"><MapPin size={11} /> {f.location}</div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {f.sports.map(s => <Badge key={s} variant="blue">{s}</Badge>)}
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center border-t border-[#f8fafc] pt-3 mb-4">
                    {[
                      { v: f.courts, l: 'Courts' },
                      { v: f.rating || '—', l: 'Rating' },
                      { v: f.bookings, l: 'Bookings' },
                    ].map(s => (
                      <div key={s.l}>
                        <p className="font-bold text-[#0f172a] text-sm">{s.v}</p>
                        <p className="text-[10px] text-[#94a3b8]">{s.l}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#f8fafc] hover:bg-[#dbeafe] text-[#64748b] hover:text-[#2563eb] rounded-xl text-xs font-semibold transition-colors"><Eye size={13} /> View</button>
                    <button onClick={() => setShowModal(true)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#f8fafc] hover:bg-[#dbeafe] text-[#64748b] hover:text-[#2563eb] rounded-xl text-xs font-semibold transition-colors"><Edit size={13} /> Edit</button>
                    <button onClick={() => setDeleteTarget(f.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#f8fafc] hover:bg-red-50 text-[#64748b] hover:text-red-500 rounded-xl text-xs font-semibold transition-colors"><Trash2 size={13} /> Delete</button>
                  </div>
                </div>
              </div>
            ))}
            {/* Add new card */}
            <button onClick={() => setShowModal(true)} className="border-2 border-dashed border-[#e2e8f0] hover:border-[#2563eb] rounded-2xl p-8 flex flex-col items-center justify-center gap-3 text-[#94a3b8] hover:text-[#2563eb] transition-colors min-h-[300px]">
              <div className="w-12 h-12 rounded-full border-2 border-current flex items-center justify-center"><Plus size={20} /></div>
              <p className="font-semibold">Add New Facility</p>
            </button>
          </div>
        </div>

        <Modal open={showModal} onClose={() => setShowModal(false)} title="Add New Facility" width="max-w-2xl">
          <FacilityForm />
        </Modal>

        <Modal open={deleteTarget !== null} onClose={() => setDeleteTarget(null)} title="Delete Facility" width="max-w-sm">
          <p className="text-sm text-[#64748b] mb-5">Are you sure you want to delete this facility? This action cannot be undone and all associated courts and bookings will be affected.</p>
          <div className="flex gap-3">
            <Button variant="danger" fullWidth onClick={() => setDeleteTarget(null)}>Delete Facility</Button>
            <Button variant="secondary" fullWidth onClick={() => setDeleteTarget(null)}>Cancel</Button>
          </div>
        </Modal>
      </main>
    </div>
  )
}

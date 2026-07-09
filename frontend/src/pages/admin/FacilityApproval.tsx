import { useState } from 'react'
import { LayoutDashboard, ShieldCheck, Users, BarChart3, Settings, CheckCircle, XCircle, MessageSquare, MapPin, Star, Eye } from 'lucide-react'
import { Button, Badge, Modal } from '../../components/ui'
import Sidebar from '../../components/layout/Sidebar'
import type { Page } from '../../App'

const requests = [
  {
    id: 1, name: 'GreenField Sports Arena', owner: 'Marcus Johnson', email: 'marcus@greenfield.com',
    location: 'Queens, NY', sports: ['Football', 'Cricket'], courts: 6, submitted: 'Jul 8, 2025',
    status: 'pending', docs: true, img: 'photo-1529900748604-07564a03e7a6',
    desc: 'Premium outdoor sports facility with 4 football fields and 2 cricket pitches. Floodlit, CCTV-monitored, ample parking for 200 cars.',
  },
  {
    id: 2, name: 'Metro Badminton Hub', owner: 'Lisa Park', email: 'lisa@metrobad.com',
    location: 'Brooklyn, NY', sports: ['Badminton'], courts: 10, submitted: 'Jul 7, 2025',
    status: 'pending', docs: true, img: 'photo-1593784991095-a205069470b6',
    desc: 'Purpose-built indoor badminton facility with 10 BWF-standard courts, air conditioning, and professional lighting.',
  },
  {
    id: 3, name: 'Harlem Boxing Gym', owner: 'Tony Ramos', email: 'tony@harlemboxing.com',
    location: 'Harlem, NY', sports: ['Boxing'], courts: 3, submitted: 'Jul 5, 2025',
    status: 'pending', docs: false, img: 'photo-1517836357463-d25dfeac3438',
    desc: 'Professional boxing gym with 3 full-size rings, heavy bag area, and coaching staff available.',
  },
  {
    id: 4, name: 'Riverdale Tennis Club', owner: 'Amanda White', email: 'amanda@riverdaletennis.com',
    location: 'Bronx, NY', sports: ['Tennis'], courts: 8, submitted: 'Jul 3, 2025',
    status: 'pending', docs: true, img: 'photo-1554068865-24cecd4e34b8',
    desc: 'Clay and hard court tennis facility with 8 courts, pro shop, and coaching available for all levels.',
  },
]

export default function FacilityApproval({ nav }: { nav: (p: Page) => void }) {
  const [selectedId, setSelectedId] = useState<number | null>(null)
  const [approvedIds, setApprovedIds] = useState<number[]>([])
  const [rejectedIds, setRejectedIds] = useState<number[]>([])
  const [comment, setComment] = useState('')

  const sidebarItems = [
    { page: 'admin-dashboard' as Page, label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { page: 'admin-approvals' as Page, label: 'Facility Approval', icon: <ShieldCheck size={16} /> },
    { page: 'admin-users' as Page, label: 'Users', icon: <Users size={16} /> },
    { page: 'admin-reports' as Page, label: 'Reports', icon: <BarChart3 size={16} /> },
    { page: 'admin-profile' as Page, label: 'Settings', icon: <Settings size={16} /> },
  ]

  const selected = requests.find(r => r.id === selectedId)

  const approve = (id: number) => {
    setApprovedIds(prev => [...prev, id])
    setSelectedId(null)
  }

  const reject = (id: number) => {
    setRejectedIds(prev => [...prev, id])
    setSelectedId(null)
  }

  const getStatus = (id: number) => {
    if (approvedIds.includes(id)) return 'approved'
    if (rejectedIds.includes(id)) return 'rejected'
    return 'pending'
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar nav={nav} current="admin-approvals" items={sidebarItems} role="admin" userName="Admin User" userEmail="admin@quickbolt.com" />
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#e2e8f0] px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#0f172a]">Facility Approval</h1>
            <p className="text-sm text-[#64748b]">{requests.filter(r => !approvedIds.includes(r.id) && !rejectedIds.includes(r.id)).length} pending reviews</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="yellow">4 Pending</Badge>
            <Badge variant="green">{approvedIds.length} Approved Today</Badge>
          </div>
        </div>

        <div className="p-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-5">
            {requests.map(r => {
              const status = getStatus(r.id)
              return (
                <div key={r.id} className={`bg-white rounded-2xl border overflow-hidden hover:shadow-md transition-shadow ${status === 'approved' ? 'border-[#10b981]' : status === 'rejected' ? 'border-red-300' : 'border-[#e2e8f0]'}`}>
                  <div className="relative h-36">
                    <img src={`https://images.unsplash.com/${r.img}?w=500&h=180&fit=crop&auto=format`} alt={r.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <Badge variant={status === 'approved' ? 'green' : status === 'rejected' ? 'red' : 'orange'}>
                        {status === 'approved' ? '✓ Approved' : status === 'rejected' ? '✗ Rejected' : '⏳ Pending'}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#0f172a] mb-1">{r.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-[#94a3b8] mb-2"><MapPin size={11} /> {r.location}</div>
                    <div className="flex flex-col gap-1 text-xs text-[#64748b] mb-3">
                      <span><strong className="text-[#334155]">Owner:</strong> {r.owner}</span>
                      <span><strong className="text-[#334155]">Sports:</strong> {r.sports.join(', ')}</span>
                      <span><strong className="text-[#334155]">Courts:</strong> {r.courts} · Submitted {r.submitted}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${r.docs ? 'bg-[#d1fae5] text-[#065f46]' : 'bg-[#fee2e2] text-[#991b1b]'}`}>
                        {r.docs ? '✓ Docs Verified' : '⚠ Docs Missing'}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setSelectedId(r.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#f8fafc] hover:bg-[#dbeafe] text-[#64748b] hover:text-[#2563eb] rounded-xl text-xs font-semibold transition-colors">
                        <Eye size={13} /> Review
                      </button>
                      {status === 'pending' && (
                        <>
                          <button onClick={() => approve(r.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#d1fae5] hover:bg-[#a7f3d0] text-[#065f46] rounded-xl text-xs font-semibold transition-colors">
                            <CheckCircle size={13} /> Approve
                          </button>
                          <button onClick={() => reject(r.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-[#fee2e2] hover:bg-[#fecaca] text-[#991b1b] rounded-xl text-xs font-semibold transition-colors">
                            <XCircle size={13} /> Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Detail modal */}
        {selected && (
          <Modal open={true} onClose={() => setSelectedId(null)} title="Facility Review" width="max-w-2xl">
            <div className="flex flex-col gap-5">
              <img src={`https://images.unsplash.com/${selected.img}?w=600&h=240&fit=crop&auto=format`} alt={selected.name} className="w-full h-44 object-cover rounded-xl" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { l: 'Facility Name', v: selected.name },
                  { l: 'Owner', v: selected.owner },
                  { l: 'Email', v: selected.email },
                  { l: 'Location', v: selected.location },
                  { l: 'Sports', v: selected.sports.join(', ') },
                  { l: 'Courts', v: `${selected.courts} courts` },
                ].map(f => (
                  <div key={f.l}>
                    <p className="text-xs text-[#94a3b8] font-semibold uppercase tracking-wider mb-0.5">{f.l}</p>
                    <p className="font-medium text-[#0f172a]">{f.v}</p>
                  </div>
                ))}
              </div>
              <div>
                <p className="text-xs text-[#94a3b8] font-semibold uppercase tracking-wider mb-1.5">Description</p>
                <p className="text-sm text-[#64748b]">{selected.desc}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-[#374151] flex items-center gap-1.5 mb-1.5"><MessageSquare size={14} /> Admin Comment (optional)</label>
                <textarea value={comment} onChange={e => setComment(e.target.value)} rows={2} className="w-full rounded-xl border border-[#e2e8f0] px-4 py-2.5 text-sm outline-none focus:border-[#2563eb] resize-none" placeholder="Add a note for the facility owner..." />
              </div>
              <div className="flex gap-3">
                <Button variant="success" fullWidth onClick={() => approve(selected.id)}>
                  <CheckCircle size={15} /> Approve Facility
                </Button>
                <Button variant="danger" fullWidth onClick={() => reject(selected.id)}>
                  <XCircle size={15} /> Reject
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </main>
    </div>
  )
}

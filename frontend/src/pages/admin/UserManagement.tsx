import { useState } from 'react'
import { LayoutDashboard, ShieldCheck, Users, BarChart3, Settings, Search, Filter, Eye, UserX, UserCheck, Trash2, MoreHorizontal } from 'lucide-react'
import { Badge, Button, Modal } from '../../components/ui'
import Sidebar from '../../components/layout/Sidebar'
import type { Page } from '../../App'

const users = [
  { id: 1, name: 'Michael Torres', email: 'michael@email.com', role: 'user', joined: 'Jan 5, 2025', bookings: 23, status: 'active', city: 'New York, NY' },
  { id: 2, name: 'Priya Sharma', email: 'priya@email.com', role: 'user', joined: 'Feb 12, 2025', bookings: 14, status: 'active', city: 'Queens, NY' },
  { id: 3, name: 'David Chen', email: 'david@arenacomplex.com', role: 'owner', joined: 'Mar 3, 2023', bookings: 0, status: 'active', city: 'Manhattan, NY' },
  { id: 4, name: 'James Walker', email: 'james@email.com', role: 'user', joined: 'Mar 20, 2025', bookings: 7, status: 'suspended', city: 'Brooklyn, NY' },
  { id: 5, name: 'Sarah Kim', email: 'sarah@email.com', role: 'user', joined: 'Apr 1, 2025', bookings: 31, status: 'active', city: 'Staten Island, NY' },
  { id: 6, name: 'Carlos Ruiz', email: 'carlos@email.com', role: 'user', joined: 'Apr 14, 2025', bookings: 9, status: 'active', city: 'Bronx, NY' },
  { id: 7, name: 'Lisa Park', email: 'lisa@metrobad.com', role: 'owner', joined: 'May 2, 2025', bookings: 0, status: 'pending', city: 'Brooklyn, NY' },
  { id: 8, name: 'Amanda White', email: 'amanda@riverdaletennis.com', role: 'owner', joined: 'Jun 10, 2025', bookings: 0, status: 'active', city: 'Bronx, NY' },
]

export default function UserManagement({ nav }: { nav: (p: Page) => void }) {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const sidebarItems = [
    { page: 'admin-dashboard' as Page, label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { page: 'admin-approvals' as Page, label: 'Facility Approval', icon: <ShieldCheck size={16} /> },
    { page: 'admin-users' as Page, label: 'Users', icon: <Users size={16} /> },
    { page: 'admin-reports' as Page, label: 'Reports', icon: <BarChart3 size={16} /> },
    { page: 'admin-profile' as Page, label: 'Settings', icon: <Settings size={16} /> },
  ]

  const filtered = users.filter(u => {
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false
    if (roleFilter !== 'all' && u.role !== roleFilter) return false
    if (statusFilter !== 'all' && u.status !== statusFilter) return false
    return true
  })

  const statusBadge: Record<string, 'green' | 'red' | 'yellow'> = {
    active: 'green', suspended: 'red', pending: 'yellow',
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar nav={nav} current="admin-users" items={sidebarItems} role="admin" userName="Admin User" userEmail="admin@quickbolt.com" />
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#e2e8f0] px-8 py-5">
          <h1 className="text-xl font-bold text-[#0f172a]">User Management</h1>
          <p className="text-sm text-[#64748b]">{users.length} total users</p>
        </div>
        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: 'Total Users', val: users.filter(u => u.role === 'user').length, c: 'text-[#2563eb]' },
              { label: 'Facility Owners', val: users.filter(u => u.role === 'owner').length, c: 'text-[#f97316]' },
              { label: 'Active', val: users.filter(u => u.status === 'active').length, c: 'text-[#10b981]' },
              { label: 'Suspended', val: users.filter(u => u.status === 'suspended').length, c: 'text-[#ef4444]' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-[#e2e8f0] p-4">
                <p className={`text-2xl font-extrabold ${s.c}`}>{s.val}</p>
                <p className="text-xs text-[#64748b]">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-5">
            <div className="flex items-center gap-2 flex-1 min-w-48 bg-white border border-[#e2e8f0] rounded-xl px-4 py-2.5">
              <Search size={15} className="text-[#94a3b8]" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search users..." className="flex-1 bg-transparent outline-none text-sm placeholder-[#94a3b8]" />
            </div>
            <div className="flex gap-2">
              {['all', 'user', 'owner'].map(r => (
                <button key={r} onClick={() => setRoleFilter(r)} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors capitalize ${roleFilter === r ? 'bg-[#2563eb] text-white' : 'bg-white border border-[#e2e8f0] text-[#64748b]'}`}>{r === 'all' ? 'All Roles' : r === 'owner' ? 'Owners' : 'Players'}</button>
              ))}
            </div>
            <div className="flex gap-2">
              {['all', 'active', 'suspended'].map(s => (
                <button key={s} onClick={() => setStatusFilter(s)} className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors capitalize ${statusFilter === s ? 'bg-[#0f172a] text-white' : 'bg-white border border-[#e2e8f0] text-[#64748b]'}`}>{s === 'all' ? 'All Status' : s}</button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#f8fafc] bg-[#f8fafc]">
                  {['User', 'Role', 'Location', 'Joined', 'Bookings', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(u => (
                  <tr key={u.id} className="border-b border-[#f8fafc] last:border-0 hover:bg-[#f8fafc] transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#dbeafe] text-[#2563eb] flex items-center justify-center text-sm font-bold">
                          {u.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-[#0f172a]">{u.name}</p>
                          <p className="text-xs text-[#94a3b8]">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4"><Badge variant={u.role === 'owner' ? 'orange' : 'blue'}>{u.role === 'owner' ? 'Owner' : 'Player'}</Badge></td>
                    <td className="px-5 py-4 text-sm text-[#64748b]">{u.city}</td>
                    <td className="px-5 py-4 text-sm text-[#64748b]">{u.joined}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-[#0f172a]">{u.bookings}</td>
                    <td className="px-5 py-4"><Badge variant={statusBadge[u.status]}>{u.status}</Badge></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelectedUser(u)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#dbeafe] text-[#64748b] hover:text-[#2563eb] transition-colors"><Eye size={14} /></button>
                        <button className={`w-7 h-7 flex items-center justify-center rounded-lg transition-colors ${u.status === 'suspended' ? 'hover:bg-[#d1fae5] text-[#64748b] hover:text-[#10b981]' : 'hover:bg-[#fef9c3] text-[#64748b] hover:text-[#f59e0b]'}`}>
                          {u.status === 'suspended' ? <UserCheck size={14} /> : <UserX size={14} />}
                        </button>
                        <button onClick={() => setDeletingId(u.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 text-[#64748b] hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedUser && (
          <Modal open={true} onClose={() => setSelectedUser(null)} title="User Profile">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#dbeafe] text-[#2563eb] flex items-center justify-center text-xl font-extrabold">
                  {selectedUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-lg text-[#0f172a]">{selectedUser.name}</p>
                  <p className="text-sm text-[#64748b]">{selectedUser.email}</p>
                  <Badge variant={statusBadge[selectedUser.status]}>{selectedUser.status}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {[
                  { l: 'Role', v: selectedUser.role === 'owner' ? 'Facility Owner' : 'Player' },
                  { l: 'City', v: selectedUser.city },
                  { l: 'Member Since', v: selectedUser.joined },
                  { l: 'Total Bookings', v: selectedUser.bookings.toString() },
                ].map(f => (
                  <div key={f.l} className="bg-[#f8fafc] rounded-xl p-3">
                    <p className="text-xs text-[#94a3b8] mb-0.5">{f.l}</p>
                    <p className="font-semibold text-[#0f172a]">{f.v}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                {selectedUser.status === 'active' ? (
                  <Button variant="danger" fullWidth><UserX size={15} /> Suspend User</Button>
                ) : (
                  <Button variant="success" fullWidth><UserCheck size={15} /> Activate User</Button>
                )}
                <Button variant="secondary" fullWidth onClick={() => setSelectedUser(null)}>Close</Button>
              </div>
            </div>
          </Modal>
        )}

        <Modal open={deletingId !== null} onClose={() => setDeletingId(null)} title="Delete User" width="max-w-sm">
          <p className="text-sm text-[#64748b] mb-5">This will permanently delete the user account and all associated data. This action cannot be undone.</p>
          <div className="flex gap-3">
            <Button variant="danger" fullWidth onClick={() => setDeletingId(null)}>Delete User</Button>
            <Button variant="secondary" fullWidth onClick={() => setDeletingId(null)}>Cancel</Button>
          </div>
        </Modal>
      </main>
    </div>
  )
}

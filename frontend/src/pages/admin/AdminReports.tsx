import { useState } from 'react'
import { LayoutDashboard, ShieldCheck, Users, BarChart3, Settings, AlertTriangle, Flag, CheckCircle, XCircle, MessageSquare } from 'lucide-react'
import { Badge, Button, StatCard } from '../../components/ui'
import Sidebar from '../../components/layout/Sidebar'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import type { Page } from '../../App'

const platformRevenue = [
  { month: 'Jan', rev: 24000 }, { month: 'Feb', rev: 31000 }, { month: 'Mar', rev: 38000 },
  { month: 'Apr', rev: 42000 }, { month: 'May', rev: 56000 }, { month: 'Jun', rev: 68000 }, { month: 'Jul', rev: 74000 },
]

const bookingStats = [
  { month: 'Jan', b: 1820 }, { month: 'Feb', b: 2140 }, { month: 'Mar', b: 2680 },
  { month: 'Apr', b: 3100 }, { month: 'May', b: 4200 }, { month: 'Jun', b: 5400 }, { month: 'Jul', b: 6200 },
]

const reports = [
  { id: 1, type: 'facility', target: 'Quick Courts NYC', reporter: 'James Walker', reason: 'Misleading photos and dirty facilities', date: 'Jul 8, 2025', status: 'pending' },
  { id: 2, type: 'review', target: '"Worst place ever" review by anon', reporter: 'Arena Sports Complex (Owner)', reason: 'Fake/spam review from competitor', date: 'Jul 7, 2025', status: 'pending' },
  { id: 3, type: 'user', target: 'spam_user_99@email.com', reporter: 'System (automated)', reason: 'Repeated no-shows and fraudulent bookings', date: 'Jul 5, 2025', status: 'resolved' },
  { id: 4, type: 'facility', target: 'Budget Courts LIC', reporter: 'Michael Torres', reason: 'Court condition does not match description', date: 'Jul 3, 2025', status: 'dismissed' },
]

export default function AdminReports({ nav }: { nav: (p: Page) => void }) {
  const [section, setSection] = useState<'platform' | 'moderation'>('platform')

  const sidebarItems = [
    { page: 'admin-dashboard' as Page, label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { page: 'admin-approvals' as Page, label: 'Facility Approval', icon: <ShieldCheck size={16} /> },
    { page: 'admin-users' as Page, label: 'Users', icon: <Users size={16} /> },
    { page: 'admin-reports' as Page, label: 'Reports', icon: <BarChart3 size={16} /> },
    { page: 'admin-profile' as Page, label: 'Settings', icon: <Settings size={16} /> },
  ]

  const typeIcon: Record<string, string> = { facility: '🏟️', review: '⭐', user: '👤' }
  const statusBadge: Record<string, 'yellow' | 'green' | 'gray'> = { pending: 'yellow', resolved: 'green', dismissed: 'gray' }

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar nav={nav} current="admin-reports" items={sidebarItems} role="admin" userName="Admin User" userEmail="admin@quickbolt.com" />
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#e2e8f0] px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#0f172a]">Reports & Moderation</h1>
          </div>
          <div className="flex gap-1 bg-[#f1f5f9] rounded-xl p-1">
            <button onClick={() => setSection('platform')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${section === 'platform' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-[#64748b]'}`}>Platform Analytics</button>
            <button onClick={() => setSection('moderation')} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${section === 'moderation' ? 'bg-white text-[#0f172a] shadow-sm' : 'text-[#64748b]'}`}>Moderation</button>
          </div>
        </div>

        <div className="p-8">
          {section === 'platform' ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                <StatCard icon={<BarChart3 size={18} />} label="Total Revenue" value="$2.1M" delta="+18% YoY" color="green" />
                <StatCard icon={<Users size={18} />} label="Total Bookings" value="98,400" delta="+24%" color="blue" />
                <StatCard icon={<AlertTriangle size={18} />} label="Open Reports" value="4" color="orange" />
                <StatCard icon={<Flag size={18} />} label="Flagged Venues" value="2" color="purple" />
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
                  <h2 className="font-bold text-[#0f172a] mb-4">Platform Revenue</h2>
                  <ResponsiveContainer width="100%" height={220}>
                    <AreaChart data={platformRevenue}>
                      <defs>
                        <linearGradient id="prGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                      <Tooltip formatter={v => [`$${v}`, 'Revenue']} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                      <Area type="monotone" dataKey="rev" stroke="#10b981" strokeWidth={2.5} fill="url(#prGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
                  <h2 className="font-bold text-[#0f172a] mb-4">Booking Volume</h2>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={bookingStats} barSize={24}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                      <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                      <Bar dataKey="b" fill="#2563eb" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'User Reports', val: reports.filter(r => r.type === 'user').length, color: 'text-[#2563eb]' },
                  { label: 'Flagged Venues', val: reports.filter(r => r.type === 'facility').length, color: 'text-[#f97316]' },
                  { label: 'Flagged Reviews', val: reports.filter(r => r.type === 'review').length, color: 'text-red-500' },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-[#e2e8f0] p-4">
                    <p className={`text-2xl font-extrabold ${s.color}`}>{s.val}</p>
                    <p className="text-xs text-[#64748b]">{s.label}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-2xl border border-[#e2e8f0] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#f1f5f9] flex items-center justify-between">
                  <h2 className="font-bold text-[#0f172a]">Moderation Queue</h2>
                  <Badge variant="yellow">{reports.filter(r => r.status === 'pending').length} pending</Badge>
                </div>
                <div className="flex flex-col divide-y divide-[#f8fafc]">
                  {reports.map(r => (
                    <div key={r.id} className="p-5 flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#f8fafc] rounded-xl flex items-center justify-center text-xl shrink-0">{typeIcon[r.type]}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-semibold text-sm text-[#0f172a]">{r.target}</span>
                          <Badge variant={statusBadge[r.status]}>{r.status}</Badge>
                        </div>
                        <p className="text-xs text-[#64748b] mb-1"><strong>Reporter:</strong> {r.reporter}</p>
                        <p className="text-xs text-[#64748b]"><strong>Reason:</strong> {r.reason}</p>
                        <p className="text-xs text-[#94a3b8] mt-1">{r.date}</p>
                      </div>
                      {r.status === 'pending' && (
                        <div className="flex gap-2 shrink-0">
                          <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-[#d1fae5] text-[#065f46] rounded-lg hover:bg-[#a7f3d0] transition-colors"><CheckCircle size={12} /> Resolve</button>
                          <button className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-[#f1f5f9] text-[#64748b] rounded-lg hover:bg-[#e2e8f0] transition-colors"><XCircle size={12} /> Dismiss</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  )
}

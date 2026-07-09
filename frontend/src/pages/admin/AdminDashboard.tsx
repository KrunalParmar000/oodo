import { LayoutDashboard, ShieldCheck, Users, Building2, BookOpen, BarChart3, Settings, TrendingUp, DollarSign, Star } from 'lucide-react'
import { StatCard, Badge } from '../../components/ui'
import Sidebar from '../../components/layout/Sidebar'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LineChart, Line } from 'recharts'
import type { Page } from '../../App'

const userGrowth = [
  { month: 'Jan', users: 1200 }, { month: 'Feb', users: 1850 }, { month: 'Mar', users: 2400 },
  { month: 'Apr', users: 3100 }, { month: 'May', users: 4200 }, { month: 'Jun', users: 5800 }, { month: 'Jul', users: 7200 },
]

const revenueData = [
  { month: 'Jan', revenue: 24000 }, { month: 'Feb', revenue: 31000 }, { month: 'Mar', revenue: 38000 },
  { month: 'Apr', revenue: 42000 }, { month: 'May', revenue: 56000 }, { month: 'Jun', revenue: 68000 }, { month: 'Jul', revenue: 74000 },
]

const topSports = [
  { sport: 'Football', bookings: 4820 },
  { sport: 'Tennis', bookings: 3960 },
  { sport: 'Basketball', bookings: 3140 },
  { sport: 'Badminton', bookings: 2680 },
  { sport: 'Swimming', bookings: 1820 },
]

const approvalTrend = [
  { month: 'Jan', approved: 8, rejected: 2 }, { month: 'Feb', approved: 12, rejected: 3 },
  { month: 'Mar', approved: 15, rejected: 4 }, { month: 'Apr', approved: 10, rejected: 1 },
  { month: 'May', approved: 18, rejected: 5 }, { month: 'Jun', approved: 22, rejected: 3 },
]

const recentActivity = [
  { type: 'approval', text: 'GreenField Sports applied for approval', time: '5 min ago', dot: 'bg-[#f97316]' },
  { type: 'user', text: 'New user registered: Sarah Mitchell', time: '12 min ago', dot: 'bg-[#2563eb]' },
  { type: 'report', text: 'User report filed against "FastCourt NY"', time: '28 min ago', dot: 'bg-red-500' },
  { type: 'approval', text: 'City Arena approved by admin', time: '1 hr ago', dot: 'bg-[#10b981]' },
  { type: 'user', text: 'User account suspended: john.doe@email.com', time: '2 hrs ago', dot: 'bg-[#f59e0b]' },
]

export default function AdminDashboard({ nav }: { nav: (p: Page) => void }) {
  const sidebarItems = [
    { page: 'admin-dashboard' as Page, label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { page: 'admin-approvals' as Page, label: 'Facility Approval', icon: <ShieldCheck size={16} /> },
    { page: 'admin-users' as Page, label: 'Users', icon: <Users size={16} /> },
    { page: 'admin-reports' as Page, label: 'Reports', icon: <BarChart3 size={16} /> },
    { page: 'admin-profile' as Page, label: 'Settings', icon: <Settings size={16} /> },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar nav={nav} current="admin-dashboard" items={sidebarItems} role="admin" userName="Admin User" userEmail="admin@quickbolt.com" />
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#e2e8f0] px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#0f172a]">Admin Dashboard</h1>
            <p className="text-sm text-[#64748b]">Platform overview · July 2025</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => nav('admin-approvals')} className="flex items-center gap-2 bg-[#ffedd5] text-[#c2410c] text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#fed7aa] transition-colors">
              <ShieldCheck size={15} /> 4 Pending Approvals
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
            {[
              { label: 'Total Users', val: '7,284', color: 'blue', icon: <Users size={16} /> },
              { label: 'Facility Owners', val: '312', color: 'orange', icon: <Building2 size={16} /> },
              { label: 'Venues', val: '2,408', color: 'green', icon: <Building2 size={16} /> },
              { label: 'Courts', val: '8,640', color: 'purple', icon: <LayoutDashboard size={16} /> },
              { label: 'Bookings', val: '98.4K', color: 'blue', icon: <BookOpen size={16} /> },
              { label: 'Revenue', val: '$2.1M', color: 'green', icon: <DollarSign size={16} /> },
            ].map(s => (
              <StatCard key={s.label} icon={s.icon} label={s.label} value={s.val} color={s.color as 'blue' | 'orange' | 'green' | 'purple'} />
            ))}
          </div>

          {/* Charts row 1 */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* User growth */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-[#0f172a]">User Growth</h2>
                <div className="flex items-center gap-1.5 text-[#10b981] text-xs font-semibold bg-[#d1fae5] px-2.5 py-1 rounded-full"><TrendingUp size={11} /> +24% this month</div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={userGrowth}>
                  <defs>
                    <linearGradient id="ugGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Area type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={2.5} fill="url(#ugGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Revenue */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="font-bold text-[#0f172a] mb-4">Platform Revenue</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={v => [`$${v}`, 'Revenue']} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', strokeWidth: 0, r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Charts row 2 */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Popular sports */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="font-bold text-[#0f172a] mb-4">Most Popular Sports</h2>
              <div className="flex flex-col gap-3">
                {topSports.map((s, i) => (
                  <div key={s.sport}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#334155] font-medium">{s.sport}</span>
                      <span className="font-bold text-[#0f172a]">{s.bookings.toLocaleString()}</span>
                    </div>
                    <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-[#2563eb]" style={{ width: `${(s.bookings / 4820) * 100}%`, opacity: 1 - i * 0.15 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Approval trend */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="font-bold text-[#0f172a] mb-4">Facility Approvals</h2>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={approvalTrend} barSize={12}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Bar dataKey="approved" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="rejected" fill="#fca5a5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex gap-4 mt-2 text-xs">
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" /> Approved</span>
                <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#fca5a5]" /> Rejected</span>
              </div>
            </div>

            {/* Activity feed */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="font-bold text-[#0f172a] mb-4">Recent Activity</h2>
              <div className="flex flex-col gap-4">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${a.dot}`} />
                    <div>
                      <p className="text-xs text-[#334155] leading-relaxed">{a.text}</p>
                      <p className="text-[10px] text-[#94a3b8] mt-0.5">{a.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

import { LayoutDashboard, Building2, Layers, CalendarClock, BookOpen, BarChart3, User, TrendingUp, Download } from 'lucide-react'
import { StatCard } from '../../components/ui'
import Sidebar from '../../components/layout/Sidebar'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts'
import type { Page } from '../../App'

const monthlyRevenue = [
  { month: 'Jan', revenue: 8200 }, { month: 'Feb', revenue: 9400 }, { month: 'Mar', revenue: 11200 },
  { month: 'Apr', revenue: 10800 }, { month: 'May', revenue: 13600 }, { month: 'Jun', revenue: 15200 },
  { month: 'Jul', revenue: 12800 },
]

const bookingTrend = [
  { week: 'W1', bookings: 68 }, { week: 'W2', bookings: 82 }, { week: 'W3', bookings: 75 },
  { week: 'W4', bookings: 94 }, { week: 'W5', bookings: 108 }, { week: 'W6', bookings: 119 },
]

const popularCourts = [
  { court: 'Court A (Tennis)', bookings: 312 },
  { court: 'Court B (Tennis)', bookings: 278 },
  { court: 'Basketball 1', bookings: 204 },
  { court: 'Court C (Badminton)', bookings: 186 },
  { court: 'Football A', bookings: 142 },
]

const sportBreakdown = [
  { name: 'Tennis', value: 42 },
  { name: 'Basketball', value: 22 },
  { name: 'Badminton', value: 20 },
  { name: 'Football', value: 16 },
]

const PIE_COLORS = ['#2563eb', '#f97316', '#10b981', '#7c3aed']

export default function OwnerReports({ nav }: { nav: (p: Page) => void }) {
  const sidebarItems = [
    { page: 'owner-dashboard' as Page, label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { page: 'owner-facilities' as Page, label: 'Facilities', icon: <Building2 size={16} /> },
    { page: 'owner-courts' as Page, label: 'Courts', icon: <Layers size={16} /> },
    { page: 'owner-slots' as Page, label: 'Time Slots', icon: <CalendarClock size={16} /> },
    { page: 'owner-bookings' as Page, label: 'Bookings', icon: <BookOpen size={16} /> },
    { page: 'owner-reports' as Page, label: 'Reports', icon: <BarChart3 size={16} /> },
    { page: 'owner-profile' as Page, label: 'Profile', icon: <User size={16} /> },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar nav={nav} current="owner-reports" items={sidebarItems} role="owner" userName="David Chen" userEmail="david@arenacomplex.com" />
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#e2e8f0] px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#0f172a]">Reports & Analytics</h1>
            <p className="text-sm text-[#64748b]">Performance overview — July 2025</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="bg-white border border-[#e2e8f0] rounded-xl px-4 py-2 text-sm outline-none">
              <option>This Month</option><option>Last Month</option><option>Last 3 Months</option><option>This Year</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#e2e8f0] rounded-xl text-sm font-medium text-[#334155] hover:bg-[#f8fafc]">
              <Download size={14} /> Export
            </button>
          </div>
        </div>

        <div className="p-8">
          {/* KPI cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard icon={<TrendingUp size={18} />} label="Total Revenue" value="$80,400" delta="+24% vs last month" color="green" />
            <StatCard icon={<BookOpen size={18} />} label="Total Bookings" value="546" delta="+18%" color="blue" />
            <StatCard icon={<BarChart3 size={18} />} label="Avg Booking Value" value="$31" delta="+5%" color="orange" />
            <StatCard icon={<User size={18} />} label="Unique Customers" value="214" delta="+32" color="purple" />
          </div>

          {/* Monthly revenue + sport breakdown */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="font-bold text-[#0f172a] mb-4">Monthly Revenue</h2>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={monthlyRevenue}>
                  <defs>
                    <linearGradient id="mRevGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v) => [`$${v}`, 'Revenue']} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2.5} fill="url(#mRevGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="font-bold text-[#0f172a] mb-4">Sport Breakdown</h2>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={sportBreakdown} dataKey="value" cx="50%" cy="50%" outerRadius={65} paddingAngle={3}>
                    {sportBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`, '']} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-2 mt-3">
                {sportBreakdown.map((s, i) => (
                  <div key={s.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full" style={{ background: PIE_COLORS[i] }} />{s.name}</div>
                    <span className="font-semibold text-[#0f172a]">{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking trend + popular courts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="font-bold text-[#0f172a] mb-4">Weekly Booking Trend</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={bookingTrend} barSize={28}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Bar dataKey="bookings" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="font-bold text-[#0f172a] mb-4">Popular Courts</h2>
              <div className="flex flex-col gap-3">
                {popularCourts.map((c, i) => (
                  <div key={c.court}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-[#334155]">{c.court}</span>
                      <span className="font-bold text-[#0f172a]">{c.bookings}</span>
                    </div>
                    <div className="h-2 bg-[#f1f5f9] rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(c.bookings / 312) * 100}%`, background: PIE_COLORS[i % PIE_COLORS.length] }} />
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

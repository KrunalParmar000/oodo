import { LayoutDashboard, Building2, Layers, CalendarClock, BookOpen, BarChart3, User, TrendingUp, Users, DollarSign, Calendar } from 'lucide-react'
import { StatCard, Badge } from '../../components/ui'
import Sidebar from '../../components/layout/Sidebar'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import type { Page } from '../../App'

const weeklyRevenue = [
  { day: 'Mon', revenue: 480, bookings: 12 },
  { day: 'Tue', revenue: 620, bookings: 16 },
  { day: 'Wed', revenue: 540, bookings: 14 },
  { day: 'Thu', revenue: 780, bookings: 20 },
  { day: 'Fri', revenue: 920, bookings: 24 },
  { day: 'Sat', revenue: 1240, bookings: 32 },
  { day: 'Sun', revenue: 1080, bookings: 28 },
]

const peakHours = [
  { hour: '6AM', bookings: 4 }, { hour: '8AM', bookings: 8 }, { hour: '10AM', bookings: 6 },
  { hour: '12PM', bookings: 10 }, { hour: '2PM', bookings: 7 }, { hour: '4PM', bookings: 14 },
  { hour: '6PM', bookings: 18 }, { hour: '8PM', bookings: 12 }, { hour: '10PM', bookings: 5 },
]

const recentBookings = [
  { user: 'Michael Torres', court: 'Court A (Tennis)', time: '6:00 PM', date: 'Today', amount: 25, status: 'confirmed' },
  { user: 'Priya Sharma', court: 'Court B (Tennis)', time: '7:00 PM', date: 'Today', amount: 30, status: 'confirmed' },
  { user: 'James Walker', court: 'Badminton 1', time: '8:00 PM', date: 'Today', amount: 22, status: 'pending' },
  { user: 'Sarah Kim', court: 'Court A (Tennis)', time: '6:00 PM', date: 'Tomorrow', amount: 25, status: 'confirmed' },
  { user: 'Carlos Ruiz', court: 'Court C (Badminton)', time: '9:00 AM', date: 'Jul 12', amount: 22, status: 'confirmed' },
]

export default function OwnerDashboard({ nav }: { nav: (p: Page) => void }) {
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
      <Sidebar nav={nav} current="owner-dashboard" items={sidebarItems} role="owner" userName="David Chen" userEmail="david@arenacomplex.com" />
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white border-b border-[#e2e8f0] px-8 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#0f172a]" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>Good morning, David 👋</h1>
            <p className="text-sm text-[#64748b]">Wednesday, July 9, 2025 · Arena Sports Complex</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="green">All courts open</Badge>
            <button onClick={() => nav('owner-bookings')} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors">View Bookings</button>
          </div>
        </div>

        <div className="p-8">
          {/* Stat cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard icon={<BookOpen size={18} />} label="Today's Bookings" value="18" delta="+3 vs yesterday" color="blue" />
            <StatCard icon={<DollarSign size={18} />} label="Today's Revenue" value="$486" delta="+12%" color="green" />
            <StatCard icon={<Layers size={18} />} label="Active Courts" value="6 / 8" color="orange" />
            <StatCard icon={<Users size={18} />} label="Total Bookings" value="1,284" delta="this month" color="purple" />
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Revenue trend */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-bold text-[#0f172a]">Weekly Revenue</h2>
                  <p className="text-xs text-[#94a3b8] mt-0.5">Jul 7 – Jul 13, 2025</p>
                </div>
                <div className="flex items-center gap-1.5 text-[#10b981] bg-[#d1fae5] px-3 py-1 rounded-full text-xs font-semibold">
                  <TrendingUp size={12} /> +18% vs last week
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={weeklyRevenue}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
                  <Tooltip formatter={(v) => [`$${v}`, 'Revenue']} contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={2.5} fill="url(#revGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Peak hours */}
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h2 className="font-bold text-[#0f172a] mb-1">Peak Hours</h2>
              <p className="text-xs text-[#94a3b8] mb-4">Today's booking distribution</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={peakHours} barSize={18}>
                  <XAxis dataKey="hour" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Bar dataKey="bookings" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent bookings */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#f1f5f9]">
              <h2 className="font-bold text-[#0f172a]">Recent Bookings</h2>
              <button onClick={() => nav('owner-bookings')} className="text-sm text-[#2563eb] font-semibold hover:underline">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#f8fafc]">
                    {['Player', 'Court', 'Date', 'Time', 'Amount', 'Status'].map(h => (
                      <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-[#94a3b8] uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((b, i) => (
                    <tr key={i} className="border-b border-[#f8fafc] last:border-0 hover:bg-[#f8fafc] transition-colors">
                      <td className="px-6 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#dbeafe] text-[#2563eb] flex items-center justify-center text-xs font-bold">{b.user.split(' ').map(n => n[0]).join('')}</div>
                          <span className="text-sm font-medium text-[#0f172a]">{b.user}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-sm text-[#334155]">{b.court}</td>
                      <td className="px-6 py-3.5 text-sm text-[#64748b]">{b.date}</td>
                      <td className="px-6 py-3.5 text-sm text-[#64748b]">{b.time}</td>
                      <td className="px-6 py-3.5 text-sm font-bold text-[#0f172a]">${b.amount}</td>
                      <td className="px-6 py-3.5">
                        <Badge variant={b.status === 'confirmed' ? 'green' : 'yellow'}>{b.status}</Badge>
                      </td>
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

import { Zap } from 'lucide-react'
import type { Page } from '../../App'
import type { ReactNode } from 'react'

interface SidebarItem {
  page: Page
  label: string
  icon: ReactNode
}

interface SidebarProps {
  nav: (p: Page) => void
  current: Page
  items: SidebarItem[]
  role: 'owner' | 'admin'
  userName: string
  userEmail: string
}

export default function Sidebar({ nav, current, items, role, userName, userEmail }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 h-screen sticky top-0 bg-white border-r border-[#e2e8f0] flex flex-col overflow-y-auto">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-[#e2e8f0]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#2563eb] rounded-lg flex items-center justify-center">
            <Zap size={16} className="text-white" fill="white" />
          </div>
          <span className="font-extrabold text-[#0f172a] text-lg" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Quick<span className="text-[#2563eb]">Bolt</span>
          </span>
        </div>
      </div>

      {/* Role badge */}
      <div className="px-4 py-3">
        <div className="bg-[#f8fafc] rounded-xl px-3 py-2">
          <p className="text-xs text-[#94a3b8] uppercase tracking-wider font-semibold">
            {role === 'owner' ? 'Facility Owner' : 'Administrator'}
          </p>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2">
        {items.map(item => (
          <button
            key={item.page}
            onClick={() => nav(item.page)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium mb-0.5 transition-all ${
              current === item.page
                ? 'bg-[#dbeafe] text-[#2563eb]'
                : 'text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]'
            }`}
          >
            <span className={`${current === item.page ? 'text-[#2563eb]' : 'text-[#94a3b8]'}`}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* User footer */}
      <div className="p-4 border-t border-[#e2e8f0]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#dbeafe] text-[#2563eb] flex items-center justify-center text-sm font-bold">
            {userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#0f172a] truncate">{userName}</p>
            <p className="text-xs text-[#94a3b8] truncate">{userEmail}</p>
          </div>
        </div>
      </div>
    </aside>
  )
}

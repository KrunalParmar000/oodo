import { useState } from 'react'
import { LayoutDashboard, ShieldCheck, Users, BarChart3, Settings, Camera, Shield, Bell, Lock, LogOut, Globe, Moon } from 'lucide-react'
import { Button, Input } from '../../components/ui'
import Sidebar from '../../components/layout/Sidebar'
import type { Page } from '../../App'

export default function AdminProfile({ nav }: { nav: (p: Page) => void }) {
  const [tab, setTab] = useState('personal')

  const sidebarItems = [
    { page: 'admin-dashboard' as Page, label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { page: 'admin-approvals' as Page, label: 'Facility Approval', icon: <ShieldCheck size={16} /> },
    { page: 'admin-users' as Page, label: 'Users', icon: <Users size={16} /> },
    { page: 'admin-reports' as Page, label: 'Reports', icon: <BarChart3 size={16} /> },
    { page: 'admin-profile' as Page, label: 'Settings', icon: <Settings size={16} /> },
  ]

  const tabs = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'password', label: 'Security' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'system', label: 'System' },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar nav={nav} current="admin-profile" items={sidebarItems} role="admin" userName="Admin User" userEmail="admin@quickbolt.com" />
      <main className="flex-1 overflow-y-auto">
        <div className="bg-white border-b border-[#e2e8f0] px-8 py-5">
          <h1 className="text-xl font-bold text-[#0f172a]">Admin Profile & Settings</h1>
        </div>
        <div className="p-8 max-w-3xl">
          {/* Profile card */}
          <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6 mb-6">
            <div className="flex items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1e3a8a] to-[#2563eb] flex items-center justify-center text-2xl font-extrabold text-white">A</div>
                <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#2563eb] rounded-full flex items-center justify-center shadow-md"><Camera size={12} className="text-white" /></button>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-[#0f172a]">Admin User</h2>
                  <span className="bg-[#0f172a] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">ADMIN</span>
                </div>
                <p className="text-sm text-[#64748b]">admin@quickbolt.com</p>
                <p className="text-xs text-[#94a3b8] mt-1">Super Administrator · All permissions</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white border border-[#e2e8f0] rounded-xl p-1 mb-6">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-colors ${tab === t.id ? 'bg-[#0f172a] text-white shadow-sm' : 'text-[#64748b] hover:text-[#0f172a]'}`}>{t.label}</button>
            ))}
          </div>

          {tab === 'personal' && (
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h3 className="text-base font-bold text-[#0f172a] mb-5">Personal Information</h3>
              <div className="grid sm:grid-cols-2 gap-4 mb-5">
                <Input label="Full Name" defaultValue="System Administrator" />
                <Input label="Email" type="email" defaultValue="admin@quickbolt.com" />
                <Input label="Phone" defaultValue="+1 (555) 000-0001" />
                <Input label="Department" defaultValue="Platform Operations" />
              </div>
              <Button>Save Changes</Button>
            </div>
          )}

          {tab === 'password' && (
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
                <h3 className="text-base font-bold text-[#0f172a] mb-5">Change Password</h3>
                <div className="flex flex-col gap-4">
                  <Input label="Current Password" type="password" placeholder="••••••••" icon={<Lock size={15} />} />
                  <Input label="New Password" type="password" placeholder="New password" icon={<Lock size={15} />} />
                  <Input label="Confirm Password" type="password" placeholder="Confirm" icon={<Lock size={15} />} />
                  <Button>Update Password</Button>
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-[#e2e8f0] p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-[#d1fae5] rounded-xl flex items-center justify-center text-[#10b981]"><Shield size={18} /></div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-[#0f172a]">Two-Factor Authentication</p>
                  <p className="text-xs text-[#64748b]">Strongly recommended for admin accounts</p>
                </div>
                <Button size="sm" variant="outline">Enable 2FA</Button>
              </div>
            </div>
          )}

          {tab === 'notifications' && (
            <div className="bg-white rounded-2xl border border-[#e2e8f0] p-6">
              <h3 className="text-base font-bold text-[#0f172a] mb-5">Admin Notifications</h3>
              <div className="flex flex-col gap-1">
                {[
                  { l: 'New facility approval requests', d: 'Alert when an owner submits for review', on: true },
                  { l: 'User reports filed', d: 'Notify when a user submits a report', on: true },
                  { l: 'Daily summary email', d: 'Morning briefing with platform stats', on: true },
                  { l: 'Revenue alerts', d: 'When daily revenue drops below threshold', on: false },
                  { l: 'System alerts', d: 'Infrastructure and uptime notifications', on: true },
                ].map(n => (
                  <div key={n.l} className="flex items-center justify-between py-3 border-b border-[#f8fafc] last:border-0">
                    <div>
                      <p className="text-sm font-semibold text-[#0f172a]">{n.l}</p>
                      <p className="text-xs text-[#94a3b8]">{n.d}</p>
                    </div>
                    <button className={`relative w-11 h-6 rounded-full transition-colors ${n.on ? 'bg-[#2563eb]' : 'bg-[#e2e8f0]'}`}>
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${n.on ? 'left-5' : 'left-0.5'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'system' && (
            <div className="flex flex-col gap-4">
              {[
                { icon: <Globe size={18} />, color: 'bg-[#dbeafe] text-[#2563eb]', l: 'Platform Language', d: 'Currently: English (US)', action: 'Change' },
                { icon: <Moon size={18} />, color: 'bg-[#ede9fe] text-[#7c3aed]', l: 'Interface Theme', d: 'Currently: Light Mode', action: 'Switch' },
                { icon: <Bell size={18} />, color: 'bg-[#ffedd5] text-[#f97316]', l: 'Email Digest Frequency', d: 'Currently: Daily at 8:00 AM', action: 'Configure' },
                { icon: <Shield size={18} />, color: 'bg-[#d1fae5] text-[#10b981]', l: 'Session Timeout', d: 'Currently: 8 hours', action: 'Change' },
              ].map(s => (
                <div key={s.l} className="bg-white rounded-2xl border border-[#e2e8f0] p-5 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}>{s.icon}</div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-[#0f172a]">{s.l}</p>
                    <p className="text-xs text-[#64748b]">{s.d}</p>
                  </div>
                  <button className="text-sm text-[#2563eb] font-semibold hover:underline">{s.action}</button>
                </div>
              ))}
              <div className="bg-white rounded-2xl border border-red-200 p-5 flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-red-500"><LogOut size={18} /></div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-[#0f172a]">Sign Out</p>
                  <p className="text-xs text-[#64748b]">End your current admin session</p>
                </div>
                <button onClick={() => nav('welcome')} className="text-sm text-red-500 font-semibold hover:underline">Sign Out</button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

import { type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes } from 'react'

// Button
type BtnVariant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'danger' | 'success' | 'outline'
type BtnSize = 'sm' | 'md' | 'lg'

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant
  size?: BtnSize
  children: ReactNode
  fullWidth?: boolean
}

const btnStyles: Record<BtnVariant, string> = {
  primary: 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-sm',
  secondary: 'bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#334155]',
  accent: 'bg-[#f97316] hover:bg-[#ea6a00] text-white shadow-sm',
  ghost: 'bg-transparent hover:bg-[#f1f5f9] text-[#334155]',
  danger: 'bg-[#ef4444] hover:bg-[#dc2626] text-white shadow-sm',
  success: 'bg-[#10b981] hover:bg-[#059669] text-white shadow-sm',
  outline: 'bg-white hover:bg-[#f8fafc] text-[#2563eb] border border-[#2563eb]',
}
const btnSizes: Record<BtnSize, string> = {
  sm: 'px-3 py-1.5 text-xs rounded-lg',
  md: 'px-4 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3 text-base rounded-xl',
}

export function Button({ variant = 'primary', size = 'md', children, fullWidth, className = '', ...props }: BtnProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${btnStyles[variant]} ${btnSizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Badge
type BadgeVariant = 'blue' | 'orange' | 'green' | 'red' | 'gray' | 'yellow'
const badgeStyles: Record<BadgeVariant, string> = {
  blue: 'bg-[#dbeafe] text-[#1d4ed8]',
  orange: 'bg-[#ffedd5] text-[#c2410c]',
  green: 'bg-[#d1fae5] text-[#065f46]',
  red: 'bg-[#fee2e2] text-[#991b1b]',
  gray: 'bg-[#f1f5f9] text-[#475569]',
  yellow: 'bg-[#fef9c3] text-[#854d0e]',
}
export function Badge({ variant = 'gray', children }: { variant?: BadgeVariant; children: ReactNode }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${badgeStyles[variant]}`}>
      {children}
    </span>
  )
}

// Input
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: ReactNode
  suffix?: ReactNode
}
export function Input({ label, error, icon, suffix, className = '', ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium text-[#374151]">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94a3b8]">{icon}</div>}
        <input
          className={`w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm text-[#0f172a] placeholder-[#94a3b8] outline-none transition-all focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 ${icon ? 'pl-10' : ''} ${suffix ? 'pr-10' : ''} ${error ? 'border-red-400' : ''} ${className}`}
          {...props}
        />
        {suffix && <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94a3b8]">{suffix}</div>}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

// Card
export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-[#e2e8f0] shadow-sm ${className}`}>
      {children}
    </div>
  )
}

// StatCard
export function StatCard({ icon, label, value, delta, color = 'blue' }: {
  icon: ReactNode; label: string; value: string; delta?: string; color?: 'blue' | 'orange' | 'green' | 'purple'
}) {
  const colors = {
    blue: 'bg-[#dbeafe] text-[#2563eb]',
    orange: 'bg-[#ffedd5] text-[#f97316]',
    green: 'bg-[#d1fae5] text-[#10b981]',
    purple: 'bg-[#ede9fe] text-[#7c3aed]',
  }
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${colors[color]}`}>{icon}</div>
        {delta && <span className="text-xs font-semibold text-[#10b981] bg-[#d1fae5] px-2 py-0.5 rounded-full">{delta}</span>}
      </div>
      <p className="text-[#64748b] text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-[#0f172a]">{value}</p>
    </Card>
  )
}

// Select
export function Select({ label, options, value, onChange, className = '' }: {
  label?: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void; className?: string
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-sm font-medium text-[#374151]">{label}</label>}
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#e2e8f0] bg-white px-4 py-2.5 text-sm text-[#0f172a] outline-none focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10 cursor-pointer"
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}

// Modal
export function Modal({ open, onClose, title, children, width = 'max-w-lg' }: {
  open: boolean; onClose: () => void; title?: string; children: ReactNode; width?: string
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-xl w-full ${width} max-h-[90vh] overflow-y-auto`}>
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-[#e2e8f0]">
            <h3 className="text-lg font-bold text-[#0f172a]">{title}</h3>
            <button onClick={onClose} className="text-[#64748b] hover:text-[#0f172a] transition-colors text-xl leading-none">&times;</button>
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

// EmptyState
export function EmptyState({ icon, title, description, action }: {
  icon: ReactNode; title: string; description?: string; action?: ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="w-16 h-16 bg-[#f1f5f9] rounded-2xl flex items-center justify-center mb-4 text-[#94a3b8]">{icon}</div>
      <h3 className="text-lg font-bold text-[#0f172a] mb-2">{title}</h3>
      {description && <p className="text-sm text-[#64748b] mb-6 max-w-xs">{description}</p>}
      {action}
    </div>
  )
}

// Avatar
export function Avatar({ name, src, size = 'md' }: { name: string; src?: string; size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'w-8 h-8 text-xs', md: 'w-10 h-10 text-sm', lg: 'w-14 h-14 text-lg' }
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  if (src) return <img src={src} alt={name} className={`${sizes[size]} rounded-full object-cover`} />
  return (
    <div className={`${sizes[size]} rounded-full bg-[#dbeafe] text-[#2563eb] font-bold flex items-center justify-center`}>
      {initials}
    </div>
  )
}

import { useState } from 'react'
import WelcomePage from './pages/auth/WelcomePage'
import LoginPage from './pages/auth/LoginPage'
import RegisterPage from './pages/auth/RegisterPage'
import OTPPage from './pages/auth/OTPPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'
import HomePage from './pages/user/HomePage'
import VenuesPage from './pages/user/VenuesPage'
import VenueDetailPage from './pages/user/VenueDetailPage'
import BookingPage from './pages/user/BookingPage'
import BookingSuccessPage from './pages/user/BookingSuccessPage'
import MyBookingsPage from './pages/user/MyBookingsPage'
import UserProfilePage from './pages/user/UserProfilePage'
import OwnerDashboard from './pages/owner/OwnerDashboard'
import FacilityManagement from './pages/owner/FacilityManagement'
import CourtManagement from './pages/owner/CourtManagement'
import TimeSlotsPage from './pages/owner/TimeSlotsPage'
import OwnerBookings from './pages/owner/OwnerBookings'
import OwnerReports from './pages/owner/OwnerReports'
import OwnerProfile from './pages/owner/OwnerProfile'
import AdminDashboard from './pages/admin/AdminDashboard'
import FacilityApproval from './pages/admin/FacilityApproval'
import UserManagement from './pages/admin/UserManagement'
import AdminReports from './pages/admin/AdminReports'
import AdminProfile from './pages/admin/AdminProfile'

export type Page =
  | 'welcome' | 'login' | 'register' | 'otp' | 'forgot' | 'reset'
  | 'user-home' | 'user-venues' | 'user-venue-detail' | 'user-booking' | 'user-booking-success' | 'user-bookings' | 'user-profile'
  | 'owner-dashboard' | 'owner-facilities' | 'owner-courts' | 'owner-slots' | 'owner-bookings' | 'owner-reports' | 'owner-profile'
  | 'admin-dashboard' | 'admin-approvals' | 'admin-users' | 'admin-reports' | 'admin-profile'

export default function App() {
  const [page, setPage] = useState<Page>('welcome')

  const nav = (p: Page) => setPage(p)

  const renderPage = () => {
    switch (page) {
      case 'welcome': return <WelcomePage nav={nav} />
      case 'login': return <LoginPage nav={nav} />
      case 'register': return <RegisterPage nav={nav} />
      case 'otp': return <OTPPage nav={nav} />
      case 'forgot': return <ForgotPasswordPage nav={nav} />
      case 'reset': return <ResetPasswordPage nav={nav} />
      case 'user-home': return <HomePage nav={nav} />
      case 'user-venues': return <VenuesPage nav={nav} />
      case 'user-venue-detail': return <VenueDetailPage nav={nav} />
      case 'user-booking': return <BookingPage nav={nav} />
      case 'user-booking-success': return <BookingSuccessPage nav={nav} />
      case 'user-bookings': return <MyBookingsPage nav={nav} />
      case 'user-profile': return <UserProfilePage nav={nav} />
      case 'owner-dashboard': return <OwnerDashboard nav={nav} />
      case 'owner-facilities': return <FacilityManagement nav={nav} />
      case 'owner-courts': return <CourtManagement nav={nav} />
      case 'owner-slots': return <TimeSlotsPage nav={nav} />
      case 'owner-bookings': return <OwnerBookings nav={nav} />
      case 'owner-reports': return <OwnerReports nav={nav} />
      case 'owner-profile': return <OwnerProfile nav={nav} />
      case 'admin-dashboard': return <AdminDashboard nav={nav} />
      case 'admin-approvals': return <FacilityApproval nav={nav} />
      case 'admin-users': return <UserManagement nav={nav} />
      case 'admin-reports': return <AdminReports nav={nav} />
      case 'admin-profile': return <AdminProfile nav={nav} />
      default: return <WelcomePage nav={nav} />
    }
  }

  const sections = [
    { label: 'AUTH', items: [
      { p: 'welcome' as Page, l: 'Welcome' }, { p: 'login' as Page, l: 'Login' }, { p: 'register' as Page, l: 'Register' },
      { p: 'otp' as Page, l: 'OTP' }, { p: 'forgot' as Page, l: 'Forgot' }, { p: 'reset' as Page, l: 'Reset' }
    ]},
    { label: 'USER', items: [
      { p: 'user-home' as Page, l: 'Home' }, { p: 'user-venues' as Page, l: 'Venues' }, { p: 'user-venue-detail' as Page, l: 'Venue Detail' },
      { p: 'user-booking' as Page, l: 'Booking' }, { p: 'user-booking-success' as Page, l: 'Success' },
      { p: 'user-bookings' as Page, l: 'My Bookings' }, { p: 'user-profile' as Page, l: 'Profile' }
    ]},
    { label: 'OWNER', items: [
      { p: 'owner-dashboard' as Page, l: 'Dashboard' }, { p: 'owner-facilities' as Page, l: 'Facilities' },
      { p: 'owner-courts' as Page, l: 'Courts' }, { p: 'owner-slots' as Page, l: 'Time Slots' },
      { p: 'owner-bookings' as Page, l: 'Bookings' }, { p: 'owner-reports' as Page, l: 'Reports' }, { p: 'owner-profile' as Page, l: 'Profile' }
    ]},
    { label: 'ADMIN', items: [
      { p: 'admin-dashboard' as Page, l: 'Dashboard' }, { p: 'admin-approvals' as Page, l: 'Approvals' },
      { p: 'admin-users' as Page, l: 'Users' }, { p: 'admin-reports' as Page, l: 'Reports' }, { p: 'admin-profile' as Page, l: 'Profile' }
    ]},
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Demo navigation */}
      <div style={{ background: '#0f172a', padding: '8px 16px', display: 'flex', gap: 24, overflowX: 'auto', flexShrink: 0, alignItems: 'center' }}>
        <span style={{ color: '#f97316', fontWeight: 700, fontSize: 12, letterSpacing: 1, whiteSpace: 'nowrap', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>⚡ QUICKBOLT</span>
        {sections.map(s => (
          <div key={s.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ color: '#475569', fontSize: 10, fontWeight: 600, letterSpacing: 1, marginRight: 4 }}>{s.label}</span>
            {s.items.map(i => (
              <button key={i.p} onClick={() => nav(i.p)} style={{
                background: page === i.p ? '#2563eb' : 'transparent',
                color: page === i.p ? '#fff' : '#94a3b8',
                border: 'none', borderRadius: 5, padding: '3px 10px', fontSize: 11, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                whiteSpace: 'nowrap', fontWeight: page === i.p ? 600 : 400,
              }}>{i.l}</button>
            ))}
          </div>
        ))}
      </div>
      <div style={{ flex: 1 }}>{renderPage()}</div>
    </div>
  )
}

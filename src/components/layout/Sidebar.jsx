import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, Users, Clock, FileText, FolderOpen,
  Bell, User, Stethoscope, ListOrdered, ClipboardList, BarChart3,
  Settings, Shield, UserCog, X, Activity, LogOut
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

const roleMenus = {
  patient: [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/patient' },
    { label: 'Appointments', icon: Calendar, to: '/patient/appointments' },
    { label: 'Doctors', icon: Stethoscope, to: '/patient/doctors' },
    { label: 'Queue Status', icon: Clock, to: '/patient/queue' },
    { label: 'Medical Records', icon: FileText, to: '/patient/records' },
    { label: 'Documents', icon: FolderOpen, to: '/patient/documents' },
    { label: 'Notifications', icon: Bell, to: '/patient/notifications' },
    { label: 'Profile', icon: User, to: '/patient/profile' },
  ],
  doctor: [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/doctor' },
    { label: 'Appointments', icon: Calendar, to: '/doctor/appointments' },
    { label: 'Patient Queue', icon: ListOrdered, to: '/doctor/queue' },
    { label: 'Patient Records', icon: FileText, to: '/doctor/records' },
    { label: 'Prescriptions', icon: ClipboardList, to: '/doctor/prescriptions' },
    { label: 'Documents', icon: FolderOpen, to: '/doctor/documents' },
    { label: 'Notifications', icon: Bell, to: '/doctor/notifications' },
    { label: 'Profile', icon: User, to: '/doctor/profile' },
  ],
  staff: [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/staff' },
    { label: 'Appointments', icon: Calendar, to: '/staff/appointments' },
    { label: 'Queue Management', icon: ListOrdered, to: '/staff/queue' },
    { label: 'Patients', icon: Users, to: '/staff/patients' },
    { label: 'Documents', icon: FolderOpen, to: '/staff/documents' },
    { label: 'Notifications', icon: Bell, to: '/staff/notifications' },
  ],
  admin: [
    { label: 'Dashboard', icon: LayoutDashboard, to: '/admin' },
    { label: 'Users', icon: Users, to: '/admin/users' },
    { label: 'Doctors', icon: Stethoscope, to: '/admin/doctors' },
    { label: 'Patients', icon: UserCog, to: '/admin/patients' },
    { label: 'Staff', icon: UserCog, to: '/admin/staff' },
    { label: 'Appointments', icon: Calendar, to: '/admin/appointments' },
    { label: 'Queue', icon: ListOrdered, to: '/admin/queue' },
    { label: 'Medical Records', icon: FileText, to: '/admin/records' },
    { label: 'Analytics', icon: BarChart3, to: '/admin/analytics' },
    { label: 'Settings', icon: Settings, to: '/admin/settings' },
    { label: 'Security', icon: Shield, to: '/admin/security' },
  ],
};

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const menu = roleMenus[user?.role] || [];

  const handleLogout = () => { logout(); navigate('/login'); };

  const isActive = (to) => {
    if (to === `/${user?.role}`) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div onClick={onClose} style={{ position:'fixed', inset:0, backgroundColor:'rgba(0,0,0,0.3)', zIndex:40 }} className="lg:hidden" />}

      <aside
        className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        style={{
          position:'fixed', top:0, left:0, bottom:0, width:'240px', zIndex:50,
          backgroundColor:'white', borderRight:'1px solid #E5E7EB',
          display:'flex', flexDirection:'column',
          transition:'transform 0.2s ease',
          fontFamily:"'Inter',system-ui,sans-serif",
        }}
      >
        {/* Logo */}
        <div style={{ height:'60px', display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 16px', borderBottom:'1px solid #F3F4F6', flexShrink:0 }}>
          <NavLink to={`/${user?.role}`} style={{ display:'flex', alignItems:'center', gap:'10px', textDecoration:'none' }}>
            <div style={{ width:'32px', height:'32px', backgroundColor:'#0F2B5B', borderRadius:'8px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Activity style={{ width:'16px', height:'16px', color:'white' }} />
            </div>
            <span style={{ fontSize:'16px', fontWeight:800, color:'#0F2B5B' }}>MedFlow</span>
          </NavLink>
          <button onClick={onClose} className="lg:hidden" style={{ padding:'4px', cursor:'pointer', background:'none', border:'none', color:'#6B7280' }}>
            <X size={18} />
          </button>
        </div>

        {/* Nav items */}
        <nav style={{ flex:1, overflowY:'auto', padding:'12px 10px' }}>
          {menu.map((item) => {
            const active = isActive(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                style={{
                  display:'flex', alignItems:'center', gap:'10px',
                  padding:'9px 12px', marginBottom:'2px',
                  borderRadius:'8px', textDecoration:'none',
                  fontSize:'13px', fontWeight: active ? 700 : 500,
                  color: active ? '#0F2B5B' : '#6B7280',
                  backgroundColor: active ? '#EFF6FF' : 'transparent',
                  transition:'all 0.15s ease',
                }}
                onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = '#F9FAFB'; }}
                onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <item.icon style={{ width:'18px', height:'18px', flexShrink:0, color: active ? '#2563EB' : '#9CA3AF' }} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Sign Out */}
        <div style={{ padding:'12px 10px', borderTop:'1px solid #F3F4F6', flexShrink:0 }}>
          <button
            onClick={handleLogout}
            style={{
              display:'flex', alignItems:'center', gap:'10px', width:'100%',
              padding:'9px 12px', borderRadius:'8px', border:'none', backgroundColor:'transparent',
              fontSize:'13px', fontWeight:500, color:'#EF4444', cursor:'pointer',
              transition:'background 0.15s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FEF2F2'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <LogOut style={{ width:'18px', height:'18px' }} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

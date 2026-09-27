import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Search, Menu, ChevronDown, ArrowLeft, User, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useNotificationStore } from '../../stores/notificationStore';

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const fn = (e) => { if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false); };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, []);

  const handleLogout = () => { logout(); navigate('/login'); };

  const roleLabels = { patient:'Patient', doctor:'Doctor', staff:'Staff', admin:'Administrator' };
  const roleColors = { 
    patient:{ bg:'#EFF6FF', color:'#2563EB' }, 
    doctor:{ bg:'#F0FDFA', color:'#0D9488' }, 
    staff:{ bg:'#FFFBEB', color:'#D97706' }, 
    admin:{ bg:'#F5F3FF', color:'#7C3AED' } 
  };
  const rc = roleColors[user?.role] || roleColors.patient;

  const basePath = `/${user?.role}`;
  const isNotBase = location.pathname !== basePath;

  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <header style={{
      height:'64px', backgroundColor:'white', borderBottom:'1px solid #E5E7EB',
      padding:'0 24px', display:'flex', alignItems:'center', justifyContent:'space-between',
      position:'sticky', top:0, zIndex:30,
      fontFamily:"'Inter',system-ui,sans-serif",
      boxShadow:'0 1px 2px 0 rgba(0, 0, 0, 0.03)'
    }}>
      {/* Left */}
      <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
        <button onClick={onMenuClick} className="lg:hidden" style={{ padding:'8px', cursor:'pointer', background:'none', border:'none', color:'#4B5563', borderRadius:'8px' }}>
          <Menu size={22} />
        </button>

        {/* Back Button */}
        {isNotBase && (
          <button
            onClick={() => navigate(-1)}
            style={{
              display:'flex', alignItems:'center', gap:'6px',
              padding:'7px 14px', borderRadius:'10px', border:'1px solid #D1D5DB',
              backgroundColor:'#F9FAFB', cursor:'pointer', fontSize:'13px', fontWeight:600,
              color:'#1F2937', transition:'all 0.15s ease',
              boxShadow:'0 1px 2px rgba(0,0,0,0.05)'
            }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor='#EFF6FF';e.currentTarget.style.borderColor='#93C5FD';e.currentTarget.style.color='#1D4ED8';}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='#F9FAFB';e.currentTarget.style.borderColor='#D1D5DB';e.currentTarget.style.color='#1F2937';}}
            title="Go back to previous page"
          >
            <ArrowLeft size={16} />
            <span>Go Back</span>
          </button>
        )}

        {/* Search */}
        <div className="hidden md:block" style={{ position:'relative' }}>
          <Search style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', width:'16px', height:'16px', color:'#9CA3AF' }} />
          <input
            type="text" placeholder="Search patients, doctors, records..."
            style={{
              width:'240px', padding:'8px 14px 8px 36px', fontSize:'13px',
              backgroundColor:'#F9FAFB', border:'1px solid #E5E7EB', borderRadius:'10px',
              outline:'none', transition:'all 0.2s', color:'#111827',
            }}
            onFocus={e=>{e.target.style.borderColor='#3B82F6';e.target.style.width='300px';e.target.style.backgroundColor='white';}}
            onBlur={e=>{e.target.style.borderColor='#E5E7EB';e.target.style.width='240px';e.target.style.backgroundColor='#F9FAFB';}}
          />
        </div>
      </div>

      {/* Right */}
      <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
        {/* Notifications */}
        <button 
          onClick={() => navigate(`/${user?.role}/notifications`)} 
          style={{
            position:'relative', padding:'8px', borderRadius:'10px', border:'1px solid #E5E7EB',
            backgroundColor:'white', cursor:'pointer', transition:'all 0.15s',
            display:'flex', alignItems:'center', justifyContent:'center'
          }}
          onMouseEnter={e=>e.currentTarget.style.backgroundColor='#F3F4F6'}
          onMouseLeave={e=>e.currentTarget.style.backgroundColor='white'}
          title="Notifications"
        >
          <Bell style={{ width:'18px', height:'18px', color:'#4B5563' }} />
          {unreadCount > 0 && (
            <span style={{
              position:'absolute', top:'-4px', right:'-4px',
              minWidth:'18px', height:'18px', borderRadius:'50%',
              backgroundColor:'#EF4444', color:'white', fontSize:'10px', fontWeight:700,
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 0 0 2px white',
            }}>{unreadCount}</span>
          )}
        </button>

        {/* Profile Dropdown */}
        <div ref={profileRef} style={{ position:'relative' }}>
          <button onClick={() => setProfileOpen(!profileOpen)} style={{
            display:'flex', alignItems:'center', gap:'10px', padding:'4px 10px 4px 4px',
            borderRadius:'12px', border:'1px solid #E5E7EB', backgroundColor:'white', cursor:'pointer',
            transition:'all 0.15s',
          }}
            onMouseEnter={e=>e.currentTarget.style.borderColor='#CBD5E1'}
            onMouseLeave={e=>e.currentTarget.style.borderColor='#E5E7EB'}
          >
            <div style={{
              width:'36px', height:'36px', borderRadius:'10px',
              background:'linear-gradient(135deg,#0F2B5B,#1E40AF)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'13px', fontWeight:700, color:'white',
              boxShadow:'0 2px 4px rgba(15,43,91,0.2)'
            }}>{initials}</div>
            <div className="hidden sm:block" style={{ textAlign:'left' }}>
              <p style={{ fontSize:'13px', fontWeight:700, color:'#111827', margin:0, lineHeight:1.2 }}>{user?.name}</p>
              <p style={{ fontSize:'10px', fontWeight:700, color:rc.color, textTransform:'uppercase', letterSpacing:'0.05em', margin:'2px 0 0' }}>{roleLabels[user?.role] || user?.role}</p>
            </div>
            <ChevronDown style={{ width:'14px', height:'14px', color:'#6B7280', transition:'transform 0.2s', transform: profileOpen ? 'rotate(180deg)' : 'none' }} />
          </button>

          {profileOpen && (
            <div style={{
              position:'absolute', right:0, top:'calc(100% + 8px)', width:'230px',
              backgroundColor:'white', borderRadius:'14px', border:'1px solid #E5E7EB',
              boxShadow:'0 10px 25px -5px rgba(0,0,0,0.1)', padding:'6px', zIndex:50,
            }}>
              <div style={{ padding:'10px 12px', borderBottom:'1px solid #F3F4F6', marginBottom:'4px' }}>
                <p style={{ fontSize:'13px', fontWeight:700, color:'#111827', margin:0 }}>{user?.name}</p>
                <p style={{ fontSize:'11px', color:'#6B7280', margin:'2px 0 0' }}>{user?.email}</p>
                <span style={{ display:'inline-block', marginTop:'6px', padding:'2px 8px', borderRadius:'6px', fontSize:'10px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.04em', backgroundColor:rc.bg, color:rc.color }}>{roleLabels[user?.role] || user?.role}</span>
              </div>
              {[
                { icon:User, label:'My Profile', action:()=>{navigate(`/${user?.role}/profile`);setProfileOpen(false);} },
                ...(user?.role === 'admin' ? [{ icon:Settings, label:'System Settings', action:()=>{navigate('/admin/settings');setProfileOpen(false);} }] : []),
              ].map((item,i) => (
                <button key={i} onClick={item.action} style={{
                  display:'flex', alignItems:'center', gap:'10px', width:'100%', padding:'9px 12px',
                  borderRadius:'8px', border:'none', backgroundColor:'transparent', cursor:'pointer',
                  fontSize:'13px', fontWeight:500, color:'#374151', transition:'background 0.15s', textAlign:'left',
                }}
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor='#F3F4F6'}
                  onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
                >
                  <item.icon style={{ width:'16px', height:'16px', color:'#6B7280' }} />{item.label}
                </button>
              ))}
              <div style={{ borderTop:'1px solid #F3F4F6', marginTop:'4px', paddingTop:'4px' }}>
                <button onClick={handleLogout} style={{
                  display:'flex', alignItems:'center', gap:'10px', width:'100%', padding:'9px 12px',
                  borderRadius:'8px', border:'none', backgroundColor:'transparent', cursor:'pointer',
                  fontSize:'13px', fontWeight:600, color:'#DC2626', transition:'background 0.15s',
                }}
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor='#FEF2F2'}
                  onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
                >
                  <LogOut style={{ width:'16px', height:'16px' }} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

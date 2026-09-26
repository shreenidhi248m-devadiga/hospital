import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Search, Menu, ChevronDown, ChevronLeft, User, Settings, LogOut } from 'lucide-react';
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
  const roleColors = { patient:{ bg:'#EFF6FF', color:'#2563EB' }, doctor:{ bg:'#F0FDFA', color:'#0D9488' }, staff:{ bg:'#FFFBEB', color:'#D97706' }, admin:{ bg:'#F5F3FF', color:'#7C3AED' } };
  const rc = roleColors[user?.role] || roleColors.patient;

  // Show back button if not on the main dashboard
  const basePath = `/${user?.role}`;
  const showBack = location.pathname !== basePath;

  // Get initials
  const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <header style={{
      height:'60px', backgroundColor:'white', borderBottom:'1px solid #E5E7EB',
      padding:'0 20px', display:'flex', alignItems:'center', justifyContent:'space-between',
      position:'sticky', top:0, zIndex:30,
      fontFamily:"'Inter',system-ui,sans-serif",
    }}>
      {/* Left */}
      <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
        <button onClick={onMenuClick} className="lg:hidden" style={{ padding:'6px', cursor:'pointer', background:'none', border:'none', color:'#6B7280' }}>
          <Menu size={20} />
        </button>

        {/* Back button */}
        {showBack && (
          <button
            onClick={() => navigate(-1)}
            style={{
              display:'flex', alignItems:'center', gap:'4px',
              padding:'6px 12px', borderRadius:'8px', border:'1px solid #E5E7EB',
              backgroundColor:'white', cursor:'pointer', fontSize:'13px', fontWeight:600,
              color:'#374151', transition:'all 0.15s',
            }}
            onMouseEnter={e=>{e.currentTarget.style.backgroundColor='#F9FAFB';e.currentTarget.style.borderColor='#D1D5DB';}}
            onMouseLeave={e=>{e.currentTarget.style.backgroundColor='white';e.currentTarget.style.borderColor='#E5E7EB';}}
          >
            <ChevronLeft size={16} /> Back
          </button>
        )}

        {/* Search */}
        <div className="hidden md:block" style={{ position:'relative' }}>
          <Search style={{ position:'absolute', left:'10px', top:'50%', transform:'translateY(-50%)', width:'15px', height:'15px', color:'#9CA3AF' }} />
          <input
            type="text" placeholder="Search anything..."
            style={{
              width:'220px', padding:'8px 14px 8px 34px', fontSize:'13px',
              backgroundColor:'#F9FAFB', border:'1px solid #E5E7EB', borderRadius:'8px',
              outline:'none', transition:'all 0.2s', color:'#111827',
            }}
            onFocus={e=>{e.target.style.borderColor='#3B82F6';e.target.style.width='280px';}}
            onBlur={e=>{e.target.style.borderColor='#E5E7EB';e.target.style.width='220px';}}
          />
        </div>
      </div>

      {/* Right */}
      <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
        {/* Notifications */}
        <button onClick={() => navigate(`/${user?.role}/notifications`)} style={{
          position:'relative', padding:'8px', borderRadius:'8px', border:'none',
          backgroundColor:'transparent', cursor:'pointer', transition:'background 0.15s',
        }}
          onMouseEnter={e=>e.currentTarget.style.backgroundColor='#F3F4F6'}
          onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
        >
          <Bell style={{ width:'18px', height:'18px', color:'#6B7280' }} />
          {unreadCount > 0 && (
            <span style={{
              position:'absolute', top:'4px', right:'4px',
              minWidth:'16px', height:'16px', borderRadius:'50%',
              backgroundColor:'#EF4444', color:'white', fontSize:'9px', fontWeight:700,
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:'0 0 0 2px white',
            }}>{unreadCount}</span>
          )}
        </button>

        {/* Divider */}
        <div style={{ width:'1px', height:'28px', backgroundColor:'#E5E7EB', margin:'0 4px' }} />

        {/* Profile */}
        <div ref={profileRef} style={{ position:'relative' }}>
          <button onClick={() => setProfileOpen(!profileOpen)} style={{
            display:'flex', alignItems:'center', gap:'10px', padding:'4px 8px 4px 4px',
            borderRadius:'10px', border:'none', backgroundColor:'transparent', cursor:'pointer',
            transition:'background 0.15s',
          }}
            onMouseEnter={e=>e.currentTarget.style.backgroundColor='#F9FAFB'}
            onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
          >
            <div style={{
              width:'34px', height:'34px', borderRadius:'10px',
              background:'linear-gradient(135deg,#0F2B5B,#1E40AF)',
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'12px', fontWeight:700, color:'white',
            }}>{initials}</div>
            <div className="hidden sm:block" style={{ textAlign:'left' }}>
              <p style={{ fontSize:'13px', fontWeight:600, color:'#111827', margin:0, lineHeight:1.2 }}>{user?.name}</p>
              <p style={{ fontSize:'10px', fontWeight:700, color:rc.color, textTransform:'uppercase', letterSpacing:'0.05em', margin:'1px 0 0' }}>{roleLabels[user?.role]}</p>
            </div>
            <ChevronDown style={{ width:'14px', height:'14px', color:'#9CA3AF', transition:'transform 0.2s', transform: profileOpen ? 'rotate(180deg)' : 'none' }} />
          </button>

          {profileOpen && (
            <div style={{
              position:'absolute', right:0, top:'calc(100% + 6px)', width:'220px',
              backgroundColor:'white', borderRadius:'12px', border:'1px solid #E5E7EB',
              boxShadow:'0 8px 24px rgba(0,0,0,0.08)', padding:'6px', zIndex:50,
            }}>
              <div style={{ padding:'10px 12px', borderBottom:'1px solid #F3F4F6', marginBottom:'4px' }}>
                <p style={{ fontSize:'13px', fontWeight:700, color:'#111827', margin:0 }}>{user?.name}</p>
                <p style={{ fontSize:'11px', color:'#9CA3AF', margin:'2px 0 0' }}>{user?.email}</p>
                <span style={{ display:'inline-block', marginTop:'6px', padding:'2px 8px', borderRadius:'6px', fontSize:'10px', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.04em', backgroundColor:rc.bg, color:rc.color }}>{roleLabels[user?.role]}</span>
              </div>
              {[
                { icon:User, label:'Profile', action:()=>{navigate(`/${user?.role}/profile`);setProfileOpen(false);} },
                ...(user?.role === 'admin' ? [{ icon:Settings, label:'Settings', action:()=>{navigate('/admin/settings');setProfileOpen(false);} }] : []),
              ].map((item,i) => (
                <button key={i} onClick={item.action} style={{
                  display:'flex', alignItems:'center', gap:'10px', width:'100%', padding:'8px 12px',
                  borderRadius:'8px', border:'none', backgroundColor:'transparent', cursor:'pointer',
                  fontSize:'13px', color:'#4B5563', transition:'background 0.15s', textAlign:'left',
                }}
                  onMouseEnter={e=>e.currentTarget.style.backgroundColor='#F9FAFB'}
                  onMouseLeave={e=>e.currentTarget.style.backgroundColor='transparent'}
                >
                  <item.icon style={{ width:'16px', height:'16px', color:'#9CA3AF' }} />{item.label}
                </button>
              ))}
              <div style={{ borderTop:'1px solid #F3F4F6', marginTop:'4px', paddingTop:'4px' }}>
                <button onClick={handleLogout} style={{
                  display:'flex', alignItems:'center', gap:'10px', width:'100%', padding:'8px 12px',
                  borderRadius:'8px', border:'none', backgroundColor:'transparent', cursor:'pointer',
                  fontSize:'13px', fontWeight:600, color:'#EF4444', transition:'background 0.15s',
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

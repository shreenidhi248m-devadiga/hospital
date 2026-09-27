import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNotificationStore } from '../../stores/notificationStore';
import { useAuthStore } from '../../stores/authStore';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' ? window.innerWidth >= 1024 : true);
  const { user } = useAuthStore();
  const { loadNotifications } = useNotificationStore();

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setSidebarOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user?.role) loadNotifications(user.role);
  }, [user?.role, loadNotifications]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F9FAFB', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content Area - Always offset by 240px on desktop */}
      <div
        className="main-content-layout"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: '100vh',
          marginLeft: isDesktop ? '240px' : '0px',
          transition: 'margin-left 0.2s ease',
          width: isDesktop ? 'calc(100% - 240px)' : '100%'
        }}
      >
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main style={{ flex: 1, padding: '24px', overflowX: 'hidden', width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

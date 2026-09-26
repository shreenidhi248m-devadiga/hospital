import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useNotificationStore } from '../../stores/notificationStore';
import { useAuthStore } from '../../stores/authStore';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuthStore();
  const { loadNotifications } = useNotificationStore();

  useEffect(() => {
    if (user?.role) loadNotifications(user.role);
  }, [user?.role, loadNotifications]);

  return (
    <div style={{ display:'flex', minHeight:'100vh', backgroundColor:'#F9FAFB', fontFamily:"'Inter',system-ui,sans-serif" }}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:ml-[240px]" style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0 }}>
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main style={{ flex:1, padding:'20px', overflowX:'hidden' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

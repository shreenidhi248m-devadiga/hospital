import { useState } from 'react';
import { Bell, CheckCheck, Trash2, Info, AlertTriangle, CheckCircle2, AlertOctagon, Filter, Check } from 'lucide-react';
import { useNotificationStore } from '../../stores/notificationStore';

const typeIcons = {
  info: { 
    icon: Info, 
    bgColor: '#EFF6FF', 
    borderColor: '#BFDBFE', 
    iconColor: '#2563EB' 
  },
  success: { 
    icon: CheckCircle2, 
    bgColor: '#ECFDF5', 
    borderColor: '#A7F3D0', 
    iconColor: '#059669' 
  },
  warning: { 
    icon: AlertTriangle, 
    bgColor: '#FFFBEB', 
    borderColor: '#FDE68A', 
    iconColor: '#D97706' 
  },
  danger: { 
    icon: AlertOctagon, 
    bgColor: '#FEF2F2', 
    borderColor: '#FECACA', 
    iconColor: '#DC2626' 
  },
};

const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead, removeNotification, unreadCount } = useNotificationStore();
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'read'

  const timeAgo = (dateStr) => {
    if (!dateStr) return 'Just now';
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === 'unread') return !n.read;
    if (filter === 'read') return n.read;
    return true;
  });

  const filterTabs = [
    { id: 'all', label: 'All Notifications', count: notifications.length },
    { id: 'unread', label: 'Unread', count: unreadCount },
    { id: 'read', label: 'Read', count: notifications.length - unreadCount },
  ];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }} className="space-y-6">
      
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '8px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
            Notifications Center
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0', fontWeight: 500 }}>
            {unreadCount > 0 ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All notifications are caught up'}
          </p>
        </div>

        {/* Global Actions */}
        {notifications.length > 0 && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '9px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 700,
                  backgroundColor: '#2563EB', color: 'white', border: 'none',
                  cursor: 'pointer', boxShadow: '0 2px 6px rgba(37,99,235,0.25)',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
              >
                <CheckCheck size={16} />
                Mark All as Read
              </button>
            )}
          </div>
        )}
      </div>

      {/* FILTER TOOLBAR CARD */}
      <div style={{
        backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0',
        padding: '14px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {filterTabs.map((tab) => {
            const active = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                  border: active ? '1px solid #2563EB' : '1px solid #E2E8F0',
                  backgroundColor: active ? '#2563EB' : '#F8FAFC',
                  color: active ? 'white' : '#475569',
                  cursor: 'pointer', transition: 'all 0.15s ease'
                }}
              >
                <span>{tab.label}</span>
                <span style={{
                  padding: '2px 7px', borderRadius: '12px', fontSize: '11px', fontWeight: 700,
                  backgroundColor: active ? 'rgba(255,255,255,0.25)' : '#E2E8F0',
                  color: active ? 'white' : '#475569'
                }}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* NOTIFICATIONS LIST CONTAINER */}
      <div style={{
        backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0',
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden'
      }}>
        {filteredNotifications.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '20px', backgroundColor: '#F1F5F9',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
            }}>
              <Bell style={{ width: '28px', height: '28px', color: '#94A3B8' }} />
            </div>
            <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0F172A', margin: 0 }}>
              No Notifications Found
            </h3>
            <p style={{ fontSize: '13px', color: '#64748B', marginTop: '6px' }}>
              {filter === 'unread' ? 'You have no unread notifications.' : 'Your notification list is empty.'}
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {filteredNotifications.map((n, index) => {
              const typeConfig = typeIcons[n.type] || typeIcons.info;
              const IconComp = typeConfig.icon;
              const isUnread = !n.read;

              return (
                <div
                  key={n.id}
                  style={{
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px',
                    backgroundColor: isUnread ? '#F0F9FF' : 'white',
                    borderBottom: index < filteredNotifications.length - 1 ? '1px solid #F1F5F9' : 'none',
                    borderLeft: isUnread ? '4px solid #2563EB' : '4px solid transparent',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!isUnread) e.currentTarget.style.backgroundColor = '#F8FAFC';
                  }}
                  onMouseLeave={(e) => {
                    if (!isUnread) e.currentTarget.style.backgroundColor = 'white';
                  }}
                >
                  {/* Category Icon Badge */}
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    backgroundColor: typeConfig.bgColor, border: `1px solid ${typeConfig.borderColor}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <IconComp style={{ width: '20px', height: '20px', color: typeConfig.iconColor }} />
                  </div>

                  {/* Main Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '15px', fontWeight: isUnread ? 800 : 700, color: '#0F172A', lineHeight: 1.3 }}>
                          {n.title}
                        </span>
                        {isUnread && (
                          <span style={{
                            padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800,
                            backgroundColor: '#2563EB', color: 'white', letterSpacing: '0.04em'
                          }}>
                            NEW
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
                        {timeAgo(n.createdAt)}
                      </span>
                    </div>

                    <p style={{ fontSize: '13.5px', color: '#334155', margin: '4px 0 0', lineHeight: 1.5, fontWeight: 400 }}>
                      {n.message}
                    </p>
                  </div>

                  {/* Right Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0, marginLeft: '8px', paddingTop: '2px' }}>
                    {isUnread && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        title="Mark as read"
                        style={{
                          width: '34px', height: '34px', borderRadius: '9px', border: '1px solid #CBD5E1',
                          backgroundColor: 'white', color: '#2563EB', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#EFF6FF'; e.currentTarget.style.borderColor = '#93C5FD'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#CBD5E1'; }}
                      >
                        <Check style={{ width: '16px', height: '16px' }} />
                      </button>
                    )}
                    <button
                      onClick={() => removeNotification(n.id)}
                      title="Delete notification"
                      style={{
                        width: '34px', height: '34px', borderRadius: '9px', border: '1px solid #CBD5E1',
                        backgroundColor: 'white', color: '#64748B', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FEF2F2'; e.currentTarget.style.borderColor = '#FCA5A5'; e.currentTarget.style.color = '#DC2626'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.color = '#64748B'; }}
                    >
                      <Trash2 style={{ width: '16px', height: '16px' }} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default NotificationsPage;

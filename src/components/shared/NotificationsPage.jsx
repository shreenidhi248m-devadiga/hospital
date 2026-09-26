import { Bell, CheckCheck, Trash2, Info, AlertTriangle, CheckCircle2, AlertOctagon } from 'lucide-react';
import { useNotificationStore } from '../../stores/notificationStore';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

const typeIcons = {
  info: { icon: Info, color: 'text-blue-600 bg-blue-50' },
  success: { icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50' },
  warning: { icon: AlertTriangle, color: 'text-amber-600 bg-amber-50' },
  danger: { icon: AlertOctagon, color: 'text-red-600 bg-red-50' },
};

const NotificationsPage = () => {
  const { notifications, markAsRead, markAllAsRead, removeNotification, unreadCount } = useNotificationStore();

  const timeAgo = (dateStr) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Notifications</h1>
          <p className="text-sm text-surface-500 mt-1">{unreadCount} unread notifications</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" icon={CheckCheck} onClick={markAllAsRead} size="sm">
            Mark all as read
          </Button>
        )}
      </div>

      <Card padding="p-0">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Bell className="w-10 h-10 text-surface-300 mb-3" />
            <p className="text-sm text-surface-500">No notifications yet</p>
          </div>
        ) : (
          <div className="divide-y divide-surface-100">
            {notifications.map((notification) => {
              const typeConfig = typeIcons[notification.type] || typeIcons.info;
              const IconComp = typeConfig.icon;
              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 px-5 py-4 transition-colors ${
                    !notification.read ? 'bg-primary-50/30' : 'hover:bg-surface-50'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${typeConfig.color}`}>
                    <IconComp className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`text-sm ${!notification.read ? 'font-semibold' : 'font-medium'} text-surface-900`}>
                        {notification.title}
                      </p>
                      {!notification.read && <span className="w-2 h-2 rounded-full bg-primary-500" />}
                    </div>
                    <p className="text-sm text-surface-500 mt-0.5">{notification.message}</p>
                    <p className="text-xs text-surface-400 mt-1">{timeAgo(notification.createdAt)}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-primary-600 cursor-pointer"
                        title="Mark as read"
                      >
                        <CheckCheck className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => removeNotification(notification.id)}
                      className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-red-600 cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default NotificationsPage;

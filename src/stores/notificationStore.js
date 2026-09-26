import { create } from 'zustand';

const generateNotifications = (role) => {
  const base = [
    { id: '1', title: 'System Update', message: 'MedFlow v2.1 is now available with improved performance.', type: 'info', read: false, createdAt: new Date(Date.now() - 3600000).toISOString() },
    { id: '2', title: 'Security Alert', message: 'A new device was used to sign in to your account.', type: 'warning', read: false, createdAt: new Date(Date.now() - 7200000).toISOString() },
  ];

  if (role === 'patient') {
    return [
      { id: '3', title: 'Appointment Confirmed', message: 'Your appointment with Dr. Chen on Oct 15 at 10:00 AM has been confirmed.', type: 'success', read: false, createdAt: new Date(Date.now() - 1800000).toISOString() },
      { id: '4', title: 'Lab Results Ready', message: 'Your blood work results are now available in Medical Records.', type: 'info', read: true, createdAt: new Date(Date.now() - 86400000).toISOString() },
      ...base,
    ];
  }
  if (role === 'doctor') {
    return [
      { id: '3', title: 'New Patient Assigned', message: 'Sarah Johnson has been added to your patient queue.', type: 'info', read: false, createdAt: new Date(Date.now() - 1800000).toISOString() },
      { id: '4', title: 'Emergency Alert', message: 'Code Blue - Room 412. Immediate response required.', type: 'danger', read: false, createdAt: new Date(Date.now() - 600000).toISOString() },
      ...base,
    ];
  }
  return base;
};

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,

  loadNotifications: (role) => {
    const notifications = generateNotifications(role);
    set({
      notifications,
      unreadCount: notifications.filter((n) => !n.read).length,
    });
  },

  markAsRead: (id) => {
    set((state) => {
      const notifications = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      };
    });
  },

  markAllAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },

  removeNotification: (id) => {
    set((state) => {
      const notifications = state.notifications.filter((n) => n.id !== id);
      return {
        notifications,
        unreadCount: notifications.filter((n) => !n.read).length,
      };
    });
  },
}));

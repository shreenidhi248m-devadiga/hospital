import { create } from 'zustand';

const mockUsers = {
  'patient@medflow.com': { id: '1', name: 'Sarah Johnson', email: 'patient@medflow.com', role: 'patient', avatar: null, phone: '+1 (555) 123-4567' },
  'doctor@medflow.com': { id: '2', name: 'Dr. Michael Chen', email: 'doctor@medflow.com', role: 'doctor', avatar: null, phone: '+1 (555) 234-5678', specialty: 'Cardiology', department: 'Cardiology' },
  'staff@medflow.com': { id: '3', name: 'Emily Rodriguez', email: 'staff@medflow.com', role: 'staff', avatar: null, phone: '+1 (555) 345-6789', department: 'Front Desk' },
  'admin@medflow.com': { id: '4', name: 'James Wilson', email: 'admin@medflow.com', role: 'admin', avatar: null, phone: '+1 (555) 456-7890' },
};

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('medflow_user') || 'null'),
  isAuthenticated: !!localStorage.getItem('medflow_user'),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const user = mockUsers[email];
    if (user && password === 'password123') {
      localStorage.setItem('medflow_user', JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
      return user;
    } else {
      set({ error: 'Invalid email or password', isLoading: false });
      throw new Error('Invalid email or password');
    }
  },

  register: async (data) => {
    set({ isLoading: true, error: null });
    await new Promise((resolve) => setTimeout(resolve, 800));
    const user = {
      id: Date.now().toString(),
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      role: 'patient',
      avatar: null,
      phone: data.phone || '',
    };
    localStorage.setItem('medflow_user', JSON.stringify(user));
    set({ user, isAuthenticated: true, isLoading: false });
    return user;
  },

  logout: () => {
    localStorage.removeItem('medflow_user');
    set({ user: null, isAuthenticated: false, error: null });
  },

  clearError: () => set({ error: null }),
}));

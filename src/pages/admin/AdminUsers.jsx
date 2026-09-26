import { Plus, Edit, Trash2, Shield } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';

const users = [
  { id: '1', name: 'Sarah Johnson', email: 'patient@medflow.com', role: 'patient', status: 'Active', lastLogin: '2026-09-26' },
  { id: '2', name: 'Dr. Michael Chen', email: 'doctor@medflow.com', role: 'doctor', status: 'Active', lastLogin: '2026-09-26' },
  { id: '3', name: 'Emily Rodriguez', email: 'staff@medflow.com', role: 'staff', status: 'Active', lastLogin: '2026-09-25' },
  { id: '4', name: 'James Wilson', email: 'admin@medflow.com', role: 'admin', status: 'Active', lastLogin: '2026-09-26' },
  { id: '5', name: 'Dr. Emily Watson', email: 'dr.watson@medflow.com', role: 'doctor', status: 'Active', lastLogin: '2026-09-24' },
  { id: '6', name: 'John Davis', email: 'john.d@email.com', role: 'patient', status: 'Inactive', lastLogin: '2026-09-10' },
];

const roleColors = { patient: 'primary', doctor: 'secondary', staff: 'warning', admin: 'danger' };

const AdminUsers = () => {
  const columns = [
    { key: 'name', label: 'User', render: (val, row) => (
      <div className="flex items-center gap-2.5">
        <Avatar name={val} size="sm" />
        <div><p className="font-medium text-surface-900">{val}</p><p className="text-xs text-surface-500">{row.email}</p></div>
      </div>
    )},
    { key: 'role', label: 'Role', render: (val) => <Badge variant={roleColors[val]}>{val}</Badge> },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={val === 'Active' ? 'success' : 'default'} dot>{val}</Badge> },
    { key: 'lastLogin', label: 'Last Login' },
    { key: 'actions', label: '', sortable: false, render: () => (
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-primary-600 cursor-pointer"><Edit className="w-4 h-4" /></button>
        <button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-red-600 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-surface-900">User Management</h1><p className="text-sm text-surface-500 mt-1">Manage all system users</p></div>
        <Button icon={Plus}>Add User</Button>
      </div>
      <Card><DataTable columns={columns} data={users} searchPlaceholder="Search users..." /></Card>
    </div>
  );
};

export default AdminUsers;

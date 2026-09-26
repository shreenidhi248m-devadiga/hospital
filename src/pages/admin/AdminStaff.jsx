import { Plus, Edit } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';
import { mockStaff } from '../../data/mockData';

const AdminStaff = () => {
  const columns = [
    { key: 'name', label: 'Staff', render: (val, row) => (
      <div className="flex items-center gap-2.5"><Avatar name={val} size="sm" /><div><p className="font-medium text-surface-900">{val}</p><p className="text-xs text-surface-500">{row.email}</p></div></div>
    )},
    { key: 'role', label: 'Role', render: (val) => <Badge variant="primary">{val}</Badge> },
    { key: 'department', label: 'Department' },
    { key: 'shift', label: 'Shift' },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={val === 'Active' ? 'success' : 'warning'} dot>{val}</Badge> },
    { key: 'joinDate', label: 'Joined' },
    { key: 'actions', label: '', sortable: false, render: () => (
      <button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-primary-600 cursor-pointer"><Edit className="w-4 h-4" /></button>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-surface-900">Staff Management</h1><p className="text-sm text-surface-500 mt-1">Manage hospital staff members</p></div>
        <Button icon={Plus}>Add Staff</Button>
      </div>
      <Card><DataTable columns={columns} data={mockStaff} searchPlaceholder="Search staff..." /></Card>
    </div>
  );
};

export default AdminStaff;

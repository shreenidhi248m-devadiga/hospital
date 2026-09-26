import { Plus, Edit, Star } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';
import { mockDoctors } from '../../data/mockData';

const AdminDoctors = () => {
  const columns = [
    { key: 'name', label: 'Doctor', render: (val, row) => (
      <div className="flex items-center gap-2.5">
        <Avatar name={val} size="sm" />
        <div><p className="font-medium text-surface-900">{val}</p><p className="text-xs text-surface-500">{row.email}</p></div>
      </div>
    )},
    { key: 'specialty', label: 'Specialty', render: (val) => <Badge variant="secondary">{val}</Badge> },
    { key: 'department', label: 'Department' },
    { key: 'experience', label: 'Experience' },
    { key: 'rating', label: 'Rating', render: (val) => (
      <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /><span className="font-medium">{val}</span></div>
    )},
    { key: 'patients', label: 'Patients', render: (val) => val.toLocaleString() },
    { key: 'available', label: 'Status', render: (val) => <Badge variant={val ? 'success' : 'danger'} dot>{val ? 'Available' : 'Busy'}</Badge> },
    { key: 'actions', label: '', sortable: false, render: () => (
      <button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-primary-600 cursor-pointer"><Edit className="w-4 h-4" /></button>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-surface-900">Doctor Management</h1><p className="text-sm text-surface-500 mt-1">Manage hospital doctors</p></div>
        <Button icon={Plus}>Add Doctor</Button>
      </div>
      <Card><DataTable columns={columns} data={mockDoctors} searchPlaceholder="Search doctors..." /></Card>
    </div>
  );
};

export default AdminDoctors;

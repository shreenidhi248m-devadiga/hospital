import { Plus, Eye, Edit } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';
import { mockPatients } from '../../data/mockData';

const StaffPatients = () => {
  const columns = [
    { key: 'name', label: 'Patient', render: (val, row) => (
      <div className="flex items-center gap-2.5">
        <Avatar name={val} size="sm" />
        <div>
          <p className="font-medium text-surface-900">{val}</p>
          <p className="text-xs text-surface-500">{row.id}</p>
        </div>
      </div>
    )},
    { key: 'age', label: 'Age/Gender', render: (val, row) => `${val} / ${row.gender}` },
    { key: 'blood', label: 'Blood Type' },
    { key: 'phone', label: 'Phone' },
    { key: 'insurance', label: 'Insurance' },
    { key: 'lastVisit', label: 'Last Visit' },
    { key: 'actions', label: '', sortable: false, render: () => (
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-primary-600 cursor-pointer"><Eye className="w-4 h-4" /></button>
        <button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-primary-600 cursor-pointer"><Edit className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Patient Management</h1>
          <p className="text-sm text-surface-500 mt-1">Register and manage patient information</p>
        </div>
        <Button icon={Plus}>Register Patient</Button>
      </div>
      <Card>
        <DataTable columns={columns} data={mockPatients} searchPlaceholder="Search patients..." />
      </Card>
    </div>
  );
};

export default StaffPatients;

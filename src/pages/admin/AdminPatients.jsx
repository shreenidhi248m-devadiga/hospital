import { Plus, Eye, Edit } from 'lucide-react';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';
import { mockPatients } from '../../data/mockData';

const AdminPatients = () => {
  const columns = [
    { key: 'name', label: 'Patient', render: (val, row) => (
      <div className="flex items-center gap-2.5"><Avatar name={val} size="sm" /><div><p className="font-medium text-surface-900">{val}</p><p className="text-xs text-surface-500">{row.email}</p></div></div>
    )},
    { key: 'age', label: 'Age/Gender', render: (val, row) => `${val} / ${row.gender}` },
    { key: 'blood', label: 'Blood' },
    { key: 'insurance', label: 'Insurance' },
    { key: 'conditions', label: 'Conditions', render: (val) => val.length > 0 ? val.map((c, i) => <Badge key={i} variant="warning" className="mr-1">{c}</Badge>) : <span className="text-surface-400">None</span> },
    { key: 'registeredDate', label: 'Registered' },
    { key: 'actions', label: '', sortable: false, render: () => (
      <div className="flex gap-1"><button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-primary-600 cursor-pointer"><Eye className="w-4 h-4" /></button><button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-primary-600 cursor-pointer"><Edit className="w-4 h-4" /></button></div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div><h1 className="text-2xl font-bold text-surface-900">Patient Management</h1><p className="text-sm text-surface-500 mt-1">View all registered patients</p></div>
        <Button icon={Plus}>Add Patient</Button>
      </div>
      <Card><DataTable columns={columns} data={mockPatients} searchPlaceholder="Search patients..." /></Card>
    </div>
  );
};

export default AdminPatients;

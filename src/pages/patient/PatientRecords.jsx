import { FileText, Download, Eye } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import { mockMedicalRecords } from '../../data/mockData';

const PatientRecords = () => {
  const records = mockMedicalRecords.filter((r) => r.patientId === 'P001');

  const typeColors = { 'Lab Results': 'primary', Prescription: 'success', Imaging: 'purple', Procedure: 'warning' };

  const columns = [
    { key: 'title', label: 'Title', render: (val, row) => (
      <div>
        <p className="font-medium text-surface-900">{val}</p>
        <p className="text-xs text-surface-500">{row.doctor}</p>
      </div>
    )},
    { key: 'type', label: 'Type', render: (val) => <Badge variant={typeColors[val] || 'default'}>{val}</Badge> },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={val === 'Active' ? 'success' : 'info'} dot>{val}</Badge> },
    { key: 'attachments', label: 'Files', render: (val) => val > 0 ? <span className="text-sm text-primary-600">{val} file(s)</span> : <span className="text-sm text-surface-400">—</span> },
    { key: 'actions', label: '', sortable: false, render: (_, row) => (
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-primary-600 cursor-pointer"><Eye className="w-4 h-4" /></button>
        <button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-primary-600 cursor-pointer"><Download className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Medical Records</h1>
        <p className="text-sm text-surface-500 mt-1">View your complete medical history and documents</p>
      </div>
      <Card>
        <DataTable columns={columns} data={records} searchPlaceholder="Search records..." />
      </Card>
    </div>
  );
};

export default PatientRecords;

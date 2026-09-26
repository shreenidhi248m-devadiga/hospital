import { Upload, FileText, Download, Trash2, Eye } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';
import { mockDocuments } from '../../data/mockData';

const PatientDocuments = () => {
  const columns = [
    { key: 'name', label: 'Document', render: (val) => (
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center flex-shrink-0">
          <FileText className="w-4 h-4 text-primary-600" />
        </div>
        <span className="text-sm font-medium text-surface-900">{val}</span>
      </div>
    )},
    { key: 'category', label: 'Category', render: (val) => <Badge variant="primary">{val}</Badge> },
    { key: 'size', label: 'Size' },
    { key: 'uploadDate', label: 'Uploaded' },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={val === 'Verified' || val === 'Final' ? 'success' : 'info'} dot>{val}</Badge> },
    { key: 'actions', label: '', sortable: false, render: () => (
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-primary-600 cursor-pointer"><Eye className="w-4 h-4" /></button>
        <button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-primary-600 cursor-pointer"><Download className="w-4 h-4" /></button>
        <button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-red-600 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Documents</h1>
          <p className="text-sm text-surface-500 mt-1">Upload and manage your medical documents</p>
        </div>
        <Button icon={Upload}>Upload Document</Button>
      </div>
      <Card>
        <DataTable columns={columns} data={mockDocuments} searchPlaceholder="Search documents..." />
      </Card>
    </div>
  );
};

export default PatientDocuments;

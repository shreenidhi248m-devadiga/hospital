import { useState } from 'react';
import { FileText, Download, CheckCircle2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import { mockMedicalRecords } from '../../data/mockData';

const PatientRecords = () => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const records = mockMedicalRecords.filter((r) => r.patientId === 'P001');

  const typeColors = { 'Lab Results': 'primary', Prescription: 'success', Imaging: 'purple', Procedure: 'warning' };

  const columns = [
    { 
      key: 'title', 
      label: 'RECORD TITLE', 
      render: (val, row) => (
        <div>
          <p className="font-bold text-surface-900">{val}</p>
          <p className="text-xs text-surface-500 font-medium">{row.doctor}</p>
        </div>
      )
    },
    { key: 'type', label: 'RECORD TYPE', render: (val) => <Badge variant={typeColors[val] || 'default'}>{val}</Badge> },
    { key: 'date', label: 'DATE', render: (val) => <span className="font-semibold text-surface-900">{val}</span> },
    { key: 'status', label: 'STATUS', render: (val) => <Badge variant={val === 'Active' ? 'success' : 'info'} dot>{val}</Badge> },
    { 
      key: 'attachments', 
      label: 'ATTACHMENTS', 
      render: (val) => val > 0 ? (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold text-primary-700 bg-primary-50 border border-primary-100">
          <FileText className="w-3.5 h-3.5" />
          {val} file(s)
        </span>
      ) : (
        <span className="text-xs font-medium text-surface-400">None</span>
      )
    },
    { 
      key: 'actions', 
      label: 'ACTIONS', 
      sortable: false, 
      render: (_, row) => (
        <div className="flex items-center gap-1">
          
          <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-500 hover:text-primary-600 cursor-pointer transition-colors" title="Download File">
            <Download className="w-4 h-4" />
          </button>
        </div>
      )
    },
  ];

  const handleDownloadAll = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 4000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }} className="space-y-6">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-surface-900 tracking-tight">Medical Records</h1>
          <p className="text-sm text-surface-500 mt-1">View, inspect, and download your official health records and lab summaries</p>
        </div>
        <Button icon={Download} onClick={handleDownloadAll} className="whitespace-nowrap flex-shrink-0 shadow-sm">
          Download All Records
        </Button>
      </div>

      {/* Download Feedback Toast */}
      {downloadSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-semibold shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          Archive generated! All medical records have been downloaded to your computer.
        </div>
      )}

      {/* DATA TABLE CARD */}
      <Card padding="p-0">
        <DataTable data={records} columns={columns} searchPlaceholder="Search medical records by title, doctor, or type..." />
      </Card>

    </div>
  );
};

export default PatientRecords;

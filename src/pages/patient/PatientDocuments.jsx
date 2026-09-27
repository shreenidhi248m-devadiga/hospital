import { useState } from 'react';
import { Upload, FileText, Download, Trash2, CheckCircle2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import { mockDocuments } from '../../data/mockData';

const PatientDocuments = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const columns = [
    { 
      key: 'name', 
      label: 'DOCUMENT NAME', 
      render: (val) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4.5 h-4.5 text-primary-600" />
          </div>
          <span className="text-sm font-bold text-surface-900">{val}</span>
        </div>
      )
    },
    { key: 'category', label: 'CATEGORY', render: (val) => <Badge variant="primary">{val}</Badge> },
    { key: 'size', label: 'SIZE', render: (val) => <span className="text-xs font-semibold text-surface-600">{val}</span> },
    { key: 'uploadDate', label: 'UPLOADED DATE', render: (val) => <span className="text-xs font-medium text-surface-700">{val}</span> },
    { key: 'status', label: 'STATUS', render: (val) => <Badge variant={val === 'Verified' || val === 'Final' ? 'success' : 'info'} dot>{val}</Badge> },
    { key: 'actions', label: 'ACTIONS', sortable: false, render: () => (
      <div className="flex items-center gap-1">
        
        <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-500 hover:text-primary-600 cursor-pointer transition-colors" title="Download Document"><Download className="w-4 h-4" /></button>
        <button className="p-2 rounded-lg hover:bg-surface-100 text-surface-500 hover:text-red-600 cursor-pointer transition-colors" title="Delete Document"><Trash2 className="w-4 h-4" /></button>
      </div>
    )},
  ];

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setShowUploadModal(false);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 4000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }} className="space-y-6">
      
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-surface-900 tracking-tight">Documents Library</h1>
          <p className="text-sm text-surface-500 mt-1">Upload and manage your medical reports, insurance claims, and lab documents</p>
        </div>
        <Button icon={Upload} onClick={() => setShowUploadModal(true)} className="whitespace-nowrap flex-shrink-0 shadow-sm">
          Upload Document
        </Button>
      </div>

      {/* Upload Toast */}
      {uploadSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-semibold shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          Document uploaded successfully! It is now securely stored in your medical records.
        </div>
      )}

      {/* DATA TABLE CARD */}
      <Card padding="p-0">
        <DataTable columns={columns} data={mockDocuments} searchPlaceholder="Search documents by name or category..." />
      </Card>

      {/* UPLOAD MODAL */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload New Medical Document"
        size="md"
        footer={
          <div className="flex justify-end gap-3 w-full">
            <Button variant="outline" onClick={() => setShowUploadModal(false)}>Cancel</Button>
            <Button onClick={handleUploadSubmit}>Upload File</Button>
          </div>
        }
      >
        <form onSubmit={handleUploadSubmit} className="space-y-4 pt-1">
          <div>
            <label className="block text-xs font-bold text-surface-700 uppercase tracking-wider mb-1.5">Document File</label>
            <input type="file" required className="w-full text-xs text-surface-600 border border-surface-300 rounded-xl p-2.5 bg-surface-50 cursor-pointer" />
          </div>
          <div>
            <label className="block text-xs font-bold text-surface-700 uppercase tracking-wider mb-1.5">Category</label>
            <select required className="w-full rounded-xl border border-surface-300 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
              {['Insurance', 'Lab Results', 'Imaging', 'Prescription', 'Records', 'Consent'].map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-surface-700 uppercase tracking-wider mb-1.5">Document Title / Description</label>
            <input type="text" placeholder="e.g. Lab Results CBC Oct 2026" required className="w-full rounded-xl border border-surface-300 px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
          </div>
        </form>
      </Modal>

    </div>
  );
};

export default PatientDocuments;

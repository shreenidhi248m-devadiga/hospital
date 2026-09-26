import { useState } from 'react';
import { Plus, PillBottle, Eye, Printer } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';
import { mockPrescriptions } from '../../data/mockData';

const DoctorPrescriptions = () => {
  const [showCreate, setShowCreate] = useState(false);

  const columns = [
    { key: 'patientName', label: 'Patient' },
    { key: 'medication', label: 'Medication', render: (val) => <span className="font-medium text-surface-900">{val}</span> },
    { key: 'dosage', label: 'Dosage' },
    { key: 'duration', label: 'Duration' },
    { key: 'prescribedDate', label: 'Date' },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={val === 'Active' ? 'success' : 'default'} dot>{val}</Badge> },
    { key: 'refills', label: 'Refills', render: (val) => <span className="text-sm">{val} remaining</span> },
    { key: 'actions', label: '', sortable: false, render: () => (
      <div className="flex items-center gap-1">
        <button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-primary-600 cursor-pointer"><Eye className="w-4 h-4" /></button>
        <button className="p-1.5 rounded-lg hover:bg-surface-100 text-surface-400 hover:text-primary-600 cursor-pointer"><Printer className="w-4 h-4" /></button>
      </div>
    )},
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Prescriptions</h1>
          <p className="text-sm text-surface-500 mt-1">Create and manage patient prescriptions</p>
        </div>
        <Button icon={Plus} onClick={() => setShowCreate(true)}>New Prescription</Button>
      </div>
      <Card>
        <DataTable columns={columns} data={mockPrescriptions} searchPlaceholder="Search prescriptions..." />
      </Card>

      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="New Prescription"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
            <Button onClick={() => setShowCreate(false)}>Create Prescription</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Patient</label>
            <select className="w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
              <option value="">Select patient</option>
              <option>Sarah Johnson</option>
              <option>John Davis</option>
              <option>Maria Garcia</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Medication</label>
              <input type="text" placeholder="Drug name" className="w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Dosage</label>
              <input type="text" placeholder="e.g., 10mg twice daily" className="w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Duration</label>
              <input type="text" placeholder="e.g., 30 days" className="w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Refills</label>
              <input type="number" placeholder="0" className="w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Notes</label>
            <textarea rows={3} placeholder="Additional instructions..." className="w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DoctorPrescriptions;

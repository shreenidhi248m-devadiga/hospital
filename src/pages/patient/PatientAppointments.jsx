import { useState } from 'react';
import { Calendar, Plus, Filter } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';
import { mockAppointments, mockDoctors } from '../../data/mockData';

const PatientAppointments = () => {
  const [showBooking, setShowBooking] = useState(false);
  const [filter, setFilter] = useState('all');
  const appointments = mockAppointments.filter((a) => a.patientId === 'P001');

  const filtered = filter === 'all' ? appointments : appointments.filter((a) => a.status === filter);

  const statusColors = { confirmed: 'success', pending: 'warning', cancelled: 'danger', completed: 'info' };

  const columns = [
    { key: 'doctorName', label: 'Doctor' },
    { key: 'specialty', label: 'Specialty' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'type', label: 'Type' },
    {
      key: 'status', label: 'Status',
      render: (val) => <Badge variant={statusColors[val]} dot>{val}</Badge>,
    },
  ];

  const filters = ['all', 'confirmed', 'pending', 'completed', 'cancelled'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Appointments</h1>
          <p className="text-sm text-surface-500 mt-1">Manage your upcoming and past appointments</p>
        </div>
        <Button icon={Plus} onClick={() => setShowBooking(true)}>
          Book Appointment
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors whitespace-nowrap cursor-pointer ${
              filter === f ? 'bg-primary-600 text-white' : 'bg-white border border-surface-200 text-surface-600 hover:bg-surface-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <Card>
        <DataTable columns={columns} data={filtered} searchPlaceholder="Search appointments..." />
      </Card>

      {/* Booking Modal */}
      <Modal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        title="Book New Appointment"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowBooking(false)}>Cancel</Button>
            <Button onClick={() => setShowBooking(false)}>Confirm Booking</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Select Doctor</label>
            <select className="w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
              <option value="">Choose a doctor</option>
              {mockDoctors.map((d) => (
                <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Date</label>
              <input type="date" className="w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">Time</label>
              <select className="w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
                {['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Type</label>
            <select className="w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
              {['Check-up', 'Consultation', 'Follow-up', 'Emergency', 'Vaccination'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">Notes</label>
            <textarea rows={3} placeholder="Any additional information..." className="w-full rounded-lg border border-surface-300 px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 resize-none" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PatientAppointments;

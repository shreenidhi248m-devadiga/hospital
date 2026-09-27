import { useState } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import { Plus, Search } from 'lucide-react';
import { mockAppointments } from '../../data/mockData';

const StaffAppointments = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const statusColors = { confirmed: 'success', pending: 'warning', cancelled: 'danger', completed: 'info' };

  const filtered = mockAppointments.filter((a) => {
    const matchesFilter = filter === 'all' || a.status === filter;
    const matchesSearch = !searchTerm ||
      a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const columns = [
    { key: 'patientName', label: 'Patient', render: (val) => (
      <div className="flex items-center gap-2.5"><Avatar name={val} size="sm" /><span className="font-bold text-surface-900">{val}</span></div>
    )},
    { key: 'doctorName', label: 'Doctor', render: (val, row) => (
      <div>
        <p className="font-semibold text-surface-900">{val}</p>
        <p className="text-xs text-surface-500">{row.specialty}</p>
      </div>
    )},
    { key: 'date', label: 'Date', render: (val) => <span className="font-medium text-surface-900">{val}</span> },
    { key: 'time', label: 'Time' },
    { key: 'type', label: 'Type' },
    { key: 'room', label: 'Room', render: (val) => <span className="font-medium text-surface-700 bg-surface-100 px-2 py-0.5 rounded">Room {val}</span> },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={statusColors[val] || 'default'} dot>{val}</Badge> },
  ];

  const filters = [
    { id: 'all', label: 'All Hospital Appointments' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  return (
    <div className="space-y-6" style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-surface-900 tracking-tight">All Hospital Appointments</h1>
          <p className="text-sm text-surface-500 mt-1">Manage hospital-wide appointment schedules and check-ins</p>
        </div>
        <Button icon={Plus} className="whitespace-nowrap flex-shrink-0 shadow-sm">Schedule Appointment</Button>
      </div>

      <Card padding="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {filters.map((f) => {
              const active = filter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setFilter(f.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    active 
                      ? 'bg-primary-600 text-white shadow-xs' 
                      : 'bg-surface-50 border border-surface-200 text-surface-600 hover:bg-surface-100 hover:text-surface-900'
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patient, doctor, specialty..."
              className="w-full pl-10 pr-4 py-2 text-xs border border-surface-200 rounded-xl bg-surface-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            />
          </div>
        </div>
      </Card>

      <Card padding="p-0">
        <DataTable columns={columns} data={filtered} searchable={false} emptyMessage="No appointments found." />
      </Card>
    </div>
  );
};

export default StaffAppointments;

import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import { Plus } from 'lucide-react';
import { mockAppointments } from '../../data/mockData';

const StaffAppointments = () => {
  const statusColors = { confirmed: 'success', pending: 'warning', cancelled: 'danger', completed: 'info' };
  const columns = [
    { key: 'patientName', label: 'Patient', render: (val) => (
      <div className="flex items-center gap-2.5"><Avatar name={val} size="sm" /><span className="font-medium text-surface-900">{val}</span></div>
    )},
    { key: 'doctorName', label: 'Doctor' },
    { key: 'specialty', label: 'Specialty' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'type', label: 'Type' },
    { key: 'room', label: 'Room', render: (val) => `Room ${val}` },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={statusColors[val]} dot>{val}</Badge> },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">All Appointments</h1>
          <p className="text-sm text-surface-500 mt-1">Manage hospital-wide appointments</p>
        </div>
        <Button icon={Plus}>Schedule Appointment</Button>
      </div>
      <Card>
        <DataTable columns={columns} data={mockAppointments} searchPlaceholder="Search all appointments..." />
      </Card>
    </div>
  );
};

export default StaffAppointments;

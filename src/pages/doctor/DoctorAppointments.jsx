import { Calendar } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import Avatar from '../../components/ui/Avatar';
import { mockAppointments } from '../../data/mockData';

const DoctorAppointments = () => {
  const appointments = mockAppointments.filter((a) => a.doctorId === '1');
  const statusColors = { confirmed: 'success', pending: 'warning', cancelled: 'danger', completed: 'info' };

  const columns = [
    { key: 'patientName', label: 'Patient', render: (val) => (
      <div className="flex items-center gap-2.5">
        <Avatar name={val} size="sm" />
        <span className="font-medium text-surface-900">{val}</span>
      </div>
    )},
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'type', label: 'Type' },
    { key: 'room', label: 'Room', render: (val) => <span className="text-surface-600">Room {val}</span> },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={statusColors[val]} dot>{val}</Badge> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">My Appointments</h1>
        <p className="text-sm text-surface-500 mt-1">Manage your patient appointments and schedule</p>
      </div>
      <Card>
        <DataTable columns={columns} data={appointments} searchPlaceholder="Search appointments..." />
      </Card>
    </div>
  );
};

export default DoctorAppointments;

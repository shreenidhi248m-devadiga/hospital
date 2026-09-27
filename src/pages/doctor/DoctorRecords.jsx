import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import DataTable from '../../components/ui/DataTable';
import { mockPatients } from '../../data/mockData';

const formatDateDDMMYYYY = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
};

const DoctorRecords = () => {
  const columns = [
    { key: 'name', label: 'Patient', render: (val, row) => (
      <div className="flex items-center gap-2.5">
        <Avatar name={val} size="sm" />
        <div>
          <p className="font-medium text-surface-900">{val}</p>
          <p className="text-xs text-surface-500">ID: {row.id}</p>
        </div>
      </div>
    )},
    { key: 'age', label: 'Age', render: (val, row) => `${val}, ${row.gender}` },
    { key: 'blood', label: 'Blood' },
    { key: 'conditions', label: 'Conditions', render: (val) => val.length > 0 ? val.map((c, i) => <Badge key={i} variant="warning" className="mr-1 mb-1">{c}</Badge>) : <span className="text-surface-400">None</span> },
    { key: 'lastVisit', label: 'Last Visit', render: (val) => formatDateDDMMYYYY(val) },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }} className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Patient Records</h1>
        <p className="text-sm text-surface-500 mt-1">View and manage your patients' medical records</p>
      </div>
      <Card>
        <DataTable columns={columns} data={mockPatients} searchPlaceholder="Search patients..." />
      </Card>
    </div>
  );
};

export default DoctorRecords;

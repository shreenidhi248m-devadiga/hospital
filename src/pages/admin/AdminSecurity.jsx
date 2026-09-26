import { Shield, Key, Eye, AlertTriangle, Clock, MonitorSmartphone } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';

const auditLogs = [
  { id: '1', user: 'James Wilson', action: 'Login', resource: 'Auth System', ip: '192.168.1.45', timestamp: '2026-09-26 18:15:00', status: 'Success' },
  { id: '2', user: 'Dr. Michael Chen', action: 'View Record', resource: 'Patient P001', ip: '192.168.1.22', timestamp: '2026-09-26 17:45:00', status: 'Success' },
  { id: '3', user: 'Unknown', action: 'Login Attempt', resource: 'Auth System', ip: '45.67.89.12', timestamp: '2026-09-26 16:30:00', status: 'Failed' },
  { id: '4', user: 'Emily Rodriguez', action: 'Update Queue', resource: 'Queue Q001', ip: '192.168.1.33', timestamp: '2026-09-26 15:20:00', status: 'Success' },
  { id: '5', user: 'James Wilson', action: 'Create User', resource: 'User Management', ip: '192.168.1.45', timestamp: '2026-09-26 14:00:00', status: 'Success' },
  { id: '6', user: 'Unknown', action: 'Password Reset', resource: 'Auth System', ip: '78.90.12.34', timestamp: '2026-09-26 12:00:00', status: 'Failed' },
];

const AdminSecurity = () => {
  const columns = [
    { key: 'user', label: 'User', render: (val) => <span className={val === 'Unknown' ? 'text-red-600 font-medium' : 'text-surface-900 font-medium'}>{val}</span> },
    { key: 'action', label: 'Action' },
    { key: 'resource', label: 'Resource' },
    { key: 'ip', label: 'IP Address', render: (val) => <code className="text-xs bg-surface-100 px-1.5 py-0.5 rounded">{val}</code> },
    { key: 'timestamp', label: 'Timestamp', render: (val) => <span className="text-xs">{val}</span> },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={val === 'Success' ? 'success' : 'danger'} dot>{val}</Badge> },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Security & Audit</h1>
        <p className="text-sm text-surface-500 mt-1">Monitor system security and access logs</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-emerald-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center"><Shield className="w-5 h-5 text-emerald-600" /></div>
            <div><p className="text-sm text-surface-500">Security Score</p><p className="text-xl font-bold text-emerald-600">94/100</p></div>
          </div>
        </Card>
        <Card className="border-amber-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-amber-600" /></div>
            <div><p className="text-sm text-surface-500">Failed Logins (24h)</p><p className="text-xl font-bold text-amber-600">3</p></div>
          </div>
        </Card>
        <Card className="border-primary-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center"><MonitorSmartphone className="w-5 h-5 text-primary-600" /></div>
            <div><p className="text-sm text-surface-500">Active Sessions</p><p className="text-xl font-bold text-primary-600">12</p></div>
          </div>
        </Card>
      </div>

      <Card>
        <h2 className="text-lg font-semibold text-surface-900 mb-4">Audit Log</h2>
        <DataTable columns={columns} data={auditLogs} searchPlaceholder="Search audit logs..." />
      </Card>
    </div>
  );
};

export default AdminSecurity;

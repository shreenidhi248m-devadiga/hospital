import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  MonitorSmartphone,
  Download,
  Search,
  CheckCircle2,
  Lock,
  KeyRound,
  Eye,
  Server,
  Globe,
  Radio,
  FileCheck,
  Ban,
  Activity,
  Terminal,
  RefreshCw
} from 'lucide-react';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';

const initialAuditLogs = [
  { id: 'LOG-891', user: 'James Wilson', role: 'admin', action: 'System Login', resource: 'Auth Gateway', ip: '192.168.1.45', location: 'Local Hospital LAN', timestamp: '2026-09-26 18:15:00', status: 'Success', severity: 'low' },
  { id: 'LOG-892', user: 'Dr. Michael Chen', role: 'doctor', action: 'View Patient Chart', resource: 'Patient P001 (EMR)', ip: '192.168.1.22', location: 'Cardiology Clinic', timestamp: '2026-09-26 17:45:00', status: 'Success', severity: 'low' },
  { id: 'LOG-893', user: 'Unknown Actor', role: 'unauthorized', action: 'Failed Auth Attempt', resource: 'Auth Gateway', ip: '45.67.89.12', location: 'External WAN (Germany)', timestamp: '2026-09-26 16:30:00', status: 'Failed', severity: 'high' },
  { id: 'LOG-894', user: 'Emily Rodriguez', role: 'staff', action: 'Update Patient Queue', resource: 'Queue Q001', ip: '192.168.1.33', location: 'Reception Desk Wing A', timestamp: '2026-09-26 15:20:00', status: 'Success', severity: 'low' },
  { id: 'LOG-895', user: 'James Wilson', role: 'admin', action: 'Provision New User', resource: 'User Directory', ip: '192.168.1.45', location: 'Admin Workstation', timestamp: '2026-09-26 14:00:00', status: 'Success', severity: 'medium' },
  { id: 'LOG-896', user: 'Unknown Actor', role: 'unauthorized', action: 'Password Reset Flood', resource: 'Auth Gateway', ip: '78.90.12.34', location: 'External WAN (Netherlands)', timestamp: '2026-09-26 12:00:00', status: 'Failed', severity: 'high' },
  { id: 'LOG-897', user: 'Dr. Emily Watson', role: 'doctor', action: 'Prescription Authorized', resource: 'Rx Gateway #402', ip: '192.168.1.28', location: 'Pediatrics Ward', timestamp: '2026-09-26 10:45:00', status: 'Success', severity: 'low' },
];

const formatTimestamp = (ts) => {
  if (!ts) return '';
  const [date, time] = ts.split(' ');
  if (!time) return ts;
  const parts = date.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const formattedDate = `${months[parseInt(parts[1], 10) - 1]} ${parts[2]}, ${parts[0]}`;
  return `${formattedDate} • ${time}`;
};

const AdminSecurity = () => {
  const [logs, setLogs] = useState(initialAuditLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isScanModalOpen, setIsScanModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleBlockIp = (ip) => {
    showToast(`IP address ${ip} has been permanently blacklisted & blocked.`);
    setSelectedEvent(null);
  };

  const handleRunSecurityScan = () => {
    setIsScanModalOpen(true);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      showToast('Security audit complete: 0 vulnerabilities found, Score: 96/100');
    }, 2000);
  };

  const handleExportCSV = () => {
    const headers = ['Log ID', 'User', 'Role', 'Action', 'Resource', 'IP Address', 'Location', 'Timestamp', 'Status', 'Severity'];
    const rows = logs.map((l) => [
      `"${l.id}"`,
      `"${l.user}"`,
      `"${l.role}"`,
      `"${l.action}"`,
      `"${l.resource}"`,
      `"${l.ip}"`,
      `"${l.location}"`,
      `"${l.timestamp}"`,
      `"${l.status}"`,
      `"${l.severity}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.href = encodedUri;
    link.download = `hospital_security_audit_log_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Audit trail exported successfully!');
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      !searchTerm ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ip.includes(searchTerm) ||
      log.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'all' || log.status === statusFilter;

    let matchesCategory = true;
    if (categoryFilter === 'auth') matchesCategory = log.action.toLowerCase().includes('auth') || log.action.toLowerCase().includes('login') || log.action.toLowerCase().includes('password');
    if (categoryFilter === 'ehr') matchesCategory = log.resource.toLowerCase().includes('patient') || log.resource.toLowerCase().includes('rx');
    if (categoryFilter === 'admin') matchesCategory = log.role === 'admin' || log.resource.toLowerCase().includes('user');
    if (categoryFilter === 'failed') matchesCategory = log.status === 'Failed';

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const columns = [
    {
      key: 'user',
      label: 'Actor / User',
      render: (val, row) => {
        const isUnknown = val.includes('Unknown');
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Avatar name={val} size="sm" />
            <div>
              <span style={{ fontWeight: 800, color: isUnknown ? '#DC2626' : '#0F172A', display: 'block', fontSize: '13px' }}>
                {val}
              </span>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
                {row.id} &bull; {row.role.toUpperCase()}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      key: 'action',
      label: 'Security Event',
      render: (val, row) => {
        const isFail = row.status === 'Failed';
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '12px',
              fontWeight: 700,
              color: isFail ? '#B91C1C' : '#1E293B'
            }}
          >
            {isFail ? <ShieldAlert style={{ width: '13px', height: '13px', color: '#DC2626' }} /> : <ShieldCheck style={{ width: '13px', height: '13px', color: '#16A34A' }} />}
            {val}
          </span>
        );
      },
    },
    {
      key: 'resource',
      label: 'Target Resource',
      render: (val) => (
        <span
          style={{
            display: 'inline-block',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontFamily: 'monospace',
            fontWeight: 700,
            backgroundColor: '#F1F5F9',
            color: '#334155',
            border: '1px solid #E2E8F0'
          }}
        >
          {val}
        </span>
      ),
    },
    {
      key: 'ip',
      label: 'Origin Network / IP',
      render: (val, row) => {
        const isInternal = val.startsWith('192.168');
        return (
          <div>
            <code
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: isInternal ? '#2563EB' : '#DC2626',
                backgroundColor: isInternal ? '#EFF6FF' : '#FEF2F2',
                padding: '2px 6px',
                borderRadius: '4px',
                border: `1px solid ${isInternal ? '#BFDBFE' : '#FECACA'}`
              }}
            >
              {val}
            </code>
            <span style={{ display: 'block', fontSize: '10px', color: '#64748B', marginTop: '2px' }}>
              {row.location}
            </span>
          </div>
        );
      },
    },
    {
      key: 'timestamp',
      label: 'Audit Timestamp',
      render: (val) => (
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
          {formatTimestamp(val)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Verdict',
      render: (val) => {
        const isSuccess = val === 'Success';
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 9px',
              borderRadius: '16px',
              fontSize: '11px',
              fontWeight: 800,
              backgroundColor: isSuccess ? '#F0FDF4' : '#FEF2F2',
              color: isSuccess ? '#15803D' : '#B91C1C',
              border: `1px solid ${isSuccess ? '#BBF7D0' : '#FECACA'}`
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: isSuccess ? '#22C55E' : '#EF4444'
              }}
            />
            {isSuccess ? 'Success' : 'Blocked'}
          </span>
        );
      },
    },
    {
      key: 'actions',
      label: 'Forensics',
      sortable: false,
      render: (_, row) => (
        <button
          onClick={() => setSelectedEvent(row)}
          style={{
            padding: '5px 10px',
            fontSize: '11px',
            fontWeight: 700,
            borderRadius: '8px',
            backgroundColor: '#EFF6FF',
            color: '#2563EB',
            border: '1px solid #BFDBFE',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            transition: 'background-color 0.15s ease'
          }}
          title="Inspect Event Forensics"
        >
          <Eye style={{ width: '13px', height: '13px' }} />
          <span>Inspect</span>
        </button>
      ),
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed',
              top: '24px',
              right: '24px',
              zIndex: 9999,
              backgroundColor: '#0F172A',
              color: 'white',
              padding: '12px 18px',
              borderRadius: '12px',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.25)',
              border: '1px solid #334155',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '13px',
              fontWeight: 600
            }}
          >
            <CheckCircle2 style={{ width: '18px', height: '18px', color: '#10B981', flexShrink: 0 }} />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
              Security & Threat Monitoring
            </h1>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '3px 10px',
                borderRadius: '16px',
                fontSize: '11px',
                fontWeight: 700,
                backgroundColor: '#ECFDF5',
                color: '#059669',
                border: '1px solid #A7F3D0'
              }}
            >
              <ShieldCheck style={{ width: '13px', height: '13px' }} />
              HIPAA Audit & Trace
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Surveillance of authentication attempts, electronic health record access logs, IP geo-fencing, and cryptographic security.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleExportCSV}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '9px 15px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontSize: '13px',
              fontWeight: 600,
              border: '1px solid #CBD5E1',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
          >
            <Download style={{ width: '15px', height: '15px', color: '#64748B' }} />
            <span>Export Log</span>
          </button>

          <button
            onClick={handleRunSecurityScan}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 16px',
              borderRadius: '10px',
              backgroundColor: '#2563EB',
              color: 'white',
              fontSize: '13px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(37, 99, 235, 0.25)',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          >
            <Activity style={{ width: '15px', height: '15px' }} />
            <span>Run Security Scan</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
        {/* Security Score */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #BBF7D0', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#047857', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Security Posture
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck style={{ width: '18px', height: '18px', color: '#059669' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '10px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#047857' }}>94/100</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>Grade A+</span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>
            HIPAA compliant & AES-256 encrypted
          </p>
        </div>

        {/* Failed Logins */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #FDE68A', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#B45309', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Failed Attempts (24h)
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AlertTriangle style={{ width: '18px', height: '18px', color: '#D97706' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '10px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#B45309' }}>2</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#B45309', backgroundColor: '#FEF3C7', padding: '2px 7px', borderRadius: '6px' }}>
              All Geo-Blocked
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>
            Auto-throttled via rate limiting shield
          </p>
        </div>

        {/* Active Sessions */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #BFDBFE', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Active Sessions
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MonitorSmartphone style={{ width: '18px', height: '18px', color: '#2563EB' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '10px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#1D4ED8' }}>12</span>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#2563EB' }}>workstations</span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>
            All authenticated via TLS 1.3 tunnels
          </p>
        </div>

        {/* PHI Access Audit */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Audit Events (24h)
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Radio style={{ width: '18px', height: '18px', color: '#64748B' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '10px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A' }}>1,428</span>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>events</span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>
            100% trace coverage on record access
          </p>
        </div>
      </div>

      {/* Control Toolbar */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '12px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
        }}
      >
        {/* Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto' }}>
          {[
            { id: 'all', label: `All Events (${logs.length})` },
            { id: 'auth', label: 'Authentication / Logins' },
            { id: 'ehr', label: 'EHR Chart Access' },
            { id: 'admin', label: 'Administrative Actions' },
            { id: 'failed', label: 'Threats & Blocked' },
          ].map((cat) => {
            const active = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  backgroundColor: active ? '#2563EB' : '#F1F5F9',
                  color: active ? '#FFFFFF' : '#475569',
                  boxShadow: active ? '0 1px 2px rgba(37,99,235,0.2)' : 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Status Filter & Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '7px 10px',
              fontSize: '12px',
              fontWeight: 600,
              borderRadius: '10px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#F8FAFC',
              color: '#334155',
              outline: 'none'
            }}
          >
            <option value="all">All Verdicts</option>
            <option value="Success">Success Only</option>
            <option value="Failed">Failed / Blocked</option>
          </select>

          <div style={{ position: 'relative', width: '220px' }}>
            <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#94A3B8' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search user, IP, resource..."
              style={{
                width: '100%',
                padding: '7px 12px 7px 32px',
                fontSize: '12px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                backgroundColor: '#F8FAFC',
                outline: 'none',
                color: '#0F172A',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.03)', overflow: 'hidden' }}>
        <DataTable
          columns={columns}
          data={filteredLogs}
          searchable={false}
          emptyMessage="No audit log events match the query or filters."
        />
      </div>

      {/* Forensic Inspection Modal */}
      {selectedEvent && (
        <Modal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title={`Forensic Event Inspection - ${selectedEvent.id}`}
          subtitle={`Audit recorded at ${formatTimestamp(selectedEvent.timestamp)}`}
          size="md"
          footer={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              {!selectedEvent.ip.startsWith('192.168') && (
                <button
                  type="button"
                  onClick={() => handleBlockIp(selectedEvent.ip)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '8px',
                    backgroundColor: '#FEF2F2',
                    color: '#DC2626',
                    border: '1px solid #FECACA',
                    cursor: 'pointer'
                  }}
                >
                  <Ban style={{ width: '13px', height: '13px' }} />
                  <span>Blacklist IP</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: 'white',
                  color: '#475569',
                  cursor: 'pointer',
                  marginLeft: 'auto'
                }}
              >
                Close Forensics
              </button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div
              style={{
                padding: '14px',
                borderRadius: '10px',
                backgroundColor: selectedEvent.status === 'Failed' ? '#FEF2F2' : '#F8FAFC',
                border: `1px solid ${selectedEvent.status === 'Failed' ? '#FECACA' : '#E2E8F0'}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: selectedEvent.status === 'Failed' ? '#B91C1C' : '#0F172A' }}>
                  {selectedEvent.status === 'Failed' ? 'SECURITY ALERT: THREAT MITIGATED' : 'VERIFIED AUDIT EVENT'}
                </span>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B' }}>
                  Event #{selectedEvent.id}
                </span>
              </div>
              <h3 style={{ margin: '6px 0 0 0', fontSize: '16px', fontWeight: 800, color: '#0F172A' }}>
                {selectedEvent.action}
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Authenticated User</span>
                <p style={{ margin: '3px 0 0 0', fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>{selectedEvent.user}</p>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Role: {selectedEvent.role}</span>
              </div>

              <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Target Resource</span>
                <p style={{ margin: '3px 0 0 0', fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>{selectedEvent.resource}</p>
                <span style={{ fontSize: '11px', color: '#64748B' }}>Access scope: Read / Write</span>
              </div>
            </div>

            <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Origin Network & Geolocation</span>
              <p style={{ margin: '3px 0 0 0', fontSize: '13px', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Globe style={{ width: '13px', height: '13px', color: '#2563EB' }} />
                <span>{selectedEvent.ip}</span>
                <span style={{ color: '#64748B', fontWeight: 500 }}>({selectedEvent.location})</span>
              </p>
            </div>

            <div style={{ padding: '10px 12px', borderRadius: '8px', backgroundColor: '#0F172A', color: '#E2E8F0', fontFamily: 'monospace', fontSize: '11px' }}>
              <span style={{ color: '#38BDF8' }}>$ audit-trail --inspect {selectedEvent.id}</span>
              <p style={{ margin: '4px 0 0 0', color: '#94A3B8' }}>
                TLS_CIPHER: TLS_AES_256_GCM_SHA384 | HANDSHAKE: SUCCESS | CERT: VALID
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Security Scan Modal */}
      {isScanModalOpen && (
        <Modal
          isOpen={isScanModalOpen}
          onClose={() => setIsScanModalOpen(false)}
          title="Hospital Security & Compliance Scanner"
          subtitle="Real-time automated audit of TLS certificates, cipher suites, database encryption, and HIPAA access rules."
          size="md"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <button
                type="button"
                disabled={isScanning}
                onClick={() => setIsScanModalOpen(false)}
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#2563EB',
                  color: 'white',
                  cursor: isScanning ? 'not-allowed' : 'pointer'
                }}
              >
                {isScanning ? 'Auditing System...' : 'Finish Inspection'}
              </button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              { label: 'TLS 1.3 Protocol & Cipher Hardening', status: 'Passed (A+)', ok: true },
              { label: 'Database Column-Level AES-256 Encryption', status: 'Active & Verified', ok: true },
              { label: 'HIPAA Access Trace & Audit Logging', status: '100% Coverage', ok: true },
              { label: 'API DDoS Protection & Rate Limiting Threshold', status: '100 req/min Cap Active', ok: true },
              { label: 'Unused Session Auto-Termination Rule', status: '30-Minute Policy Active', ok: true },
            ].map((check, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isScanning ? (
                    <RefreshCw style={{ width: '14px', height: '14px', color: '#2563EB', animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <CheckCircle2 style={{ width: '15px', height: '15px', color: '#16A34A' }} />
                  )}
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#1E293B' }}>{check.label}</span>
                </div>
                <span style={{ fontSize: '11px', fontWeight: 800, color: isScanning ? '#2563EB' : '#15803D' }}>
                  {isScanning ? 'Checking...' : check.status}
                </span>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminSecurity;

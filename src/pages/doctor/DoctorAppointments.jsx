import { useState } from 'react';
import { Calendar, Search } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import Avatar from '../../components/ui/Avatar';
import { mockAppointments } from '../../data/mockData';

const formatDateDDMMYYYY = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
};

const DoctorAppointments = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const appointments = mockAppointments.filter((a) => a.doctorId === '1');

  const filtered = appointments.filter((a) => {
    const matchesFilter = filter === 'all' || a.status === filter;
    const matchesSearch = !searchTerm ||
      a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusColors = { confirmed: 'success', pending: 'warning', cancelled: 'danger', completed: 'info' };

  const columns = [
    { 
      key: 'patientName', 
      label: 'PATIENT', 
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar name={val} size="sm" />
          <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '14px' }}>{val}</span>
        </div>
      )
    },
    { 
      key: 'date', 
      label: 'DATE', 
      render: (val) => <span style={{ fontWeight: 600, color: '#0F172A', fontSize: '13px' }}>{formatDateDDMMYYYY(val)}</span> 
    },
    { 
      key: 'time', 
      label: 'TIME', 
      render: (val) => <span style={{ color: '#475569', fontWeight: 600, fontSize: '13px' }}>{val}</span> 
    },
    { 
      key: 'type', 
      label: 'TYPE', 
      render: (val) => (
        <span style={{
          display: 'inline-flex', alignItems: 'center', padding: '4px 10px',
          borderRadius: '8px', fontSize: '12px', fontWeight: 600,
          backgroundColor: '#F1F5F9', color: '#334155', border: '1px solid #E2E8F0'
        }}>
          {val}
        </span>
      )
    },
    { 
      key: 'status', 
      label: 'STATUS', 
      render: (val) => <Badge variant={statusColors[val] || 'default'}>{val}</Badge> 
    },
    { 
      key: 'notes', 
      label: 'NOTES', 
      render: (val) => <span style={{ color: '#64748B', fontSize: '13px' }}>{val || '—'}</span> 
    },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }} className="space-y-6">
      <div>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Doctor Appointments</h1>
        <p style={{ fontSize: '14px', color: '#64748B', margin: '4px 0 0', fontWeight: 500 }}>
          View and filter all appointments assigned to your schedule
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              style={{
                padding: '7px 16px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 700,
                border: filter === st ? '1px solid #0D9488' : '1px solid #E2E8F0',
                backgroundColor: filter === st ? '#0D9488' : '#F8FAFC',
                color: filter === st ? 'white' : '#475569',
                cursor: 'pointer', transition: 'all 0.15s ease', textTransform: 'capitalize'
              }}
            >
              {st}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '240px', flexShrink: 0 }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%', padding: '8px 12px 8px 36px', borderRadius: '10px',
              border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none'
            }}
          />
        </div>
      </div>

      <DataTable columns={columns} data={filtered} searchPlaceholder="Filter appointments..." />
    </div>
  );
};

export default DoctorAppointments;

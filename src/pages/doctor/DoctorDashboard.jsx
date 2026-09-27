import { useState } from 'react';
import { Calendar, Users, Clock, Activity, ArrowRight, Stethoscope, CheckCircle2, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { mockAppointments, mockQueue, mockPatients } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const formatDateDDMMYYYY = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
};

const getPriorityInfo = (conditionStr = '', typeStr = '') => {
  const text = `${conditionStr} ${typeStr}`.toLowerCase();
  if (text.includes('heart') || text.includes('diabetes') || text.includes('emergency') || text.includes('surgery') || text.includes('copd')) {
    return { level: 'High Priority', variant: 'high', bg: '#FEF2F2', color: '#DC2626', border: '#FCA5A5' };
  }
  if (text.includes('vaccination') || text.includes('routine') || text.includes('physical therapy') || text.includes('hypertension') || text.includes('check-up')) {
    return { level: 'Low Priority', variant: 'low', bg: '#ECFDF5', color: '#059669', border: '#A7F3D0' };
  }
  return { level: 'Normal Priority', variant: 'normal', bg: '#FFFBEB', color: '#B45309', border: '#FDE68A' };
};

const weeklyData = [
  { day: 'Mon', patients: 18 }, { day: 'Tue', patients: 22 }, { day: 'Wed', patients: 15 },
  { day: 'Thu', patients: 25 }, { day: 'Fri', patients: 20 },
];

const DoctorDashboard = () => {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'queue', 'patients', 'today'
  const [priorityFilter, setPriorityFilter] = useState('all');

  const [queueList, setQueueList] = useState(mockQueue.filter(q => q.doctorId === '1'));
  const doctorAppts = mockAppointments.filter(a => a.doctorId === '1');
  const apts = doctorAppts.filter(a => a.status !== 'cancelled').slice(0, 4);

  const assignedPatients = doctorAppts.map(appt => {
    const pInfo = mockPatients.find(p => p.id === appt.patientId || p.name === appt.patientName);
    const conditionText = pInfo?.conditions?.length ? pInfo.conditions.join(', ') : (appt.notes || 'Cardiovascular Check-up');
    const priority = getPriorityInfo(conditionText, appt.type);

    return {
      id: appt.id,
      patientName: appt.patientName,
      age: pInfo ? pInfo.age : 42,
      gender: pInfo ? pInfo.gender : 'Male',
      date: formatDateDDMMYYYY(appt.date),
      time: appt.time,
      type: appt.type,
      status: appt.status,
      condition: conditionText,
      priority,
      phone: pInfo ? pInfo.phone : '+91 98765 43210'
    };
  });

  const filteredAssignedPatients = assignedPatients.filter(p => {
    if (priorityFilter === 'all') return true;
    return p.priority.variant === priorityFilter;
  });

  const statusDot = { confirmed: '#059669', pending: '#D97706' };

  const handleNextPatient = (id) => {
    setQueueList(prev => prev.map(q => q.id === id ? { ...q, status: 'completed' } : q));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }} className="space-y-6">
      
      {/* Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
        borderRadius: '16px', padding: '26px 30px', boxShadow: '0 4px 14px rgba(13, 148, 136, 0.15)',
        position: 'relative', overflow: 'hidden', marginBottom: '24px'
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-20px', width: '160px', height: '160px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Stethoscope style={{ width: '26px', height: '26px', color: 'white' }} />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'white', margin: 0 }}>
              Good morning, {user?.name || 'Dr. Michael Chen'} 👋
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', margin: '4px 0 0', fontWeight: 500 }}>
              Here's your active schedule for today. You have {apts.length} appointments scheduled.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Stats Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        
        {/* Today's Appointments Stat Card */}
        <div
          onClick={() => setActiveTab(activeTab === 'today' ? 'dashboard' : 'today')}
          style={{
            backgroundColor: activeTab === 'today' ? '#F0FDFA' : 'white',
            borderRadius: '14px',
            border: activeTab === 'today' ? '2px solid #0D9488' : '1px solid #E2E8F0',
            padding: '20px',
            boxShadow: activeTab === 'today' ? '0 4px 12px rgba(13, 148, 136, 0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          title="Click to view today's scheduled appointments"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Today's Appointments</p>
              <p style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: '6px 0 0', letterSpacing: '-0.02em' }}>{apts.length}</p>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#059669', margin: '4px 0 0' }}>• 2 new today</p>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#F0FDFA', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Calendar style={{ width: '20px', height: '20px', color: '#0D9488' }} />
            </div>
          </div>
        </div>

        {/* CLICKABLE PATIENT QUEUE STAT CARD */}
        <div
          onClick={() => setActiveTab(activeTab === 'queue' ? 'dashboard' : 'queue')}
          style={{
            backgroundColor: activeTab === 'queue' ? '#FFFBEB' : 'white',
            borderRadius: '14px',
            border: activeTab === 'queue' ? '2px solid #D97706' : '1px solid #E2E8F0',
            padding: '20px',
            boxShadow: activeTab === 'queue' ? '0 4px 12px rgba(217, 119, 6, 0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          title="Click to toggle active waiting queue"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Patient Queue</p>
              <p style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: '6px 0 0', letterSpacing: '-0.02em' }}>
                {queueList.filter(q => q.status !== 'completed').length}
              </p>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#D97706', margin: '4px 0 0' }}>• Active waiting list</p>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock style={{ width: '20px', height: '20px', color: '#D97706' }} />
            </div>
          </div>
        </div>

        {/* CLICKABLE REGISTERED / TOTAL PATIENTS STAT CARD */}
        <div
          onClick={() => setActiveTab(activeTab === 'patients' ? 'dashboard' : 'patients')}
          style={{
            backgroundColor: activeTab === 'patients' ? '#EFF6FF' : 'white',
            borderRadius: '14px',
            border: activeTab === 'patients' ? '2px solid #2563EB' : '1px solid #E2E8F0',
            padding: '20px',
            boxShadow: activeTab === 'patients' ? '0 4px 12px rgba(37, 99, 235, 0.15)' : '0 1px 3px rgba(0,0,0,0.04)',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          title="Click to view all registered patients & conditions"
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Registered Patients</p>
              <p style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: '6px 0 0', letterSpacing: '-0.02em' }}>142</p>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#2563EB', margin: '4px 0 0' }}>• Total registered patients</p>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Users style={{ width: '20px', height: '20px', color: '#2563EB' }} />
            </div>
          </div>
        </div>

        {/* Consultation Rate Stat */}
        <div style={{ backgroundColor: 'white', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Consultation Rate</p>
              <p style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: '6px 0 0', letterSpacing: '-0.02em' }}>94%</p>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#059669', margin: '4px 0 0' }}>• Completion score</p>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Activity style={{ width: '20px', height: '20px', color: '#059669' }} />
            </div>
          </div>
        </div>

      </div>

      {/* VIEW 1: PATIENT QUEUE */}
      {activeTab === 'queue' && (
        <div style={{
          backgroundColor: 'white', borderRadius: '18px', border: '2px solid #D97706',
          padding: '24px', boxShadow: '0 4px 16px rgba(217,119,6,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Clock size={20} style={{ color: '#D97706' }} /> Patients Currently In Queue
              </h2>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0', fontWeight: 500 }}>
                Live real-time sequence of patients waiting for consultation
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setActiveTab('dashboard')}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  padding: '7px 16px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 700,
                  backgroundColor: '#F1F5F9', color: '#475569', border: '1px solid #CBD5E1', cursor: 'pointer'
                }}
              >
                <X size={14} /> Close Queue View
              </button>
              <Link
                to="/doctor/queue"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  fontSize: '13px', fontWeight: 700, color: '#D97706', textDecoration: 'none',
                  backgroundColor: '#FFFBEB', border: '1px solid #FDE68A', padding: '7px 16px', borderRadius: '10px'
                }}
              >
                Manage Full Queue <ArrowRight size={15} />
              </Link>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {queueList.map((item) => {
              const isInProgress = item.status === 'in-progress';
              const isCompleted = item.status === 'completed';

              return (
                <div
                  key={item.id}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 20px', borderRadius: '14px',
                    backgroundColor: isInProgress ? '#F0FDF4' : isCompleted ? '#F8FAFC' : 'white',
                    border: isInProgress ? '2px solid #10B981' : '1px solid #E2E8F0',
                    boxShadow: isInProgress ? '0 4px 12px rgba(16, 185, 129, 0.1)' : '0 1px 3px rgba(0,0,0,0.03)',
                    flexWrap: 'wrap', gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '12px',
                      backgroundColor: isInProgress ? '#10B981' : isCompleted ? '#94A3B8' : '#D97706',
                      color: 'white', fontWeight: 800, fontSize: '15px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                    }}>
                      #{item.position}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                        <p style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                          {item.patientName}
                        </p>
                        <span style={{
                          padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800,
                          backgroundColor: isInProgress ? '#ECFDF5' : isCompleted ? '#F1F5F9' : '#FFFBEB',
                          color: isInProgress ? '#047857' : isCompleted ? '#64748B' : '#B45309',
                          border: isInProgress ? '1px solid #A7F3D0' : isCompleted ? '1px solid #CBD5E1' : '1px solid #FDE68A',
                          display: 'inline-flex', alignItems: 'center', gap: '6px'
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: isInProgress ? '#059669' : isCompleted ? '#94A3B8' : '#D97706' }} />
                          {isInProgress ? 'In Consultation' : isCompleted ? 'Completed' : 'Waiting in Line'}
                        </span>
                      </div>

                      <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0', fontWeight: 500 }}>
                        {item.type} &bull; Check-in Time: <strong style={{ color: '#0F172A' }}>{item.checkInTime}</strong> &bull; Est: <strong style={{ color: '#0F172A' }}>{item.estimatedTime}</strong>
                      </p>
                    </div>
                  </div>

                  {!isCompleted && (
                    <button
                      onClick={() => handleNextPatient(item.id)}
                      style={{
                        padding: '8px 16px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 700,
                        backgroundColor: isInProgress ? '#059669' : '#2563EB', color: 'white',
                        border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                      }}
                    >
                      <CheckCircle2 size={15} />
                      {isInProgress ? 'Complete Consultation' : 'Call Patient'}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: REGISTERED PATIENTS TABLE */}
      {activeTab === 'patients' && (
        <div style={{
          backgroundColor: 'white', borderRadius: '18px', border: '2px solid #2563EB',
          padding: '24px', boxShadow: '0 4px 16px rgba(37, 99, 235, 0.1)'
        }}>
          {/* Header Banner */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Users size={20} style={{ color: '#2563EB' }} /> Registered Patients & Appointments
              </h2>
              <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0', fontWeight: 500 }}>
                All registered patients assigned to you, formatted with DD-MM-YYYY dates and priority classifications
              </p>
            </div>
            <button
              onClick={() => setActiveTab('dashboard')}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '7px 16px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 700,
                backgroundColor: '#F1F5F9', color: '#475569', border: '1px solid #CBD5E1', cursor: 'pointer'
              }}
            >
              <X size={14} /> Close Patients View
            </button>
          </div>

          {/* PRIORITY FILTER PILLS TOOLBAR */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px', overflowX: 'auto', paddingBottom: '4px'
          }}>
            {[
              { id: 'all', label: 'All Patients', count: assignedPatients.length, color: '#2563EB' },
              { id: 'high', label: 'High Priority', count: assignedPatients.filter(p => p.priority.variant === 'high').length, color: '#DC2626' },
              { id: 'normal', label: 'Normal Priority', count: assignedPatients.filter(p => p.priority.variant === 'normal').length, color: '#B45309' },
              { id: 'low', label: 'Low Priority', count: assignedPatients.filter(p => p.priority.variant === 'low').length, color: '#047857' },
            ].map((tab) => {
              const active = priorityFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setPriorityFilter(tab.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '7px 16px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 700,
                    border: active ? `1px solid ${tab.color}` : '1px solid #E2E8F0',
                    backgroundColor: active ? tab.color : '#F8FAFC',
                    color: active ? 'white' : '#475569',
                    cursor: 'pointer', transition: 'all 0.15s ease', whiteSpace: 'nowrap',
                    boxShadow: active ? `0 2px 6px ${tab.color}33` : 'none'
                  }}
                >
                  <span>{tab.label}</span>
                  <span style={{
                    padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 800,
                    backgroundColor: active ? 'rgba(255,255,255,0.25)' : '#E2E8F0',
                    color: active ? 'white' : '#475569'
                  }}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* TABLE CONTAINER */}
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Patient Name</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Appointment Date & Time</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Medical Condition / Reason</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Priority Level</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Status</th>
                  <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Phone</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssignedPatients.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '36px', textAlign: 'center', color: '#94A3B8', fontWeight: 600 }}>
                      No patients found matching the selected priority filter.
                    </td>
                  </tr>
                ) : (
                  filteredAssignedPatients.map((p, i) => (
                    <tr key={p.id} style={{ borderBottom: i < filteredAssignedPatients.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#EFF6FF', color: '#2563EB', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {p.patientName.charAt(0)}
                          </div>
                          <div>
                            <p style={{ fontWeight: 800, color: '#0F172A', margin: 0 }}>{p.patientName}</p>
                            <p style={{ fontSize: '11px', color: '#64748B', margin: '2px 0 0' }}>{p.age} yrs &bull; {p.gender}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <p style={{ fontWeight: 800, color: '#0F172A', margin: 0 }}>{p.date}</p>
                        <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0', fontWeight: 600 }}>{p.time}</p>
                      </td>
                      {/* NORMAL TEXT FOR MEDICAL CONDITION / REASON (NO PILL/COLORS) */}
                      <td style={{ padding: '14px 16px', color: '#0F172A', fontWeight: 600, fontSize: '13px' }}>
                        {p.condition}
                      </td>
                      {/* PRIORITY LEVEL WITH DISTINCT RED FOR HIGH AND GREEN FOR LOW */}
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 800,
                          backgroundColor: p.priority.bg, color: p.priority.color, border: `1px solid ${p.priority.border}`,
                          whiteSpace: 'nowrap'
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: p.priority.color }} />
                          {p.priority.level}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 800,
                          backgroundColor: p.status === 'confirmed' ? '#ECFDF5' : p.status === 'completed' ? '#EFF6FF' : '#FFFBEB',
                          color: p.status === 'confirmed' ? '#047857' : p.status === 'completed' ? '#1E40AF' : '#B45309',
                          border: p.status === 'confirmed' ? '1px solid #A7F3D0' : p.status === 'completed' ? '1px solid #BFDBFE' : '1px solid #FDE68A'
                        }}>
                          {p.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#475569', fontWeight: 600 }}>
                        {p.phone}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DEFAULT MAIN DASHBOARD SECTION */}
      {(activeTab === 'dashboard' || activeTab === 'today') && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          
          {/* Today's Scheduled Appointments List */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>Today's Scheduled Appointments</h2>
              <Link to="/doctor/appointments" style={{ fontSize: '13px', fontWeight: 700, color: '#0D9488', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                View All <ArrowRight size={14} />
              </Link>
            </div>
            {apts.map((a, i) => (
              <div key={a.id} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', marginBottom: i < apts.length - 1 ? '10px' : 0 }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', backgroundColor: '#F0FDFA', border: '1px solid #99F6E4', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontWeight: 800, color: '#0D9488', fontSize: '15px' }}>
                  {a.patientName.charAt(0)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <p style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: 0 }}>{a.patientName}</p>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: 700, color: statusDot[a.status] || '#059669' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: statusDot[a.status] || '#059669' }} />{a.status}
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0', fontWeight: 500 }}>{a.type} &bull; {a.notes || 'General Checkup'}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', margin: 0 }}>{formatDateDDMMYYYY(a.date)}</p>
                  <p style={{ fontSize: '11px', color: '#64748B', margin: '2px 0 0', fontWeight: 600 }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Chart */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: '0 0 16px' }}>Weekly Patient Consultations</h2>
            <div style={{ height: '220px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B', fontWeight: 600 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748B', fontWeight: 600 }} />
                  <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ backgroundColor: '#0F172A', borderRadius: '10px', color: 'white', border: 'none', fontSize: '12px' }} />
                  <Bar dataKey="patients" fill="#0D9488" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default DoctorDashboard;

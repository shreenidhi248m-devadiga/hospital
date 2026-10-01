import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Users,
  Clock,
  ListOrdered,
  ArrowRight,
  ClipboardList,
  CheckCircle2,
  UserCheck,
  Search,
  Building2,
  Activity,
  DoorOpen,
  Phone,
  Eye,
  Plus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { mockAppointments, mockQueue } from '../../data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const departmentData = [
  { name: 'Pediatrics', value: 15, color: '#F59E0B', percentage: 29, status: 'Active' },
  { name: 'Cardiology', value: 12, color: '#2563EB', percentage: 24, status: 'Normal' },
  { name: 'Orthopedics', value: 10, color: '#0D9488', percentage: 20, status: 'Normal' },
  { name: 'Neurology', value: 8, color: '#8B5CF6', percentage: 16, status: 'Low' },
  { name: 'Other Depts', value: 6, color: '#64748B', percentage: 11, status: 'Normal' },
];

const totalDepartmentPatients = departmentData.reduce((acc, curr) => acc + curr.value, 0);

const StaffDashboard = () => {
  const { user } = useAuthStore();
  const [scheduleFilter, setScheduleFilter] = useState('all');
  const [appointmentsList, setAppointmentsList] = useState(mockAppointments);
  const [selectedPatientModal, setSelectedPatientModal] = useState(null);
  const [checkInModalOpen, setCheckInModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Quick Check In Form
  const [quickName, setQuickName] = useState('');
  const [quickDoctor, setQuickDoctor] = useState('Dr. Michael Chen');
  const [quickDept, setQuickDept] = useState('Cardiology');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCheckIn = (aptId, patientName) => {
    setAppointmentsList((prev) =>
      prev.map((apt) => (apt.id === aptId ? { ...apt, status: 'checked-in' } : apt))
    );
    showToast(`Checked in ${patientName}! Patient sent to active queue.`);
  };

  const handleManualCheckInSubmit = (e) => {
    e.preventDefault();
    if (!quickName.trim()) return;

    const newApt = {
      id: String(Date.now()),
      patientName: quickName.trim(),
      patientId: `P00${Math.floor(Math.random() * 89) + 10}`,
      doctorName: quickDoctor,
      specialty: quickDept,
      date: '2026-10-01',
      time: '12:00 PM',
      status: 'checked-in',
      type: 'Walk-in Consultation',
      room: quickDept === 'Cardiology' ? '301' : quickDept === 'Orthopedics' ? '410' : '205'
    };

    setAppointmentsList([newApt, ...appointmentsList]);
    setCheckInModalOpen(false);
    setQuickName('');
    showToast(`Walk-in patient ${newApt.patientName} registered & checked in!`);
  };

  const filteredAppointments = appointmentsList.filter((a) => {
    if (scheduleFilter === 'all') return true;
    if (scheduleFilter === 'confirmed') return a.status === 'confirmed';
    if (scheduleFilter === 'checked-in') return a.status === 'checked-in';
    if (scheduleFilter === 'completed') return a.status === 'completed';
    return true;
  });

  const checkedInTotal = appointmentsList.filter((a) => a.status === 'checked-in').length + 28;

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

      {/* Neat, Light & Professional Welcome Banner */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '280px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563EB',
              flexShrink: 0
            }}
          >
            <ClipboardList style={{ width: '26px', height: '26px' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                Welcome back, {user?.name?.split(' ')[0] || 'Emily'} 👋
              </h1>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  border: '1px solid #A7F3D0'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                Shift: Morning (7 AM - 3 PM)
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
              Front Desk & Operations Command &bull; Manage today's arrivals, patient queue, and department traffic.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setCheckInModalOpen(true)}
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
              boxShadow: '0 1px 2px rgba(37, 99, 235, 0.2)',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          >
            <UserCheck style={{ width: '16px', height: '16px' }} />
            <span>Quick Check-in</span>
          </button>

          <Link
            to="/staff/queue"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 16px',
              borderRadius: '10px',
              backgroundColor: '#F8FAFC',
              color: '#334155',
              fontSize: '13px',
              fontWeight: 700,
              border: '1px solid #CBD5E1',
              textDecoration: 'none',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F1F5F9';
              e.currentTarget.style.borderColor = '#94A3B8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F8FAFC';
              e.currentTarget.style.borderColor = '#CBD5E1';
            }}
          >
            <ListOrdered style={{ width: '16px', height: '16px', color: '#0D9488' }} />
            <span>Live Queue</span>
          </Link>
        </div>
      </div>

      {/* 4 Crisp KPI Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {/* Card 1 */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Active Waiting Queue</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock style={{ width: '18px', height: '18px' }} />
            </div>
          </div>
          <div style={{ marginTop: '12px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em' }}>{mockQueue.length}</span>
            <span style={{ fontSize: '12px', color: '#64748B', marginLeft: '6px', fontWeight: 600 }}>patients waiting</span>
          </div>
          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: '#FEF3C7', color: '#92400E', border: '1px solid #FDE68A' }}>
              2 in lobby
            </span>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>&bull; Avg wait ~14m</span>
          </div>
        </div>

        {/* Card 2 */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Today's Check-ins</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users style={{ width: '18px', height: '18px' }} />
            </div>
          </div>
          <div style={{ marginTop: '12px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em' }}>{checkedInTotal}</span>
            <span style={{ fontSize: '12px', color: '#64748B', marginLeft: '6px', fontWeight: 600 }}>processed</span>
          </div>
          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: '#1E40AF', border: '1px solid #BFDBFE' }}>
              &uarr; 15% vs yesterday
            </span>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>&bull; Normal flow</span>
          </div>
        </div>

        {/* Card 3 */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Appointments Today</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#F0FDFA', color: '#0D9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar style={{ width: '18px', height: '18px' }} />
            </div>
          </div>
          <div style={{ marginTop: '12px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em' }}>{appointmentsList.length}</span>
            <span style={{ fontSize: '12px', color: '#64748B', marginLeft: '6px', fontWeight: 600 }}>scheduled</span>
          </div>
          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: '#ECFDF5', color: '#065F46', border: '1px solid #A7F3D0' }}>
              On schedule
            </span>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>&bull; 4 morning / 4 afternoon</span>
          </div>
        </div>

        {/* Card 4 */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Avg Wait Duration</span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity style={{ width: '18px', height: '18px' }} />
            </div>
          </div>
          <div style={{ marginTop: '12px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em' }}>14 min</span>
            <span style={{ fontSize: '12px', color: '#64748B', marginLeft: '6px', fontWeight: 600 }}>per patient</span>
          </div>
          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: '#ECFDF5', color: '#065F46', border: '1px solid #A7F3D0' }}>
              &darr; 2 min faster
            </span>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>&bull; Target: &lt;20m</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Schedule (2/3) and Department Traffic (1/3) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', alignItems: 'start' }}>
        
        {/* Left Side: Today's Patient Schedule */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            padding: '22px 24px',
            gridColumn: 'span 2'
          }}
        >
          {/* Header & Segmented Filter */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px',
              paddingBottom: '16px',
              borderBottom: '1px solid #F1F5F9'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Today's Patient Schedule
                </h2>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: '12px',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    border: '1px solid #BFDBFE'
                  }}
                >
                  {filteredAppointments.length} visible
                </span>
              </div>
              <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                Real-time check-in, doctor assignments, and patient flow
              </p>
            </div>

            {/* Segmented Control Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#F1F5F9',
                  padding: '3px',
                  borderRadius: '10px',
                  gap: '4px'
                }}
              >
                {[
                  { id: 'all', label: 'All' },
                  { id: 'confirmed', label: 'Confirmed' },
                  { id: 'checked-in', label: 'Checked In' },
                  { id: 'completed', label: 'Completed' },
                ].map((tab) => {
                  const isActive = scheduleFilter === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setScheduleFilter(tab.id)}
                      style={{
                        padding: '5px 12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        borderRadius: '7px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        backgroundColor: isActive ? '#FFFFFF' : 'transparent',
                        color: isActive ? '#0F172A' : '#64748B',
                        boxShadow: isActive ? '0 1px 2px rgba(0,0,0,0.06)' : 'none'
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <Link
                to="/staff/appointments"
                style={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#2563EB',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 10px',
                  borderRadius: '8px',
                  backgroundColor: '#EFF6FF'
                }}
              >
                <span>Manage All</span>
                <ArrowRight style={{ width: '14px', height: '14px' }} />
              </Link>
            </div>
          </div>

          {/* Schedule List Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '16px' }}>
            {filteredAppointments.length === 0 ? (
              <div style={{ padding: '36px', textAlign: 'center', color: '#94A3B8', fontSize: '13px', fontWeight: 500 }}>
                No appointments found for the selected filter.
              </div>
            ) : (
              filteredAppointments.map((apt) => {
                const isCheckedIn = apt.status === 'checked-in';
                const isCompleted = apt.status === 'completed';
                const isCancelled = apt.status === 'cancelled';
                const isConfirmed = apt.status === 'confirmed';

                return (
                  <div
                    key={apt.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      backgroundColor: isCheckedIn ? '#F0FDF4' : '#F8FAFC',
                      border: isCheckedIn ? '1px solid #BBF7D0' : '1px solid #E2E8F0',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {/* Patient & Doctor Details */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '240px' }}>
                      <Avatar name={apt.patientName} size="md" />
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                            {apt.patientName}
                          </span>
                          <span style={{ fontSize: '11px', fontWeight: 600, color: '#64748B', backgroundColor: 'white', padding: '1px 6px', borderRadius: '4px', border: '1px solid #CBD5E1' }}>
                            {apt.patientId || 'P001'}
                          </span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                          <span style={{ fontWeight: 600, color: '#334155' }}>{apt.doctorName}</span>
                          <span>&bull;</span>
                          <span style={{ color: '#0D9488', fontWeight: 600 }}>{apt.specialty}</span>
                          <span>&bull;</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', color: '#475569', fontWeight: 500 }}>
                            <DoorOpen style={{ width: '12px', height: '12px', color: '#94A3B8' }} />
                            Room {apt.room || '301'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Time, Status & Context Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#334155',
                          backgroundColor: 'white',
                          padding: '4px 10px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px'
                        }}
                      >
                        <Clock style={{ width: '13px', height: '13px', color: '#94A3B8' }} />
                        {apt.time}
                      </span>

                      {/* Status pill */}
                      {isCheckedIn ? (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '16px',
                            backgroundColor: '#DCFCE7',
                            color: '#166534',
                            border: '1px solid #86EFAC',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <CheckCircle2 style={{ width: '12px', height: '12px' }} />
                          In Queue
                        </span>
                      ) : isCompleted ? (
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            padding: '3px 10px',
                            borderRadius: '16px',
                            backgroundColor: '#F1F5F9',
                            color: '#475569',
                            border: '1px solid #CBD5E1'
                          }}
                        >
                          Completed
                        </span>
                      ) : (
                        <Badge variant={isConfirmed ? 'success' : 'warning'} dot>
                          {apt.status}
                        </Badge>
                      )}

                      {/* 1-Click Check In button ONLY if confirmed/pending */}
                      {isConfirmed && (
                        <button
                          onClick={() => handleCheckIn(apt.id, apt.patientName)}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '8px',
                            backgroundColor: '#2563EB',
                            color: 'white',
                            fontSize: '11px',
                            fontWeight: 700,
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            transition: 'background-color 0.15s ease'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
                        >
                          <UserCheck style={{ width: '13px', height: '13px' }} />
                          <span>Check In</span>
                        </button>
                      )}

                      <button
                        onClick={() => setSelectedPatientModal(apt)}
                        style={{
                          padding: '5px 10px',
                          borderRadius: '8px',
                          backgroundColor: 'white',
                          color: '#475569',
                          fontSize: '11px',
                          fontWeight: 600,
                          border: '1px solid #CBD5E1',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                      >
                        Info
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Side: Department Traffic */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
            padding: '22px 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '16px'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Department Traffic
              </h2>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  border: '1px solid #A7F3D0'
                }}
              >
                Live Status
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
              Patient volume breakdown across clinic departments
            </p>

            {/* Donut Chart with Center KPI */}
            <div style={{ position: 'relative', width: '100%', height: '170px', marginTop: '10px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={2} stroke="#ffffff" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderRadius: '8px',
                      color: 'white',
                      border: 'none',
                      fontSize: '12px',
                      padding: '8px 12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}
              >
                <span style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>{totalDepartmentPatients}</span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>Patients</span>
              </div>
            </div>

            {/* Progress Bars for Departments */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
              {departmentData.map((d) => (
                <div key={d.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: d.color }} />
                      <span style={{ fontWeight: 600, color: '#334155' }}>{d.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 800, color: '#0F172A' }}>{d.value}</span>
                      <span style={{ color: '#94A3B8', fontSize: '11px' }}>({d.percentage}%)</span>
                    </div>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '3px', overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${d.percentage * 2}%`,
                        height: '100%',
                        backgroundColor: d.color,
                        borderRadius: '3px',
                        transition: 'width 0.4s ease'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              paddingTop: '12px',
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#64748B'
            }}
          >
            <span>Hospital OPD Capacity: <strong style={{ color: '#0F172A' }}>68%</strong></span>
            <Link to="/staff/queue" style={{ color: '#2563EB', fontWeight: 700, textDecoration: 'none' }}>
              Manage Queues &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Check-In Modal */}
      <Modal
        isOpen={checkInModalOpen}
        onClose={() => setCheckInModalOpen(false)}
        title="Quick Patient Check-In"
        size="md"
      >
        <form onSubmit={handleManualCheckInSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
            Register and allocate a walk-in patient directly to a department waiting queue.
          </p>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Patient Full Name
            </label>
            <input
              type="text"
              required
              value={quickName}
              onChange={(e) => setQuickName(e.target.value)}
              placeholder="e.g. David Miller"
              style={{
                width: '100%',
                padding: '10px 14px',
                fontSize: '13px',
                border: '1px solid #CBD5E1',
                borderRadius: '10px',
                outline: 'none',
                color: '#0F172A',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Department
              </label>
              <select
                value={quickDept}
                onChange={(e) => setQuickDept(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  backgroundColor: 'white',
                  color: '#0F172A',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Neurology">Neurology</option>
                <option value="Dermatology">Dermatology</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Attending Doctor
              </label>
              <select
                value={quickDoctor}
                onChange={(e) => setQuickDoctor(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  fontSize: '13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  backgroundColor: 'white',
                  color: '#0F172A',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="Dr. Michael Chen">Dr. Michael Chen</option>
                <option value="Dr. Sarah Patel">Dr. Sarah Patel</option>
                <option value="Dr. James Rodriguez">Dr. James Rodriguez</option>
                <option value="Dr. Emily Watson">Dr. Emily Watson</option>
                <option value="Dr. Lisa Kim">Dr. Lisa Kim</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
            <Button variant="outline" type="button" onClick={() => setCheckInModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" icon={UserCheck}>
              Confirm & Enqueue
            </Button>
          </div>
        </form>
      </Modal>

      {/* Patient Info Modal */}
      {selectedPatientModal && (
        <Modal
          isOpen={!!selectedPatientModal}
          onClose={() => setSelectedPatientModal(null)}
          title={`Appointment Details - ${selectedPatientModal.patientName}`}
          size="md"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0'
              }}
            >
              <Avatar name={selectedPatientModal.patientName} size="lg" />
              <div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', display: 'block' }}>
                  {selectedPatientModal.patientName}
                </span>
                <span style={{ fontSize: '12px', color: '#64748B' }}>
                  Patient ID: {selectedPatientModal.patientId || 'P001'} &bull; Scheduled {selectedPatientModal.date}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Attending Doctor</span>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', display: 'block', marginTop: '4px' }}>{selectedPatientModal.doctorName}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#0D9488' }}>{selectedPatientModal.specialty}</span>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Time & Room</span>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', display: 'block', marginTop: '4px' }}>Room {selectedPatientModal.room || '301'}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>{selectedPatientModal.time}</span>
              </div>
            </div>

            {selectedPatientModal.notes && (
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', fontSize: '12px', color: '#1E3A8A' }}>
                <strong>Clinical Notes: </strong>
                {selectedPatientModal.notes}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
              <Button variant="outline" onClick={() => setSelectedPatientModal(null)}>
                Close
              </Button>
              {selectedPatientModal.status === 'confirmed' && (
                <Button
                  variant="primary"
                  icon={UserCheck}
                  onClick={() => {
                    handleCheckIn(selectedPatientModal.id, selectedPatientModal.patientName);
                    setSelectedPatientModal(null);
                  }}
                >
                  Check In Patient
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StaffDashboard;

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import {
  Plus,
  Search,
  Calendar,
  Clock,
  CheckCircle2,
  UserCheck,
  DoorOpen,
  Eye
} from 'lucide-react';
import { mockAppointments, mockDoctors } from '../../data/mockData';

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  if (!year || !month || !day) return dateStr;
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month, 10) - 1]} ${parseInt(day, 10)}, ${year}`;
};

const StaffAppointments = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // New Appointment Form State
  const [formPatientName, setFormPatientName] = useState('');
  const [formDoctor, setFormDoctor] = useState(mockDoctors[0]?.name || 'Dr. Michael Chen');
  const [formSpecialty, setFormSpecialty] = useState(mockDoctors[0]?.specialty || 'Cardiology');
  const [formDate, setFormDate] = useState('2026-10-22');
  const [formTime, setFormTime] = useState('10:00 AM');
  const [formType, setFormType] = useState('Check-up');
  const [formRoom, setFormRoom] = useState('301');
  const [formNotes, setFormNotes] = useState('');

  const statusColors = {
    confirmed: 'success',
    pending: 'warning',
    cancelled: 'danger',
    completed: 'info',
    'checked-in': 'success'
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCheckIn = (apt) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === apt.id ? { ...a, status: 'checked-in' } : a))
    );
    showToast(`Checked in ${apt.patientName}! Patient sent to active queue.`);
  };

  const handleCreateAppointment = (e) => {
    e.preventDefault();
    if (!formPatientName.trim()) return;

    const newApt = {
      id: String(Date.now()),
      patientName: formPatientName.trim(),
      patientId: `P00${Math.floor(Math.random() * 89) + 10}`,
      doctorName: formDoctor,
      doctorId: '1',
      specialty: formSpecialty,
      date: formDate,
      time: formTime,
      status: 'confirmed',
      type: formType,
      notes: formNotes || 'Hospital booking via Front Desk staff',
      room: formRoom || '101'
    };

    setAppointments([newApt, ...appointments]);
    setIsScheduleModalOpen(false);
    setFormPatientName('');
    setFormNotes('');
    showToast(`Scheduled appointment for ${newApt.patientName} on ${formatDisplayDate(formDate)}!`);
  };

  const filtered = appointments.filter((a) => {
    const matchesFilter = filter === 'all' || a.status === filter;
    const matchesDept = departmentFilter === 'all' || a.specialty === departmentFilter;
    const matchesSearch =
      !searchTerm ||
      a.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (a.room && a.room.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesDept && matchesSearch;
  });

  const columns = [
    {
      key: 'patientName',
      label: 'Patient',
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar name={val} size="sm" />
          <div>
            <span style={{ fontWeight: 800, color: '#0F172A', display: 'block', fontSize: '13px' }}>{val}</span>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>{row.patientId || 'P001'}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'doctorName',
      label: 'Doctor & Department',
      render: (val, row) => (
        <div>
          <span style={{ fontWeight: 700, color: '#1E293B', display: 'block', fontSize: '13px' }}>{val}</span>
          <span style={{ fontSize: '11px', color: '#0D9488', fontWeight: 700 }}>{row.specialty}</span>
        </div>
      ),
    },
    {
      key: 'date',
      label: 'Date & Time',
      render: (val, row) => (
        <div>
          <span style={{ fontWeight: 800, color: '#0F172A', display: 'block', fontSize: '12px' }}>{formatDisplayDate(val)}</span>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
            <Clock style={{ width: '12px', height: '12px', color: '#94A3B8' }} />
            {row.time}
          </span>
        </div>
      ),
    },
    {
      key: 'type',
      label: 'Visit Type',
      render: (val) => (
        <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', backgroundColor: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' }}>
          {val}
        </span>
      ),
    },
    {
      key: 'room',
      label: 'Room',
      render: (val) => (
        <span style={{ fontSize: '11px', fontWeight: 700, color: '#334155', backgroundColor: '#FFFFFF', padding: '3px 8px', borderRadius: '6px', border: '1px solid #CBD5E1', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <DoorOpen style={{ width: '12px', height: '12px', color: '#94A3B8' }} />
          Room {val || '301'}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <Badge variant={statusColors[val] || 'default'} dot>
          {val === 'checked-in' ? 'Checked In' : val}
        </Badge>
      ),
    },
    {
      key: 'actions',
      label: 'Action',
      sortable: false,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {row.status === 'confirmed' && (
            <button
              onClick={() => handleCheckIn(row)}
              style={{
                padding: '5px 10px',
                fontSize: '11px',
                fontWeight: 700,
                borderRadius: '8px',
                backgroundColor: '#2563EB',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                boxShadow: '0 1px 2px rgba(37,99,235,0.2)'
              }}
              title="Fast Check In"
            >
              <UserCheck style={{ width: '13px', height: '13px' }} />
              <span>Check In</span>
            </button>
          )}

          <button
            onClick={() => setSelectedAppointment(row)}
            style={{
              padding: '6px',
              borderRadius: '8px',
              backgroundColor: '#F1F5F9',
              color: '#475569',
              border: '1px solid #E2E8F0',
              cursor: 'pointer'
            }}
            title="View Details"
          >
            <Eye style={{ width: '13px', height: '13px' }} />
          </button>
        </div>
      ),
    },
  ];

  // Count metrics
  const totalCount = appointments.length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const pendingCount = appointments.filter((a) => a.status === 'pending').length;
  const checkedInCount = appointments.filter((a) => a.status === 'checked-in').length;
  const cancelledCount = appointments.filter((a) => a.status === 'cancelled').length;

  const filters = [
    { id: 'all', label: 'All', count: totalCount },
    { id: 'confirmed', label: 'Confirmed', count: confirmedCount },
    { id: 'checked-in', label: 'Checked In', count: checkedInCount },
    { id: 'pending', label: 'Pending', count: pendingCount },
    { id: 'cancelled', label: 'Cancelled', count: cancelledCount },
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
              Hospital Appointments
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
                backgroundColor: '#EFF6FF',
                color: '#2563EB',
                border: '1px solid #BFDBFE'
              }}
            >
              Master Schedule
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Manage hospital-wide appointment schedules, room allotments, and fast patient check-in.
          </p>
        </div>

        <button
          onClick={() => setIsScheduleModalOpen(true)}
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
          <Plus style={{ width: '16px', height: '16px' }} />
          <span>Schedule Appointment</span>
        </button>
      </div>

      {/* 4 Quick Status Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Total Bookings</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A' }}>{totalCount}</span>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>scheduled</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #BBF7D0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#047857', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Confirmed</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#047857' }}>{confirmedCount}</span>
            <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>ready for visit</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #BFDBFE', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#1E40AF', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Checked In</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#1E40AF' }}>{checkedInCount}</span>
            <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600 }}>in clinic</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #FDE68A', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#B45309', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Pending / Cancelled</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#B45309' }}>{pendingCount + cancelledCount}</span>
            <span style={{ fontSize: '12px', color: '#D97706', fontWeight: 600 }}>actions needed</span>
          </div>
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
        {/* Segmented Filter Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto' }}>
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  backgroundColor: active ? '#2563EB' : '#F1F5F9',
                  color: active ? '#FFFFFF' : '#475569',
                  boxShadow: active ? '0 1px 2px rgba(37,99,235,0.2)' : 'none'
                }}
              >
                <span>{f.label}</span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '1px 6px',
                    borderRadius: '10px',
                    backgroundColor: active ? '#1D4ED8' : '#E2E8F0',
                    color: active ? '#FFFFFF' : '#475569'
                  }}
                >
                  {f.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Specialty Selector & Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
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
            <option value="all">All Specialties</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Dermatology">Dermatology</option>
          </select>

          <div style={{ position: 'relative', width: '240px' }}>
            <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#94A3B8' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patient, doctor, room..."
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
          data={filtered}
          searchable={false}
          emptyMessage="No appointments found matching your search or filters."
        />
      </div>

      {/* Schedule Appointment Modal */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Schedule Hospital Appointment"
        size="md"
      >
        <form onSubmit={handleCreateAppointment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
            Book a clinic consultation slot for an arriving or scheduled patient.
          </p>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Patient Full Name
            </label>
            <input
              type="text"
              required
              value={formPatientName}
              onChange={(e) => setFormPatientName(e.target.value)}
              placeholder="e.g. Katherine Pierce"
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
                Specialty / Department
              </label>
              <select
                value={formSpecialty}
                onChange={(e) => {
                  setFormSpecialty(e.target.value);
                  const matchingDoc = mockDoctors.find((d) => d.specialty === e.target.value);
                  if (matchingDoc) setFormDoctor(matchingDoc.name);
                }}
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
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Dermatology">Dermatology</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Consulting Doctor
              </label>
              <select
                value={formDoctor}
                onChange={(e) => setFormDoctor(e.target.value)}
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
                {mockDoctors.map((doc) => (
                  <option key={doc.id} value={doc.name}>
                    {doc.name} ({doc.specialty})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Date</label>
              <input
                type="date"
                required
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 10px',
                  fontSize: '12px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  outline: 'none',
                  color: '#0F172A',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Time Slot</label>
              <select
                value={formTime}
                onChange={(e) => setFormTime(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 10px',
                  fontSize: '12px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  backgroundColor: 'white',
                  color: '#0F172A',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              >
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="1:30 PM">1:30 PM</option>
                <option value="2:30 PM">2:30 PM</option>
                <option value="3:30 PM">3:30 PM</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>Room</label>
              <input
                type="text"
                value={formRoom}
                onChange={(e) => setFormRoom(e.target.value)}
                placeholder="e.g. 301"
                style={{
                  width: '100%',
                  padding: '9px 10px',
                  fontSize: '12px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '10px',
                  outline: 'none',
                  color: '#0F172A',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
            <Button variant="outline" type="button" onClick={() => setIsScheduleModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" icon={Plus}>
              Confirm Appointment
            </Button>
          </div>
        </form>
      </Modal>

      {/* Appointment Detail Modal */}
      {selectedAppointment && (
        <Modal
          isOpen={!!selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
          title={`Appointment Details - ${selectedAppointment.patientName}`}
          size="md"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <Avatar name={selectedAppointment.patientName} size="lg" />
              <div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', display: 'block' }}>{selectedAppointment.patientName}</span>
                <span style={{ fontSize: '12px', color: '#64748B' }}>
                  Patient ID: {selectedAppointment.patientId || 'P001'} &bull; Scheduled {formatDisplayDate(selectedAppointment.date)}
                </span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Assigned Doctor</span>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', display: 'block', marginTop: '4px' }}>{selectedAppointment.doctorName}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#0D9488' }}>{selectedAppointment.specialty}</span>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Schedule & Room</span>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', display: 'block', marginTop: '4px' }}>{selectedAppointment.time}</span>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B' }}>Room {selectedAppointment.room || '301'}</span>
              </div>
            </div>

            {selectedAppointment.notes && (
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', fontSize: '12px', color: '#1E3A8A' }}>
                <strong>Clinical Notes: </strong>
                {selectedAppointment.notes}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px', borderTop: '1px solid #F1F5F9' }}>
              <Button variant="outline" onClick={() => setSelectedAppointment(null)}>
                Close
              </Button>
              {selectedAppointment.status === 'confirmed' && (
                <Button
                  variant="primary"
                  icon={UserCheck}
                  onClick={() => {
                    handleCheckIn(selectedAppointment);
                    setSelectedAppointment(null);
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

export default StaffAppointments;

import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Plus, Search, CheckCircle2, Ban } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';
import { mockAppointments, mockDoctors } from '../../data/mockData';
import { useNotificationStore } from '../../stores/notificationStore';

const PatientAppointments = () => {
  const location = useLocation();
  const [appointmentsList, setAppointmentsList] = useState(mockAppointments);
  const [showBooking, setShowBooking] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [cancelSuccessMsg, setCancelSuccessMsg] = useState('');

  // Form Fields State
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00 AM');
  const [bookingType, setBookingType] = useState('Check-up');
  const [bookingNotes, setBookingNotes] = useState('');

  // Check if routed from Doctor card / Doctor Profile modal
  useEffect(() => {
    if (location.state?.openBooking) {
      if (location.state.doctorId) {
        setSelectedDoctorId(location.state.doctorId);
      }
      setShowBooking(true);
    }
  }, [location.state]);

  const patientAppts = appointmentsList.filter((a) => a.patientId === 'P001' || !a.patientId);

  const filtered = patientAppts.filter((a) => {
    const matchesFilter = filter === 'all' || a.status === filter;
    const matchesSearch = !searchTerm || 
      a.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.type.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const statusColors = { 
    confirmed: 'success', 
    pending: 'warning', 
    cancelled: 'danger', 
    completed: 'info' 
  };

  const handleCancelAppointment = (apptId, doctorName) => {
    setAppointmentsList((prev) =>
      prev.map((a) => (a.id === apptId ? { ...a, status: 'cancelled' } : a))
    );
    setCancelSuccessMsg(`Appointment with ${doctorName || 'Doctor'} has been cancelled.`);
    setTimeout(() => setCancelSuccessMsg(''), 4000);
  };

  const columns = [
    { 
      key: 'doctorName', 
      label: 'DOCTOR',
      render: (val, row) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '14px', lineHeight: '1.3' }}>{val}</span>
          <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600, lineHeight: '1.3' }}>{row.specialty}</span>
        </div>
      )
    },
    { 
      key: 'date', 
      label: 'DATE', 
      render: (val) => <span style={{ fontWeight: 600, color: '#0F172A', fontSize: '13px' }}>{val}</span> 
    },
    { 
      key: 'time', 
      label: 'TIME', 
      render: (val) => <span style={{ color: '#475569', fontWeight: 600, fontSize: '13px' }}>{val}</span> 
    },
    { 
      key: 'type', 
      label: 'APPOINTMENT TYPE', 
      render: (val) => (
        <span style={{
          display: 'inline-flex', alignItems: 'center', padding: '5px 12px',
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
      render: (val) => <Badge variant={statusColors[val] || 'default'} dot>{val}</Badge>,
    },
    {
      key: 'actions',
      label: 'ACTION',
      sortable: false,
      render: (_, row) => (
        row.status !== 'cancelled' && row.status !== 'completed' ? (
          <button
            onClick={() => handleCancelAppointment(row.id, row.doctorName)}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700,
              backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid #FCA5A5',
              cursor: 'pointer', transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FEE2E2'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#FEF2F2'; }}
          >
            <Ban size={13} />
            Cancel
          </button>
        ) : (
          <span style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500, fontStyle: 'italic' }}>
            {row.status === 'completed' ? 'Completed' : 'Cancelled'}
          </span>
        )
      )
    }
  ];

  const filters = [
    { id: 'all', label: 'All Appointments' },
    { id: 'confirmed', label: 'Confirmed' },
    { id: 'pending', label: 'Pending' },
    { id: 'completed', label: 'Completed' },
    { id: 'cancelled', label: 'Cancelled' },
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    const doctorObj = mockDoctors.find((d) => d.id === selectedDoctorId) || mockDoctors[0];
    const todayStr = new Date().toISOString().split('T')[0];

    const newAppointment = {
      id: `A${Date.now()}`,
      patientId: 'P001',
      patientName: 'Sarah Johnson',
      doctorId: doctorObj.id,
      doctorName: doctorObj.name,
      specialty: doctorObj.specialty,
      date: bookingDate || todayStr,
      time: bookingTime || '10:00 AM',
      type: bookingType || 'Check-up',
      status: 'pending',
      room: doctorObj.room || '101'
    };

    // Add new appointment at top of state list
    setAppointmentsList((prev) => [newAppointment, ...prev]);

    // Push notification to store
    if (useNotificationStore.getState().notifications) {
      useNotificationStore.setState((state) => ({
        notifications: [
          {
            id: `N${Date.now()}`,
            title: 'Appointment Request Submitted',
            message: `Your appointment request with ${doctorObj.name} (${newAppointment.type}) on ${newAppointment.date} at ${newAppointment.time} is pending confirmation.`,
            type: 'info',
            read: false,
            createdAt: new Date().toISOString()
          },
          ...state.notifications
        ],
        unreadCount: state.unreadCount + 1
      }));
    }

    // Switch view to 'all' so new item is immediately visible
    setFilter('all');
    setShowBooking(false);
    setBookingSuccess(true);

    // Reset Form Fields
    setSelectedDoctorId('');
    setBookingDate('');
    setBookingNotes('');
    setBookingTime('10:00 AM');
    setBookingType('Check-up');

    setTimeout(() => setBookingSuccess(false), 5000);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }} className="space-y-6">
      
      {/* Page Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '8px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
            Appointments
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0', fontWeight: 500 }}>
            Manage your upcoming doctor visits, history, and bookings
          </p>
        </div>
        <button
          onClick={() => setShowBooking(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', borderRadius: '12px', border: 'none',
            backgroundColor: '#2563EB', color: 'white', fontSize: '13px', fontWeight: 700,
            cursor: 'pointer', boxShadow: '0 2px 6px rgba(37,99,235,0.3)',
            whiteSpace: 'nowrap', transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
        >
          <Plus size={16} />
          Book Appointment
        </button>
      </div>

      {/* Booking Success Alert */}
      {bookingSuccess && (
        <div style={{
          backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46',
          padding: '14px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px',
          fontSize: '14px', fontWeight: 600, boxShadow: '0 2px 6px rgba(5,150,105,0.1)'
        }}>
          <CheckCircle2 size={20} style={{ color: '#059669', flexShrink: 0 }} />
          <span>Appointment request submitted successfully! Your booking now appears at the top of the table as <strong>Pending</strong>.</span>
        </div>
      )}

      {/* Cancel Alert Banner */}
      {cancelSuccessMsg && (
        <div style={{
          backgroundColor: '#FEF2F2', border: '1px solid #FCA5A5', color: '#991B1B',
          padding: '14px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px',
          fontSize: '14px', fontWeight: 600, boxShadow: '0 2px 6px rgba(220,38,38,0.1)'
        }}>
          <Ban size={20} style={{ color: '#DC2626', flexShrink: 0 }} />
          <span>{cancelSuccessMsg}</span>
        </div>
      )}

      {/* FILTER TABS & SEARCH TOOLBAR CARD */}
      <div style={{
        backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0',
        padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px'
      }}>
        
        {/* Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '2px' }}>
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                style={{
                  padding: '8px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                  border: active ? '1px solid #2563EB' : '1px solid #E2E8F0',
                  backgroundColor: active ? '#2563EB' : '#F8FAFC',
                  color: active ? 'white' : '#475569',
                  cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s ease',
                  boxShadow: active ? '0 2px 6px rgba(37,99,235,0.25)' : 'none'
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Search Box */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94A3B8' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctor, specialty..."
            style={{
              width: '100%', padding: '9px 14px 9px 36px', fontSize: '13px',
              backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px',
              outline: 'none', transition: 'all 0.15s', color: '#0F172A'
            }}
            onFocus={(e) => { e.target.style.borderColor = '#2563EB'; e.target.style.backgroundColor = 'white'; }}
            onBlur={(e) => { e.target.style.borderColor = '#CBD5E1'; e.target.style.backgroundColor = '#F8FAFC'; }}
          />
        </div>

      </div>

      {/* APPOINTMENTS DATA TABLE CARD */}
      <div style={{
        backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0',
        padding: '0', boxShadow: '0 1px 3px rgba(0,0,0,0.04)', overflow: 'hidden'
      }}>
        <DataTable 
          columns={columns} 
          data={filtered} 
          searchable={false}
          emptyMessage="No appointments match your filter."
        />
      </div>

      {/* BOOKING MODAL */}
      <Modal
        isOpen={showBooking}
        onClose={() => setShowBooking(false)}
        title="Book New Appointment"
        size="lg"
        footer={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', width: '100%' }}>
            <button
              type="button"
              onClick={() => setShowBooking(false)}
              style={{
                padding: '9px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                backgroundColor: 'white', color: '#475569', border: '1px solid #CBD5E1', cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="booking-form"
              style={{
                padding: '9px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 700,
                backgroundColor: '#2563EB', color: 'white', border: 'none', cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(37,99,235,0.25)'
              }}
            >
              Confirm Booking
            </button>
          </div>
        }
      >
        <form id="booking-form" onSubmit={handleBookingSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              Select Doctor
            </label>
            <select
              required
              value={selectedDoctorId}
              onChange={(e) => setSelectedDoctorId(e.target.value)}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '13px',
                border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', color: '#0F172A', outline: 'none'
              }}
            >
              <option value="">Choose a specialist...</option>
              {mockDoctors.map((d) => (
                <option key={d.id} value={d.id}>{d.name} &bull; {d.specialty}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                Preferred Date
              </label>
              <input
                type="date"
                required
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '13px',
                  border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', color: '#0F172A', outline: 'none'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
                Time Slot
              </label>
              <select
                required
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                style={{
                  width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '13px',
                  border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', color: '#0F172A', outline: 'none'
                }}
              >
                {['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              Appointment Type
            </label>
            <select
              required
              value={bookingType}
              onChange={(e) => setBookingType(e.target.value)}
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '13px',
                border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', color: '#0F172A', outline: 'none'
              }}
            >
              {['Check-up', 'Consultation', 'Follow-up', 'Emergency', 'Vaccination'].map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '6px' }}>
              Reason for Visit / Symptoms
            </label>
            <textarea
              rows={3}
              value={bookingNotes}
              onChange={(e) => setBookingNotes(e.target.value)}
              placeholder="Describe your symptoms or reason for visit..."
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '10px', fontSize: '13px',
                border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC', color: '#0F172A', outline: 'none',
                resize: 'none', fontFamily: 'inherit'
              }}
            />
          </div>

        </form>
      </Modal>
    </div>
  );
};

export default PatientAppointments;

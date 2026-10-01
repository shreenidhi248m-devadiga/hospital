import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp,
  ArrowDown,
  UserPlus,
  RefreshCw,
  Clock,
  Users,
  CheckCircle2,
  Search,
  Building2,
  Stethoscope,
  DoorOpen,
  Volume2,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { mockQueue, mockDoctors } from '../../data/mockData';

const StaffQueue = () => {
  const [queueList, setQueueList] = useState(mockQueue);
  const [activeDepartment, setActiveDepartment] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Form State for Add to Queue Modal
  const [newPatientName, setNewPatientName] = useState('');
  const [newDoctorName, setNewDoctorName] = useState('Dr. Michael Chen');
  const [newDepartment, setNewDepartment] = useState('Cardiology');
  const [newVisitType, setNewVisitType] = useState('Consultation');
  const [isUrgent, setIsUrgent] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Reorder patient priority
  const movePriority = (queueId, direction) => {
    const item = queueList.find((q) => q.id === queueId);
    if (!item) return;

    const deptItems = queueList.filter((q) => q.department === item.department);
    const itemIndex = deptItems.findIndex((q) => q.id === queueId);
    const targetIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;

    if (targetIndex < 0 || targetIndex >= deptItems.length) return;

    const swapItem = deptItems[targetIndex];

    setQueueList((prev) =>
      prev.map((q) => {
        if (q.id === item.id) return { ...q, position: swapItem.position };
        if (q.id === swapItem.id) return { ...q, position: item.position };
        return q;
      })
    );

    showToast(`Updated queue priority for ${item.patientName}`);
  };

  // Call patient in or mark done
  const handleStatusChange = (queueId, newStatus) => {
    const patient = queueList.find((q) => q.id === queueId);
    setQueueList((prev) =>
      prev.map((q) => (q.id === queueId ? { ...q, status: newStatus } : q))
    );

    if (newStatus === 'in-progress') {
      showToast(`Called ${patient?.patientName} into consultation room!`);
    } else if (newStatus === 'completed') {
      showToast(`Completed consultation for ${patient?.patientName}`);
    }
  };

  // Add new patient to queue
  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!newPatientName.trim()) return;

    const deptQueue = queueList.filter((q) => q.department === newDepartment);
    const newEntry = {
      id: `Q${Date.now()}`,
      patientId: `P${Math.floor(Math.random() * 899) + 100}`,
      patientName: newPatientName.trim(),
      doctorName: newDoctorName,
      doctorId: '1',
      position: deptQueue.length + 1,
      status: isUrgent ? 'in-progress' : 'waiting',
      estimatedTime: 'Now',
      department: newDepartment,
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: newVisitType,
      room: newDepartment === 'Cardiology' ? '301' : newDepartment === 'Orthopedics' ? '410' : '205'
    };

    setQueueList([newEntry, ...queueList]);
    setIsAddModalOpen(false);
    setNewPatientName('');
    setIsUrgent(false);
    showToast(`Enqueued ${newEntry.patientName} in ${newDepartment}!`);
  };

  const departments = ['Cardiology', 'Orthopedics', 'Pediatrics', 'Dermatology'];

  const filteredQueue = queueList.filter((q) => {
    const matchesDept = activeDepartment === 'all' || q.department === activeDepartment;
    const matchesSearch =
      !searchQuery ||
      q.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const waitingCount = queueList.filter((q) => q.status === 'waiting').length;
  const inProgressCount = queueList.filter((q) => q.status === 'in-progress').length;

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

      {/* Header Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
              Queue Management
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
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
              Live Clinic Monitor
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Real-time patient flow, room calls, and multi-department priority control.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => showToast('Queue synced with terminal stations.')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              fontSize: '12px',
              fontWeight: 700,
              border: '1px solid #CBD5E1',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
          >
            <RefreshCw style={{ width: '14px', height: '14px' }} />
            <span>Refresh</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '10px',
              backgroundColor: '#2563EB',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(37, 99, 235, 0.25)',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          >
            <UserPlus style={{ width: '15px', height: '15px' }} />
            <span>Add to Queue</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Total In Queue
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A' }}>{queueList.length}</span>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>patients listed</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #BBF7D0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#047857', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            In Consultation
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#047857' }}>{inProgressCount}</span>
            <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>with doctors now</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #FDE68A', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#B45309', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Waiting in Lobby
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#B45309' }}>{waitingCount}</span>
            <span style={{ fontSize: '12px', color: '#D97706', fontWeight: 600 }}>awaiting call</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Avg Waiting Duration
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A' }}>14m</span>
            <span style={{ fontSize: '12px', color: '#10B981', fontWeight: 700 }}>&darr; 2m faster</span>
          </div>
        </div>
      </div>

      {/* Control Toolbar: Department Filters & Search */}
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
        {/* Department Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto' }}>
          <button
            onClick={() => setActiveDepartment('all')}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              backgroundColor: activeDepartment === 'all' ? '#2563EB' : '#F1F5F9',
              color: activeDepartment === 'all' ? '#FFFFFF' : '#475569',
              boxShadow: activeDepartment === 'all' ? '0 1px 2px rgba(37,99,235,0.2)' : 'none'
            }}
          >
            All Departments ({queueList.length})
          </button>
          {departments.map((dept) => {
            const count = queueList.filter((q) => q.department === dept).length;
            const isActive = activeDepartment === dept;
            return (
              <button
                key={dept}
                onClick={() => setActiveDepartment(dept)}
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
                  backgroundColor: isActive ? '#2563EB' : '#F1F5F9',
                  color: isActive ? '#FFFFFF' : '#475569',
                  boxShadow: isActive ? '0 1px 2px rgba(37,99,235,0.2)' : 'none'
                }}
              >
                <span>{dept}</span>
                <span
                  style={{
                    fontSize: '10px',
                    fontWeight: 800,
                    padding: '1px 6px',
                    borderRadius: '10px',
                    backgroundColor: isActive ? '#1D4ED8' : '#E2E8F0',
                    color: isActive ? '#FFFFFF' : '#475569'
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', width: '260px' }}>
          <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#94A3B8' }} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patient, doctor..."
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

      {/* Department Queues */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {(activeDepartment === 'all' ? departments : [activeDepartment]).map((dept) => {
          const deptItems = filteredQueue
            .filter((q) => q.department === dept)
            .sort((a, b) => a.position - b.position);

          if (deptItems.length === 0 && activeDepartment === dept) {
            return (
              <div
                key={dept}
                style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '36px',
                  textAlign: 'center',
                  color: '#94A3B8',
                  fontSize: '13px',
                  fontWeight: 500
                }}
              >
                No patients currently in {dept} queue.
              </div>
            );
          }

          if (deptItems.length === 0) return null;

          const activeCount = deptItems.filter((q) => q.status === 'in-progress').length;
          const waitingInDept = deptItems.filter((q) => q.status === 'waiting').length;

          return (
            <div
              key={dept}
              style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.03)',
                padding: '20px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              {/* Department Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #F1F5F9'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '34px',
                      height: '34px',
                      borderRadius: '10px',
                      backgroundColor: '#EFF6FF',
                      color: '#2563EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800
                    }}
                  >
                    <Building2 style={{ width: '18px', height: '18px' }} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      {dept}
                    </h2>
                    <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#64748B' }}>
                      {activeCount} active in consultation &bull; {waitingInDept} waiting in line
                    </p>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '3px 10px',
                    borderRadius: '12px',
                    backgroundColor: '#EFF6FF',
                    color: '#1E40AF',
                    border: '1px solid #BFDBFE'
                  }}
                >
                  {deptItems.length} in queue
                </span>
              </div>

              {/* Patient Queue Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {deptItems.map((q, idx) => {
                  const isInProgress = q.status === 'in-progress';

                  return (
                    <motion.div
                      key={q.id}
                      layout
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '12px',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        backgroundColor: isInProgress ? '#F0FDF4' : '#F8FAFC',
                        border: isInProgress ? '1px solid #86EFAC' : '1px solid #E2E8F0',
                        boxShadow: isInProgress ? '0 1px 3px rgba(16, 185, 129, 0.1)' : 'none',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {/* Left: Position Badge, Avatar, Patient & Doctor */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '260px' }}>
                        <div
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: 900,
                            flexShrink: 0,
                            backgroundColor: isInProgress ? '#10B981' : '#FFFFFF',
                            color: isInProgress ? '#FFFFFF' : '#334155',
                            border: isInProgress ? 'none' : '1px solid #CBD5E1',
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                          }}
                        >
                          {q.position}
                        </div>

                        <Avatar name={q.patientName} size="md" />

                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                              {q.patientName}
                            </span>
                            <span
                              style={{
                                fontSize: '10px',
                                fontWeight: 600,
                                color: '#64748B',
                                backgroundColor: 'white',
                                padding: '1px 6px',
                                borderRadius: '4px',
                                border: '1px solid #CBD5E1'
                              }}
                            >
                              {q.patientId || 'P001'}
                            </span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                            <span style={{ fontWeight: 600, color: '#334155' }}>{q.doctorName}</span>
                            <span>&bull;</span>
                            <span style={{ color: '#2563EB', fontWeight: 600 }}>{q.type}</span>
                            <span>&bull;</span>
                            <span style={{ color: '#94A3B8' }}>In: {q.checkInTime || '9:30 AM'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Room, Status Pill, Call Button, Reordering */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 700,
                            color: '#475569',
                            backgroundColor: 'white',
                            padding: '4px 10px',
                            borderRadius: '8px',
                            border: '1px solid #CBD5E1',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          <DoorOpen style={{ width: '12px', height: '12px', color: '#94A3B8' }} />
                          Room {q.room || '301'}
                        </span>

                        {isInProgress ? (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '3px 10px',
                              borderRadius: '16px',
                              fontSize: '11px',
                              fontWeight: 700,
                              backgroundColor: '#DCFCE7',
                              color: '#166534',
                              border: '1px solid #86EFAC'
                            }}
                          >
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#16A34A' }} />
                            In Consultation
                          </span>
                        ) : (
                          <span
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              padding: '3px 10px',
                              borderRadius: '16px',
                              fontSize: '11px',
                              fontWeight: 700,
                              backgroundColor: '#FEF3C7',
                              color: '#92400E',
                              border: '1px solid #FDE68A'
                            }}
                          >
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D97706' }} />
                            Waiting
                          </span>
                        )}

                        {/* Action buttons */}
                        {isInProgress ? (
                          <button
                            onClick={() => handleStatusChange(q.id, 'completed')}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              backgroundColor: '#10B981',
                              color: 'white',
                              fontSize: '11px',
                              fontWeight: 700,
                              border: 'none',
                              cursor: 'pointer',
                              boxShadow: '0 1px 2px rgba(16, 185, 129, 0.2)'
                            }}
                          >
                            <CheckCircle2 style={{ width: '13px', height: '13px' }} />
                            <span>Done</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChange(q.id, 'in-progress')}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              backgroundColor: '#2563EB',
                              color: 'white',
                              fontSize: '11px',
                              fontWeight: 700,
                              border: 'none',
                              cursor: 'pointer',
                              boxShadow: '0 1px 2px rgba(37, 99, 235, 0.2)'
                            }}
                          >
                            <Volume2 style={{ width: '13px', height: '13px' }} />
                            <span>Call In</span>
                          </button>
                        )}

                        {/* Priority Reordering Buttons */}
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            border: '1px solid #CBD5E1',
                            padding: '2px'
                          }}
                        >
                          <button
                            disabled={idx === 0}
                            onClick={() => movePriority(q.id, 'up')}
                            style={{
                              padding: '4px 6px',
                              borderRadius: '5px',
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: idx === 0 ? '#CBD5E1' : '#475569',
                              cursor: idx === 0 ? 'not-allowed' : 'pointer'
                            }}
                            title="Move priority up"
                          >
                            <ArrowUp style={{ width: '13px', height: '13px' }} />
                          </button>
                          <button
                            disabled={idx === deptItems.length - 1}
                            onClick={() => movePriority(q.id, 'down')}
                            style={{
                              padding: '4px 6px',
                              borderRadius: '5px',
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: idx === deptItems.length - 1 ? '#CBD5E1' : '#475569',
                              cursor: idx === deptItems.length - 1 ? 'not-allowed' : 'pointer'
                            }}
                            title="Move priority down"
                          >
                            <ArrowDown style={{ width: '13px', height: '13px' }} />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Patient to Queue Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Patient to Active Queue"
        size="md"
      >
        <form onSubmit={handleAddPatient} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
            Enqueue an arriving patient for OPD consultation. A queue sequence token will be assigned immediately.
          </p>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
              Patient Full Name
            </label>
            <input
              type="text"
              required
              value={newPatientName}
              onChange={(e) => setNewPatientName(e.target.value)}
              placeholder="e.g. Robert Williams"
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
                value={newDepartment}
                onChange={(e) => setNewDepartment(e.target.value)}
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
                <option value="Dermatology">Dermatology</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Consulting Doctor
              </label>
              <select
                value={newDoctorName}
                onChange={(e) => setNewDoctorName(e.target.value)}
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Visit Type
              </label>
              <select
                value={newVisitType}
                onChange={(e) => setNewVisitType(e.target.value)}
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
                <option value="Consultation">General Consultation</option>
                <option value="Check-up">Routine Check-up</option>
                <option value="Follow-up">Post-Op Follow-up</option>
                <option value="Vaccination">Vaccination</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', paddingTop: '20px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 700, color: '#DC2626' }}>
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  style={{ width: '16px', height: '16px', accentColor: '#DC2626' }}
                />
                Mark as Urgent Priority
              </label>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '12px', borderTop: '1px solid #E2E8F0' }}>
            <Button variant="outline" type="button" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" icon={UserPlus}>
              Confirm & Enqueue
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StaffQueue;

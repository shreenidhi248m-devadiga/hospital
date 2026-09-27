import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, Clock, Users, CheckCircle2, Stethoscope, UserCheck } from 'lucide-react';
import { mockQueue } from '../../data/mockData';

const DoctorQueue = () => {
  const [queue, setQueue] = useState(mockQueue.filter((q) => q.doctorId === '1'));
  const currentPatient = queue.find((q) => q.status === 'in-progress');
  const waiting = queue.filter((q) => q.status === 'waiting');
  const completedCount = queue.filter((q) => q.status === 'completed').length + 5;

  const handleComplete = (id) => {
    setQueue(prev => prev.map(q => q.id === id ? { ...q, status: 'completed' } : q));
  };

  const handleCallNext = () => {
    if (waiting.length === 0) return;
    const nextPatient = waiting[0];
    setQueue(prev => prev.map(q => {
      if (q.status === 'in-progress') return { ...q, status: 'completed' };
      if (q.id === nextPatient.id) return { ...q, status: 'in-progress' };
      return q;
    }));
  };

  const handleCallSpecific = (id) => {
    setQueue(prev => prev.map(q => {
      if (q.status === 'in-progress') return { ...q, status: 'completed' };
      if (q.id === id) return { ...q, status: 'in-progress' };
      return q;
    }));
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }} className="space-y-6">
      
      {/* Title Header */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
          Patient Queue Management
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B', margin: '4px 0 0', fontWeight: 500 }}>
          Manage your live patient queue, call patients into consultation, and track wait times
        </p>
      </div>

      {/* Stats Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        
        {/* In Queue */}
        <div style={{ backgroundColor: 'white', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>In Waiting Queue</p>
              <p style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: '6px 0 0', letterSpacing: '-0.02em' }}>{waiting.length}</p>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#2563EB', margin: '4px 0 0' }}>• Patients in line</p>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Users style={{ width: '20px', height: '20px', color: '#2563EB' }} />
            </div>
          </div>
        </div>

        {/* Current Wait */}
        <div style={{ backgroundColor: 'white', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Current Avg Wait</p>
              <p style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: '6px 0 0', letterSpacing: '-0.02em' }}>~15 min</p>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#D97706', margin: '4px 0 0' }}>• Estimated wait time</p>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Clock style={{ width: '20px', height: '20px', color: '#D97706' }} />
            </div>
          </div>
        </div>

        {/* Seen Today */}
        <div style={{ backgroundColor: 'white', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>Seen Today</p>
              <p style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: '6px 0 0', letterSpacing: '-0.02em' }}>{completedCount}</p>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#059669', margin: '4px 0 0' }}>• Consultations completed</p>
            </div>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CheckCircle2 style={{ width: '20px', height: '20px', color: '#059669' }} />
            </div>
          </div>
        </div>

      </div>

      {/* Currently Seeing Patient Card */}
      {currentPatient ? (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '24px' }}>
          <div style={{
            backgroundColor: '#F0FDF4', borderRadius: '18px', border: '2px solid #10B981',
            padding: '24px', boxShadow: '0 4px 16px rgba(16, 185, 129, 0.12)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '5px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: 800,
                backgroundColor: '#DCFCE7', color: '#15803D', border: '1px solid #86EFAC'
              }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16A34A' }} />
                Currently Seeing Patient
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleComplete(currentPatient.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    padding: '9px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 800,
                    backgroundColor: '#059669', color: 'white', border: 'none', cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)', flexShrink: 0
                  }}
                >
                  <CheckCircle2 size={16} /> Complete Consultation
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{
                width: '54px', height: '54px', borderRadius: '16px',
                backgroundColor: '#10B981', color: 'white', fontWeight: 800, fontSize: '20px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>
                {currentPatient.patientName.charAt(0)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  {currentPatient.patientName}
                </h3>
                <p style={{ fontSize: '13px', color: '#475569', margin: '4px 0 0', fontWeight: 600 }}>
                  {currentPatient.type} &bull; Check-in Time: <strong style={{ color: '#0F172A' }}>{currentPatient.checkInTime}</strong> &bull; Department: <strong style={{ color: '#0F172A' }}>{currentPatient.department}</strong>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <div style={{
          backgroundColor: '#F8FAFC', borderRadius: '16px', border: '1px dashed #CBD5E1',
          padding: '24px', textAlign: 'center', marginBottom: '24px'
        }}>
          <p style={{ fontSize: '14px', color: '#64748B', fontWeight: 600, margin: 0 }}>
            No patient currently in consultation. Click "Call Next Patient" below to begin.
          </p>
        </div>
      )}

      {/* Waiting List Section */}
      <div style={{
        backgroundColor: 'white', borderRadius: '18px', border: '1px solid #E2E8F0',
        padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Patients Waiting ({waiting.length})
            </h2>
            <p style={{ fontSize: '13px', color: '#64748B', margin: '2px 0 0', fontWeight: 500 }}>
              Sequence of patients waiting in line for consultation
            </p>
          </div>
          {waiting.length > 0 && (
            <button
              onClick={handleCallNext}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '9px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 800,
                backgroundColor: '#2563EB', color: 'white', border: 'none', cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)', flexShrink: 0
              }}
            >
              <SkipForward size={16} /> Call Next Patient
            </button>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {waiting.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 20px', borderRadius: '14px', backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0', flexWrap: 'wrap', gap: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: '240px' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '12px',
                  backgroundColor: '#EFF6FF', color: '#2563EB', fontWeight: 800, fontSize: '15px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  #{q.position}
                </div>

                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px',
                  backgroundColor: '#E0F2FE', color: '#0369A1', fontWeight: 800, fontSize: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  {q.patientName.charAt(0)}
                </div>

                <div>
                  <p style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    {q.patientName}
                  </p>
                  <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0', fontWeight: 500 }}>
                    {q.type} &bull; Check-in: <strong style={{ color: '#0F172A' }}>{q.checkInTime}</strong>
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: 0 }}>{q.estimatedTime}</p>
                  <p style={{ fontSize: '11px', color: '#64748B', margin: '2px 0 0', fontWeight: 600 }}>Est. time</p>
                </div>
                <button
                  onClick={() => handleCallSpecific(q.id)}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '8px 16px', borderRadius: '10px', fontSize: '12.5px', fontWeight: 700,
                    backgroundColor: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE',
                    cursor: 'pointer', flexShrink: 0, transition: 'all 0.15s ease'
                  }}
                >
                  <UserCheck size={14} /> Call Patient
                </button>
              </div>
            </motion.div>
          ))}

          {waiting.length === 0 && (
            <div style={{ textAlign: 'center', padding: '36px', color: '#94A3B8', fontWeight: 600 }}>
              🎉 No patients waiting in queue!
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default DoctorQueue;

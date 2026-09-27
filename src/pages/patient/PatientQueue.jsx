import { motion } from 'framer-motion';
import { Clock, Users, CheckCircle2, AlertCircle, RefreshCw, UserCheck, Stethoscope } from 'lucide-react';
import { mockQueue } from '../../data/mockData';

const PatientQueue = () => {
  const myQueue = mockQueue.find((q) => q.patientId === 'P001');

  const timelineSteps = [
    { 
      step: 'Registration Checked In', 
      time: '9:45 AM', 
      status: 'completed', 
      desc: 'Registration & identity verified at main desk' 
    },
    { 
      step: 'Assigned to Doctor Queue', 
      time: '9:50 AM', 
      status: 'completed', 
      desc: 'Added to Dr. Michael Chen consultation queue' 
    },
    { 
      step: 'Active Consultation', 
      time: '~10:15 AM', 
      status: 'current', 
      desc: 'Estimated start time for patient consultation' 
    },
    { 
      step: 'Visit Summary & Discharge', 
      time: 'Pending', 
      status: 'upcoming', 
      desc: 'Prescription, lab notes & visit report summary' 
    },
  ];

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }} className="space-y-6">
      
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '8px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
            Queue Status Tracker
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0', fontWeight: 500 }}>
            Real-time tracking of your position in the patient queue
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '20px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE' }}>
          <RefreshCw size={14} className="animate-spin" style={{ color: '#2563EB' }} />
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#1D4ED8' }}>Live Queue Updates Active</span>
        </div>
      </div>

      {/* LIVE QUEUE HERO CARD */}
      {myQueue ? (
        <div style={{
          backgroundColor: 'white', borderRadius: '20px', border: '1px solid #BFDBFE',
          padding: '28px 32px', boxShadow: '0 4px 20px rgba(37,99,235,0.06)',
          background: 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 65%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
            
            {/* Left Status Info */}
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <span style={{
                  padding: '5px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 800,
                  textTransform: 'uppercase', letterSpacing: '0.06em',
                  backgroundColor: myQueue.status === 'in-progress' ? '#ECFDF5' : '#FFFBEB',
                  color: myQueue.status === 'in-progress' ? '#047857' : '#B45309',
                  border: myQueue.status === 'in-progress' ? '1px solid #A7F3D0' : '1px solid #FDE68A',
                  display: 'inline-flex', alignItems: 'center', gap: '6px'
                }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: myQueue.status === 'in-progress' ? '#059669' : '#D97706', boxShadow: '0 0 6px rgba(5,150,105,0.6)' }} />
                  {myQueue.status === 'in-progress' ? 'Consultation In Progress' : 'Waiting in Line'}
                </span>
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
                You're #{myQueue.position} in line
              </h2>
              <p style={{ fontSize: '15px', color: '#475569', margin: '6px 0 0', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Stethoscope size={16} style={{ color: '#2563EB' }} />
                {myQueue.doctorName} &bull; <span style={{ color: '#2563EB', fontWeight: 700 }}>{myQueue.department}</span>
              </p>
            </div>

            {/* Right Metric Boxes */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{
                textAlign: 'center', padding: '14px 22px', borderRadius: '16px',
                backgroundColor: 'white', border: '1px solid #E2E8F0', minWidth: '105px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}>
                <p style={{ fontSize: '24px', fontWeight: 800, color: '#2563EB', margin: 0 }}>#{myQueue.position}</p>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Position</span>
              </div>
              
              <div style={{
                textAlign: 'center', padding: '14px 22px', borderRadius: '16px',
                backgroundColor: 'white', border: '1px solid #E2E8F0', minWidth: '105px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}>
                <p style={{ fontSize: '24px', fontWeight: 800, color: '#D97706', margin: 0 }}>~15</p>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Min Wait</span>
              </div>

              <div style={{
                textAlign: 'center', padding: '14px 22px', borderRadius: '16px',
                backgroundColor: 'white', border: '1px solid #E2E8F0', minWidth: '105px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)'
              }}>
                <p style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: '4px 0 0' }}>{myQueue.estimatedTime}</p>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Est. Time</span>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div style={{
          backgroundColor: 'white', borderRadius: '20px', border: '1px solid #E2E8F0',
          padding: '48px 24px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
        }}>
          <CheckCircle2 size={48} style={{ color: '#059669', margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>You're not currently in a queue</h3>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '6px 0 0' }}>Book an appointment to automatically join the live queue</p>
        </div>
      )}

      {/* QUEUE STATS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        
        {/* Patients Ahead Card */}
        <div style={{
          backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0',
          padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Patients Ahead
            </span>
            <p style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', margin: '4px 0 0' }}>1 Patient</p>
          </div>
          <div style={{
            width: '46px', height: '46px', borderRadius: '14px', backgroundColor: '#EFF6FF',
            border: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Users style={{ width: '22px', height: '22px', color: '#2563EB' }} />
          </div>
        </div>

        {/* Avg Wait Time Card */}
        <div style={{
          backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0',
          padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Avg Wait Time
            </span>
            <p style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', margin: '4px 0 0' }}>12 Minutes</p>
          </div>
          <div style={{
            width: '46px', height: '46px', borderRadius: '14px', backgroundColor: '#FFFBEB',
            border: '1px solid #FDE68A', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Clock style={{ width: '22px', height: '22px', color: '#D97706' }} />
          </div>
        </div>

        {/* Check-in Status Card */}
        <div style={{
          backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0',
          padding: '20px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Check-in Confirmed
            </span>
            <p style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', margin: '4px 0 0' }}>9:45 AM</p>
          </div>
          <div style={{
            width: '46px', height: '46px', borderRadius: '14px', backgroundColor: '#ECFDF5',
            border: '1px solid #A7F3D0', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <CheckCircle2 style={{ width: '22px', height: '22px', color: '#059669' }} />
          </div>
        </div>

      </div>

      {/* QUEUE TIMELINE CARD */}
      <div style={{
        backgroundColor: 'white', borderRadius: '20px', border: '1px solid #E2E8F0',
        padding: '28px 32px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={20} style={{ color: '#2563EB' }} /> Patient Visit Progress Timeline
          </h3>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#64748B', backgroundColor: '#F1F5F9', padding: '4px 12px', borderRadius: '8px' }}>
            Step 3 of 4 Active
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
          {timelineSteps.map((item, i) => {
            const isCompleted = item.status === 'completed';
            const isCurrent = item.status === 'current';
            const isUpcoming = item.status === 'upcoming';
            const isLast = i === timelineSteps.length - 1;

            return (
              <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                
                {/* Step Circle & Connecting Vertical Bar */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '40px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    backgroundColor: isCompleted ? '#ECFDF5' : isCurrent ? '#EFF6FF' : '#F8FAFC',
                    color: isCompleted ? '#059669' : isCurrent ? '#2563EB' : '#94A3B8',
                    border: isCompleted ? '2px solid #A7F3D0' : isCurrent ? '2px solid #2563EB' : '2px solid #E2E8F0',
                    boxShadow: isCurrent ? '0 0 0 4px rgba(37,99,235,0.15)' : 'none'
                  }}>
                    {isCompleted ? <CheckCircle2 size={20} /> :
                     isCurrent ? <Clock size={20} className="animate-spin" /> :
                     <AlertCircle size={20} />}
                  </div>

                  {!isLast && (
                    <div style={{
                      width: '3px',
                      height: '44px',
                      backgroundColor: isCompleted ? '#A7F3D0' : isCurrent ? '#BFDBFE' : '#E2E8F0',
                      margin: '4px 0'
                    }} />
                  )}
                </div>

                {/* Step Details */}
                <div style={{
                  flex: 1, paddingBottom: isLast ? '0px' : '24px', paddingTop: '4px',
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <p style={{ fontSize: '15px', fontWeight: 800, color: isUpcoming ? '#64748B' : '#0F172A', margin: 0, lineHeight: 1.3 }}>
                        {item.step}
                      </p>
                      {isCurrent && (
                        <span style={{
                          fontSize: '11px', fontWeight: 800, color: '#1D4ED8',
                          backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE',
                          padding: '2px 10px', borderRadius: '12px', letterSpacing: '0.04em'
                        }}>
                          IN PROGRESS
                        </span>
                      )}
                    </div>
                    <p style={{ fontSize: '13.5px', color: '#475569', margin: '4px 0 0', lineHeight: 1.4 }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Timestamp Tag */}
                  <div style={{
                    padding: '6px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: 700,
                    backgroundColor: isCurrent ? '#EFF6FF' : isCompleted ? '#ECFDF5' : '#F8FAFC',
                    color: isCurrent ? '#2563EB' : isCompleted ? '#059669' : '#64748B',
                    border: isCurrent ? '1px solid #BFDBFE' : isCompleted ? '1px solid #A7F3D0' : '1px solid #E2E8F0',
                    whiteSpace: 'nowrap'
                  }}>
                    {item.time}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default PatientQueue;

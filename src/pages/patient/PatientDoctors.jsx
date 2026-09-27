import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Filter } from 'lucide-react';
import Avatar from '../../components/ui/Avatar';
import Modal from '../../components/ui/Modal';
import { mockDoctors } from '../../data/mockData';

const PatientDoctors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const specialties = ['all', ...new Set(mockDoctors.map((d) => d.specialty))];

  const filteredDoctors = mockDoctors.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'all' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = (doctor) => {
    if (!doctor) return;
    setSelectedDoctor(null);
    navigate('/patient/appointments', { state: { doctorId: doctor.id, openBooking: true } });
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }} className="space-y-6">
      
      {/* Header Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '8px' }}>
        <div>
          <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
            Find & Book Doctors
          </h1>
          <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0', fontWeight: 500 }}>
            Browse our certified hospital specialists and schedule a visit
          </p>
        </div>
      </div>

      {/* SEARCH & FILTER TOOLBAR */}
      <div style={{
        backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0',
        padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px'
      }}>
        {/* Search Bar */}
        <div style={{ position: 'relative', width: '320px' }}>
          <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94A3B8' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search doctor by name or specialty..."
            style={{
              width: '100%', padding: '9px 14px 9px 36px', fontSize: '13px',
              backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px',
              outline: 'none', transition: 'all 0.15s', color: '#0F172A'
            }}
            onFocus={(e) => { e.target.style.borderColor = '#2563EB'; e.target.style.backgroundColor = 'white'; }}
            onBlur={(e) => { e.target.style.borderColor = '#CBD5E1'; e.target.style.backgroundColor = '#F8FAFC'; }}
          />
        </div>

        {/* Specialty Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Specialty:
          </span>
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            style={{
              padding: '8px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
              backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', color: '#0F172A', outline: 'none'
            }}
          >
            {specialties.map((s) => (
              <option key={s} value={s}>
                {s === 'all' ? 'All Specialties' : s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* DOCTORS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            style={{
              backgroundColor: 'white', borderRadius: '18px', border: '1px solid #E2E8F0',
              padding: '22px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              transition: 'transform 0.15s ease, box-shadow 0.15s ease'
            }}
          >
            <div>
              {/* Doctor Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '16px' }}>
                <Avatar name={doctor.name} size="lg" />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {doctor.name}
                    </h3>
                    <span style={{
                      padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 800,
                      backgroundColor: doctor.available ? '#ECFDF5' : '#FEF2F2',
                      color: doctor.available ? '#047857' : '#DC2626',
                      border: doctor.available ? '1px solid #A7F3D0' : '1px solid #FCA5A5',
                      flexShrink: 0
                    }}>
                      {doctor.available ? 'Available' : 'Busy'}
                    </span>
                  </div>
                  <p style={{ fontSize: '13px', color: '#2563EB', fontWeight: 700, margin: '2px 0 0' }}>
                    {doctor.specialty}
                  </p>
                  <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0', fontWeight: 500 }}>
                    {doctor.education}
                  </p>
                </div>
              </div>

              {/* Doctor Stats Grid */}
              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px',
                padding: '12px', borderRadius: '12px', backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0', marginBottom: '18px', textAlign: 'center'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                    <Star size={13} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>{doctor.rating}</span>
                  </div>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Rating</span>
                </div>

                <div>
                  <p style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', margin: 0 }}>{doctor.experience}</p>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Experience</span>
                </div>

                <div>
                  <p style={{ fontSize: '13px', fontWeight: 800, color: '#059669', margin: 0 }}>
                    ₹{Number(doctor.fee).toLocaleString('en-IN')}
                  </p>
                  <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Fee / Visit</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setSelectedDoctor(doctor)}
                style={{
                  flex: 1, padding: '9px 12px', borderRadius: '10px',
                  border: '1px solid #CBD5E1', backgroundColor: 'white',
                  color: '#475569', fontSize: '12.5px', fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F8FAFC'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                View Profile
              </button>

              <button
                onClick={() => handleBookAppointment(doctor)}
                style={{
                  flex: 1, padding: '9px 12px', borderRadius: '10px',
                  border: 'none', backgroundColor: '#2563EB',
                  color: 'white', fontSize: '12.5px', fontWeight: 700,
                  cursor: 'pointer', boxShadow: '0 2px 6px rgba(37,99,235,0.25)',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1D4ED8'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2563EB'}
              >
                Book Visit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DOCTOR DETAIL MODAL */}
      <Modal
        isOpen={!!selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        title="Doctor Profile Details"
        size="lg"
        footer={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', width: '100%' }}>
            <button
              type="button"
              onClick={() => setSelectedDoctor(null)}
              style={{
                padding: '9px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: 600,
                backgroundColor: 'white', color: '#475569', border: '1px solid #CBD5E1', cursor: 'pointer'
              }}
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => handleBookAppointment(selectedDoctor)}
              style={{
                padding: '9px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: 700,
                backgroundColor: '#2563EB', color: 'white', border: 'none', cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(37,99,235,0.25)'
              }}
            >
              Book Appointment
            </button>
          </div>
        }
      >
        {selectedDoctor && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Hero Card inside Modal */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '16px 20px', borderRadius: '16px',
              backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE'
            }}>
              <Avatar name={selectedDoctor.name} size="xl" />
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
                  {selectedDoctor.name}
                </h3>
                <p style={{ fontSize: '14px', fontWeight: 700, color: '#2563EB', margin: '3px 0 0' }}>
                  {selectedDoctor.specialty}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', backgroundColor: 'white', padding: '3px 9px', borderRadius: '8px', border: '1px solid #FDE68A' }}>
                    <Star style={{ width: '14px', height: '14px', color: '#F59E0B', fill: '#F59E0B' }} />
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>{selectedDoctor.rating}</span>
                  </div>

                  <span style={{ fontSize: '12px', color: '#475569', fontWeight: 600 }}>
                    {selectedDoctor.experience} experience
                  </span>

                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '3px 9px', borderRadius: '8px', border: '1px solid #A7F3D0' }}>
                    ₹{Number(selectedDoctor.fee).toLocaleString('en-IN')} / visit
                  </span>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>
                Biography
              </h4>
              <p style={{ fontSize: '13.5px', color: '#334155', margin: 0, lineHeight: 1.5, fontWeight: 400 }}>
                {selectedDoctor.bio}
              </p>
            </div>

            {/* Medical Qualifications */}
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 6px' }}>
                Medical Qualifications
              </h4>
              <p style={{ fontSize: '13.5px', color: '#0F172A', margin: 0, fontWeight: 600 }}>
                {selectedDoctor.education}
              </p>
            </div>

            {/* Weekly Availability Schedule */}
            <div>
              <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 10px' }}>
                Weekly Availability Schedule
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {Object.entries(selectedDoctor.schedule).map(([day, time]) => (
                  <div
                    key={day}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '10px 14px', borderRadius: '10px', backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0', fontSize: '12.5px'
                    }}
                  >
                    <span style={{ fontWeight: 800, color: '#0F172A', textTransform: 'capitalize' }}>{day}</span>
                    <span style={{ fontWeight: 600, color: '#475569' }}>{time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </Modal>

    </div>
  );
};

export default PatientDoctors;

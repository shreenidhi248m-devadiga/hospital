import { useState } from 'react';
import { Plus, PillBottle, Printer, CheckCircle2, FileText, Calendar, User } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import DataTable from '../../components/ui/DataTable';
import { mockPrescriptions } from '../../data/mockData';

const formatDateDDMMYYYY = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return dateStr;
};

const DoctorPrescriptions = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [prescriptions, setPrescriptions] = useState(mockPrescriptions);
  const [successToast, setSuccessToast] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    patientName: '',
    medication: '',
    dosage: '',
    duration: '',
    refills: '0',
    notes: ''
  });

  const handlePrint = (rx) => {
    window.print();
  };

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.medication) return;

    const newRx = {
      id: `RX${Date.now()}`,
      patientId: 'P001',
      patientName: formData.patientName,
      medication: formData.medication,
      dosage: formData.dosage || 'As prescribed',
      duration: formData.duration || '30 days',
      prescribedBy: 'Dr. Michael Chen',
      prescribedDate: new Date().toISOString().split('T')[0],
      status: 'Active',
      refills: parseInt(formData.refills) || 0,
      pharmacy: 'Hospital Main Pharmacy'
    };

    setPrescriptions([newRx, ...prescriptions]);
    setShowCreate(false);
    setSuccessToast(true);
    setTimeout(() => setSuccessToast(false), 4000);
    setFormData({ patientName: '', medication: '', dosage: '', duration: '', refills: '0', notes: '' });
  };

  const columns = [
    { 
      key: 'patientName', 
      label: 'PATIENT', 
      render: (val) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#F0FDFA', color: '#0D9488', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
            {val.charAt(0)}
          </div>
          <span style={{ fontWeight: 700, color: '#0F172A', fontSize: '14px' }}>{val}</span>
        </div>
      )
    },
    { 
      key: 'medication', 
      label: 'MEDICATION & DOSAGE', 
      render: (val, row) => (
        <div>
          <p style={{ fontWeight: 800, color: '#0F172A', margin: 0, fontSize: '14px' }}>{val}</p>
          <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0', fontWeight: 500 }}>{row.dosage}</p>
        </div>
      )
    },
    { 
      key: 'duration', 
      label: 'DURATION', 
      render: (val) => <span style={{ color: '#334155', fontWeight: 600, fontSize: '13px' }}>{val}</span> 
    },
    { 
      key: 'prescribedDate', 
      label: 'PRESCRIBED DATE', 
      render: (val) => <span style={{ color: '#0F172A', fontWeight: 600, fontSize: '13px' }}>{formatDateDDMMYYYY(val)}</span> 
    },
    { 
      key: 'status', 
      label: 'STATUS', 
      render: (val) => (
        <span style={{
          padding: '4px 12px', borderRadius: '12px', fontSize: '11px', fontWeight: 800,
          backgroundColor: val === 'Active' ? '#ECFDF5' : '#F1F5F9',
          color: val === 'Active' ? '#047857' : '#64748B',
          border: val === 'Active' ? '1px solid #A7F3D0' : '1px solid #CBD5E1',
          display: 'inline-flex', alignItems: 'center', gap: '5px'
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: val === 'Active' ? '#059669' : '#94A3B8' }} />
          {val}
        </span>
      )
    },
    { 
      key: 'refills', 
      label: 'REFILLS', 
      render: (val) => <span style={{ fontWeight: 700, color: '#475569', fontSize: '13px' }}>{val} remaining</span> 
    },
    { 
      key: 'actions', 
      label: 'ACTIONS', 
      sortable: false, 
      render: (_, row) => (
        <button
          onClick={() => handlePrint(row)}
          title="Print Prescription"
          style={{
            padding: '7px 14px', borderRadius: '9px', fontSize: '12.5px', fontWeight: 700,
            backgroundColor: '#F8FAFC', color: '#0D9488', border: '1px solid #CCFBF1',
            cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px',
            transition: 'all 0.15s ease'
          }}
        >
          <Printer size={14} /> Print
        </button>
      )
    },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }} className="space-y-6">
      
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            Patient Prescriptions
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B', margin: '4px 0 0', fontWeight: 500 }}>
            Create, issue, and manage official digital prescriptions for your patients
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '10px 20px', borderRadius: '12px', fontSize: '13.5px', fontWeight: 800,
            backgroundColor: '#0D9488', color: 'white', border: 'none', cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(13, 148, 136, 0.25)', flexShrink: 0
          }}
        >
          <Plus size={18} /> New Prescription
        </button>
      </div>

      {/* Success Feedback Toast */}
      {successToast && (
        <div style={{
          backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46',
          padding: '14px 20px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '12px',
          fontWeight: 700, fontSize: '13.5px', boxShadow: '0 2px 8px rgba(5, 150, 105, 0.1)'
        }}>
          <CheckCircle2 size={20} style={{ color: '#059669', flexShrink: 0 }} />
          New prescription created successfully and saved to patient records!
        </div>
      )}

      {/* Data Table */}
      <Card>
        <DataTable columns={columns} data={prescriptions} searchPlaceholder="Search prescriptions by patient or medication..." />
      </Card>

      {/* NEW PRESCRIPTION MODAL */}
      <Modal
        isOpen={showCreate}
        onClose={() => setShowCreate(false)}
        title="Issue New Prescription"
        size="lg"
        footer={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '12px', width: '100%' }}>
            <button
              type="button"
              onClick={() => setShowCreate(false)}
              style={{
                padding: '10px 20px', borderRadius: '10px', fontSize: '13.5px', fontWeight: 700,
                backgroundColor: 'white', border: '1px solid #CBD5E1', color: '#475569', cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreateSubmit}
              style={{
                padding: '10px 22px', borderRadius: '10px', fontSize: '13.5px', fontWeight: 800,
                backgroundColor: '#0D9488', color: 'white', border: 'none', cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(13, 148, 136, 0.25)'
              }}
            >
              Create Prescription
            </button>
          </div>
        }
      >
        <form onSubmit={handleCreateSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Patient Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Select Patient *
            </label>
            <select
              required
              value={formData.patientName}
              onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '12px',
                border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC',
                fontSize: '14px', fontWeight: 600, color: '#0F172A', outline: 'none',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
              }}
            >
              <option value="">Select patient from list...</option>
              <option value="Sarah Johnson">Sarah Johnson</option>
              <option value="John Davis">John Davis</option>
              <option value="Maria Garcia">Maria Garcia</option>
              <option value="Robert Brown">Robert Brown</option>
            </select>
          </div>

          {/* Medication & Dosage Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Medication Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Amoxicillin 500mg"
                value={formData.medication}
                onChange={(e) => setFormData({ ...formData, medication: e.target.value })}
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '12px',
                  border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC',
                  fontSize: '14px', fontWeight: 600, color: '#0F172A', outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Dosage & Frequency *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 1 tablet twice daily after meals"
                value={formData.dosage}
                onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '12px',
                  border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC',
                  fontSize: '14px', fontWeight: 600, color: '#0F172A', outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              />
            </div>
          </div>

          {/* Duration & Refills Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Treatment Duration
              </label>
              <input
                type="text"
                placeholder="e.g. 14 days / 30 days"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '12px',
                  border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC',
                  fontSize: '14px', fontWeight: 600, color: '#0F172A', outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                Number of Refills Allowed
              </label>
              <input
                type="number"
                min="0"
                max="12"
                placeholder="0"
                value={formData.refills}
                onChange={(e) => setFormData({ ...formData, refills: e.target.value })}
                style={{
                  width: '100%', padding: '12px 16px', borderRadius: '12px',
                  border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC',
                  fontSize: '14px', fontWeight: 600, color: '#0F172A', outline: 'none',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
                }}
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label style={{ display: 'block', fontSize: '11.5px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
              Special Instructions / Pharmacist Notes
            </label>
            <textarea
              rows={3}
              placeholder="e.g. Take with plenty of water. Avoid alcohol during medication period."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '12px',
                border: '1px solid #CBD5E1', backgroundColor: '#F8FAFC',
                fontSize: '14px', fontWeight: 600, color: '#0F172A', outline: 'none',
                resize: 'none', boxShadow: '0 1px 2px rgba(0,0,0,0.03)'
              }}
            />
          </div>

        </form>
      </Modal>

    </div>
  );
};

export default DoctorPrescriptions;

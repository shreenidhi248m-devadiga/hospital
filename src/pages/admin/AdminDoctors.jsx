import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Stethoscope,
  Star,
  Users,
  Clock,
  DollarSign,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Eye,
  Building2,
  DoorOpen,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { mockDoctors } from '../../data/mockData';

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // New Doctor Form State
  const [formName, setFormName] = useState('');
  const [formSpecialty, setFormSpecialty] = useState('Cardiology');
  const [formDepartment, setFormDepartment] = useState('Cardiology');
  const [formExperience, setFormExperience] = useState('10 years');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('+91 ');
  const [formEducation, setFormEducation] = useState('Harvard Medical School');
  const [formFee, setFormFee] = useState('1500');
  const [formBio, setFormBio] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggleStatus = (doctorId) => {
    setDoctors((prev) =>
      prev.map((doc) => (doc.id === doctorId ? { ...doc, available: !doc.available } : doc))
    );
    const doc = doctors.find((d) => d.id === doctorId);
    showToast(`Updated availability for ${doc?.name}!`);
  };

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newDoc = {
      id: String(Date.now()),
      name: formName.trim().startsWith('Dr.') ? formName.trim() : `Dr. ${formName.trim()}`,
      specialty: formSpecialty,
      department: formDepartment,
      experience: formExperience,
      rating: 5.0,
      patients: 0,
      available: true,
      email: formEmail.trim() || `${formName.toLowerCase().replace(/[^a-z]/g, '')}@medflow.com`,
      phone: formPhone.trim(),
      education: formEducation.trim(),
      fee: parseInt(formFee, 10) || 1200,
      bio: formBio.trim() || `Consultant physician specializing in ${formSpecialty}.`,
      schedule: {
        mon: '9:00 AM - 5:00 PM',
        tue: '9:00 AM - 5:00 PM',
        wed: '9:00 AM - 5:00 PM',
        thu: '9:00 AM - 5:00 PM',
        fri: '9:00 AM - 2:00 PM'
      }
    };

    setDoctors([newDoc, ...doctors]);
    setIsAddModalOpen(false);
    setFormName('');
    setFormEmail('');
    setFormPhone('+91 ');
    setFormBio('');
    showToast(`Added ${newDoc.name} to medical staff roster!`);
  };

  const specialties = ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'General Surgery'];

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSearch =
      !searchTerm ||
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.education.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty = specialtyFilter === 'all' || doc.specialty === specialtyFilter;

    let matchesStatus = true;
    if (statusFilter === 'available') matchesStatus = doc.available === true;
    if (statusFilter === 'busy') matchesStatus = doc.available === false;

    return matchesSearch && matchesSpecialty && matchesStatus;
  });

  const columns = [
    {
      key: 'name',
      label: 'Physician / Specialist',
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Avatar name={val} size="md" />
          <div>
            <span style={{ fontWeight: 800, color: '#0F172A', display: 'block', fontSize: '13px' }}>
              {val}
            </span>
            <span style={{ fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <GraduationCap style={{ width: '12px', height: '12px', color: '#94A3B8' }} />
              {row.education}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'specialty',
      label: 'Specialty & Department',
      render: (val, row) => (
        <div>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: '#EFF6FF',
              color: '#1D4ED8',
              border: '1px solid #BFDBFE'
            }}
          >
            {val}
          </span>
          <span style={{ fontSize: '11px', color: '#64748B', display: 'block', marginTop: '2px' }}>
            {row.department} Clinic
          </span>
        </div>
      ),
    },
    {
      key: 'experience',
      label: 'Experience',
      render: (val) => (
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
          {val}
        </span>
      ),
    },
    {
      key: 'fee',
      label: 'Consult Fee',
      render: (val, row) => (
        <span style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>
          ₹{row.fee ? row.fee.toLocaleString() : '1,500'}
        </span>
      ),
    },
    {
      key: 'rating',
      label: 'Rating & Patients',
      render: (val, row) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star style={{ width: '13px', height: '13px', color: '#F59E0B', fill: '#F59E0B' }} />
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A' }}>{val}</span>
          </div>
          <span style={{ fontSize: '11px', color: '#64748B' }}>
            {row.patients.toLocaleString()} treated
          </span>
        </div>
      ),
    },
    {
      key: 'available',
      label: 'Floor Status',
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 9px',
              borderRadius: '16px',
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: val ? '#ECFDF5' : '#FEF2F2',
              color: val ? '#065F46' : '#991B1B',
              border: val ? '1px solid #A7F3D0' : '1px solid #FECACA'
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: val ? '#10B981' : '#EF4444' }} />
            {val ? 'Available' : 'In Session'}
          </span>
          <button
            onClick={() => handleToggleStatus(row.id)}
            style={{
              fontSize: '10px',
              fontWeight: 600,
              padding: '2px 6px',
              borderRadius: '4px',
              border: '1px solid #CBD5E1',
              backgroundColor: '#FFFFFF',
              color: '#64748B',
              cursor: 'pointer'
            }}
            title="Toggle Availability"
          >
            Toggle
          </button>
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setSelectedDoctor(row)}
            style={{
              padding: '5px 10px',
              fontSize: '11px',
              fontWeight: 700,
              borderRadius: '8px',
              backgroundColor: '#EFF6FF',
              color: '#2563EB',
              border: '1px solid #BFDBFE',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
            title="View Full Profile & Schedule"
          >
            <Eye style={{ width: '13px', height: '13px' }} />
            <span>Profile</span>
          </button>
        </div>
      ),
    },
  ];

  const totalDoctors = doctors.length;
  const availableCount = doctors.filter((d) => d.available).length;
  const inConsultCount = doctors.filter((d) => !d.available).length;

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
              Doctor Management
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
              Medical Staff Directory
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Manage hospital attending specialists, credentials, OPD consultation fees, and schedules.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
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
          <span>Add Doctor</span>
        </button>
      </div>

      {/* 4 Summary Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Total Specialists
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A' }}>{totalDoctors}</span>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>active physicians</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #BBF7D0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#047857', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Available on Floor
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#047857' }}>{availableCount}</span>
            <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>ready for consults</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #FDE68A', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#B45309', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            In Consultation
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#B45309' }}>{inConsultCount}</span>
            <span style={{ fontSize: '12px', color: '#D97706', fontWeight: 600 }}>with patients</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Average Doctor Rating
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A' }}>4.8</span>
            <span style={{ fontSize: '12px', color: '#F59E0B', fontWeight: 700 }}>⭐ 98% positive</span>
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
        {/* Specialty Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto' }}>
          <button
            onClick={() => setSpecialtyFilter('all')}
            style={{
              padding: '6px 14px',
              fontSize: '12px',
              fontWeight: 700,
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              backgroundColor: specialtyFilter === 'all' ? '#2563EB' : '#F1F5F9',
              color: specialtyFilter === 'all' ? '#FFFFFF' : '#475569',
              boxShadow: specialtyFilter === 'all' ? '0 1px 2px rgba(37,99,235,0.2)' : 'none',
              whiteSpace: 'nowrap'
            }}
          >
            All Specialists ({doctors.length})
          </button>
          {specialties.map((spec) => {
            const count = doctors.filter((d) => d.specialty === spec).length;
            const isActive = specialtyFilter === spec;
            return (
              <button
                key={spec}
                onClick={() => setSpecialtyFilter(spec)}
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
                  boxShadow: isActive ? '0 1px 2px rgba(37,99,235,0.2)' : 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>{spec}</span>
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

        {/* Status Dropdown & Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
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
            <option value="all">All Status</option>
            <option value="available">Available Now</option>
            <option value="busy">In Session</option>
          </select>

          <div style={{ position: 'relative', width: '240px' }}>
            <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#94A3B8' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search doctor, degree..."
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
          data={filteredDoctors}
          searchable={false}
          emptyMessage="No doctors found matching the selected specialty or search."
        />
      </div>

      {/* Add Doctor Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Doctor to Staff Roster"
        subtitle="Onboard an attending physician or consulting specialist into the hospital portal."
        size="lg"
        footer={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 600,
                borderRadius: '9px',
                border: '1px solid #CBD5E1',
                backgroundColor: 'white',
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              form="add-doctor-form"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 18px',
                fontSize: '13px',
                fontWeight: 700,
                borderRadius: '9px',
                border: 'none',
                backgroundColor: '#2563EB',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '0 1px 3px rgba(37,99,235,0.25)'
              }}
            >
              <Plus style={{ width: '15px', height: '15px' }} />
              <span>Save Doctor Roster</span>
            </button>
          </div>
        }
      >
        <form id="add-doctor-form" onSubmit={handleAddDoctor} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Section 1: Doctor Profile */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              1. Physician Credentials
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px', marginTop: '8px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Doctor Full Name <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Dr. Arthur Pendelton"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '13px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    outline: 'none',
                    color: '#0F172A',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Years of Experience
                </label>
                <input
                  type="text"
                  value={formExperience}
                  onChange={(e) => setFormExperience(e.target.value)}
                  placeholder="e.g. 14 years"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '13px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    outline: 'none',
                    color: '#0F172A',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '10px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Specialty
                </label>
                <select
                  value={formSpecialty}
                  onChange={(e) => {
                    setFormSpecialty(e.target.value);
                    setFormDepartment(e.target.value);
                  }}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    fontSize: '13px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    color: '#0F172A',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  {specialties.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Medical Education / Alma Mater
                </label>
                <input
                  type="text"
                  value={formEducation}
                  onChange={(e) => setFormEducation(e.target.value)}
                  placeholder="e.g. Harvard Medical School"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '13px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    outline: 'none',
                    color: '#0F172A',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Fees */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              2. Hospital Contact & Consultation Fee
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr', gap: '12px', marginTop: '8px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Hospital Email
                </label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="dr.name@medflow.com"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '13px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    outline: 'none',
                    color: '#0F172A',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="+91 98765 00000"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '13px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    outline: 'none',
                    color: '#0F172A',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Consult Fee (₹)
                </label>
                <input
                  type="number"
                  value={formFee}
                  onChange={(e) => setFormFee(e.target.value)}
                  placeholder="1500"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: '13px',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    outline: 'none',
                    color: '#0F172A',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Bio */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              3. Clinical Biography
            </span>
            <div style={{ marginTop: '8px' }}>
              <textarea
                rows={2}
                value={formBio}
                onChange={(e) => setFormBio(e.target.value)}
                placeholder="Brief summary of clinical expertise, fellowship certifications, and research interests."
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  fontSize: '13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  outline: 'none',
                  color: '#0F172A',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        </form>
      </Modal>

      {/* Doctor Profile Modal */}
      {selectedDoctor && (
        <Modal
          isOpen={!!selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          title={`Doctor Profile - ${selectedDoctor.name}`}
          subtitle={`${selectedDoctor.specialty} Specialist &bull; ${selectedDoctor.education}`}
          size="lg"
          footer={
            <button
              onClick={() => setSelectedDoctor(null)}
              style={{
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 600,
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                backgroundColor: 'white',
                color: '#475569',
                cursor: 'pointer'
              }}
            >
              Close Profile
            </button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Header Box */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Avatar name={selectedDoctor.name} size="lg" />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    {selectedDoctor.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px', fontSize: '12px', color: '#64748B' }}>
                    <span style={{ fontWeight: 700, color: '#2563EB' }}>{selectedDoctor.specialty}</span>
                    <span>&bull;</span>
                    <span>{selectedDoctor.experience}</span>
                    <span>&bull;</span>
                    <span style={{ fontWeight: 800, color: '#0F172A' }}>Fee: ₹{selectedDoctor.fee || 1500}</span>
                  </div>
                </div>
              </div>

              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: selectedDoctor.available ? '#ECFDF5' : '#FEF2F2',
                  color: selectedDoctor.available ? '#065F46' : '#991B1B',
                  border: selectedDoctor.available ? '1px solid #A7F3D0' : '1px solid #FECACA'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: selectedDoctor.available ? '#10B981' : '#EF4444' }} />
                {selectedDoctor.available ? 'Available' : 'In Session'}
              </span>
            </div>

            {/* Quick Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Patients Treated</span>
                <p style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: 800, color: '#0F172A' }}>{selectedDoctor.patients.toLocaleString()}</p>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Patient Rating</span>
                <p style={{ margin: '4px 0 0 0', fontSize: '18px', fontWeight: 800, color: '#F59E0B' }}>⭐ {selectedDoctor.rating} / 5.0</p>
              </div>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>Alma Mater</span>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>{selectedDoctor.education}</p>
              </div>
            </div>

            {/* Bio */}
            {selectedDoctor.bio && (
              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>Clinical Background</span>
                <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#334155', lineHeight: 1.5 }}>{selectedDoctor.bio}</p>
              </div>
            )}

            {/* Weekly Schedule */}
            {selectedDoctor.schedule && (
              <div style={{ padding: '14px', borderRadius: '10px', backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Clock style={{ width: '13px', height: '13px', color: '#2563EB' }} />
                  Weekly Consultation Schedule
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginTop: '8px' }}>
                  {Object.entries(selectedDoctor.schedule).map(([day, hours]) => (
                    <div key={day} style={{ padding: '8px', borderRadius: '6px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', textAlign: 'center' }}>
                      <span style={{ fontSize: '10px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>{day}</span>
                      <p style={{ margin: '2px 0 0 0', fontSize: '10px', fontWeight: 700, color: '#0F172A' }}>{hours}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminDoctors;

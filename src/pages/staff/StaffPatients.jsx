import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Users,
  Shield,
  AlertTriangle,
  Calendar,
  Eye,
  Phone,
  Mail,
  MapPin,
  Heart,
  Droplet,
  UserCheck,
  CheckCircle2,
  UserPlus,
  FileText
} from 'lucide-react';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { mockPatients } from '../../data/mockData';

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    if (parts[0].length === 4) {
      return `${months[parseInt(parts[1], 10) - 1]} ${parseInt(parts[2], 10)}, ${parts[0]}`;
    } else {
      return `${months[parseInt(parts[1], 10) - 1]} ${parseInt(parts[0], 10)}, ${parts[2]}`;
    }
  }
  return dateStr;
};

const StaffPatients = () => {
  const [patients, setPatients] = useState(mockPatients);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTag, setFilterTag] = useState('all');
  const [bloodFilter, setBloodFilter] = useState('all');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // New Patient Form State
  const [formName, setFormName] = useState('');
  const [formAge, setFormAge] = useState('');
  const [formGender, setFormGender] = useState('Female');
  const [formBlood, setFormBlood] = useState('A+');
  const [formPhone, setFormPhone] = useState('+91 ');
  const [formEmail, setFormEmail] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formInsurance, setFormInsurance] = useState('BlueCross Gold');
  const [formEmergency, setFormEmergency] = useState('');
  const [formAllergies, setFormAllergies] = useState('');
  const [formConditions, setFormConditions] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRegisterPatient = (e) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newPatient = {
      id: `P00${patients.length + 1}`,
      name: formName.trim(),
      age: parseInt(formAge, 10) || 30,
      gender: formGender,
      blood: formBlood,
      phone: formPhone.trim(),
      email: formEmail.trim() || `${formName.toLowerCase().replace(/\s+/g, '.')}@email.com`,
      address: formAddress.trim() || 'Springfield Medical District',
      insurance: formInsurance,
      emergencyContact: formEmergency.trim() || 'Next of Kin - +91 98765 00000',
      allergies: formAllergies ? formAllergies.split(',').map((s) => s.trim()).filter(Boolean) : [],
      conditions: formConditions ? formConditions.split(',').map((s) => s.trim()).filter(Boolean) : [],
      lastVisit: new Date().toISOString().split('T')[0],
      registeredDate: new Date().toISOString().split('T')[0]
    };

    setPatients([newPatient, ...patients]);
    setIsRegisterModalOpen(false);
    setFormName('');
    setFormAge('');
    setFormPhone('+91 ');
    setFormEmail('');
    setFormAddress('');
    setFormEmergency('');
    setFormAllergies('');
    setFormConditions('');
    showToast(`Registered patient ${newPatient.name} (ID: ${newPatient.id})!`);
  };

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      !searchTerm ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm) ||
      p.insurance.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.conditions && p.conditions.some((c) => c.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesBlood = bloodFilter === 'all' || p.blood === bloodFilter;

    let matchesTag = true;
    if (filterTag === 'allergies') matchesTag = p.allergies && p.allergies.length > 0;
    if (filterTag === 'chronic') matchesTag = p.conditions && p.conditions.length > 0;
    if (filterTag === 'seniors') matchesTag = p.age >= 60;
    if (filterTag === 'pediatric') matchesTag = p.age < 18;

    return matchesSearch && matchesBlood && matchesTag;
  });

  const columns = [
    {
      key: 'name',
      label: 'Patient',
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar name={val} size="sm" />
          <div>
            <span style={{ fontWeight: 800, color: '#0F172A', display: 'block', fontSize: '13px' }}>
              {val}
            </span>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
              {row.id}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'age',
      label: 'Age / Gender',
      render: (val, row) => (
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
          {val} yrs &bull; {row.gender}
        </span>
      ),
    },
    {
      key: 'blood',
      label: 'Blood Group',
      render: (val) => (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 800,
            backgroundColor: '#FEF2F2',
            color: '#B91C1C',
            border: '1px solid #FECACA'
          }}
        >
          <Droplet style={{ width: '11px', height: '11px', fill: '#EF4444', color: '#EF4444' }} />
          {val}
        </span>
      ),
    },
    {
      key: 'phone',
      label: 'Contact',
      render: (val, row) => (
        <div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Phone style={{ width: '12px', height: '12px', color: '#94A3B8' }} />
            {val}
          </span>
          <span style={{ fontSize: '11px', color: '#64748B' }}>{row.email}</span>
        </div>
      ),
    },
    {
      key: 'insurance',
      label: 'Insurance Provider',
      render: (val) => (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 9px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 700,
            backgroundColor: '#EFF6FF',
            color: '#1D4ED8',
            border: '1px solid #BFDBFE'
          }}
        >
          <Shield style={{ width: '12px', height: '12px', color: '#2563EB' }} />
          {val}
        </span>
      ),
    },
    {
      key: 'conditions',
      label: 'Medical Notes',
      render: (_, row) => {
        const hasAllergies = row.allergies && row.allergies.length > 0;
        const hasConditions = row.conditions && row.conditions.length > 0;

        if (!hasAllergies && !hasConditions) {
          return <span style={{ fontSize: '11px', color: '#94A3B8' }}>No active alerts</span>;
        }

        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
            {hasAllergies && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: '#FFFBEB',
                  color: '#B45309',
                  border: '1px solid #FDE68A'
                }}
                title={`Allergies: ${row.allergies.join(', ')}`}
              >
                Allergy ({row.allergies.length})
              </span>
            )}
            {hasConditions && (
              <span
                style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 6px',
                  borderRadius: '4px',
                  backgroundColor: '#F3E8FF',
                  color: '#6B21A8',
                  border: '1px solid #E9D5FF'
                }}
                title={`Conditions: ${row.conditions.join(', ')}`}
              >
                {row.conditions[0]}
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: 'lastVisit',
      label: 'Last Visit',
      render: (val) => (
        <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
          {formatDisplayDate(val)}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button
            onClick={() => setSelectedPatient(row)}
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
              gap: '4px',
              transition: 'background-color 0.15s ease'
            }}
            title="View Patient EMR Record"
          >
            <Eye style={{ width: '13px', height: '13px' }} />
            <span>Profile</span>
          </button>
        </div>
      ),
    },
  ];

  const totalPatients = patients.length;
  const allergyCount = patients.filter((p) => p.allergies && p.allergies.length > 0).length;
  const chronicCount = patients.filter((p) => p.conditions && p.conditions.length > 0).length;

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
              Patient Management
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
              Hospital EMR Records
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Register new clinic patients, view medical profiles, insurance coverage, and history.
          </p>
        </div>

        <button
          onClick={() => setIsRegisterModalOpen(true)}
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
          <span>Register Patient</span>
        </button>
      </div>

      {/* 4 Quick Stat Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Total Registered
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A' }}>{totalPatients}</span>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>active files</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #BBF7D0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#047857', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Verified Insurance
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#047857' }}>100%</span>
            <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>claims active</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #FDE68A', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#B45309', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Documented Allergies
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#B45309' }}>{allergyCount}</span>
            <span style={{ fontSize: '12px', color: '#D97706', fontWeight: 600 }}>safety alerts</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E9D5FF', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#6B21A8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Chronic Care Profiles
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#6B21A8' }}>{chronicCount}</span>
            <span style={{ fontSize: '12px', color: '#7E22CE', fontWeight: 600 }}>monitored patients</span>
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
        {/* Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto' }}>
          {[
            { id: 'all', label: `All Patients (${totalPatients})` },
            { id: 'allergies', label: `With Allergies (${allergyCount})` },
            { id: 'chronic', label: `Chronic Conditions (${chronicCount})` },
            { id: 'seniors', label: 'Senior Citizens (60+)' },
            { id: 'pediatric', label: 'Pediatric (<18)' },
          ].map((tag) => {
            const active = filterTag === tag.id;
            return (
              <button
                key={tag.id}
                onClick={() => setFilterTag(tag.id)}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  backgroundColor: active ? '#2563EB' : '#F1F5F9',
                  color: active ? '#FFFFFF' : '#475569',
                  boxShadow: active ? '0 1px 2px rgba(37,99,235,0.2)' : 'none',
                  whiteSpace: 'nowrap'
                }}
              >
                {tag.label}
              </button>
            );
          })}
        </div>

        {/* Blood Group Filter & Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            value={bloodFilter}
            onChange={(e) => setBloodFilter(e.target.value)}
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
            <option value="all">All Blood Groups</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
          </select>

          <div style={{ position: 'relative', width: '240px' }}>
            <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#94A3B8' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, ID, phone..."
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
          data={filteredPatients}
          searchable={false}
          emptyMessage="No patient records match the search or filter criteria."
        />
      </div>

      {/* Register Patient Modal */}
      <Modal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        title="Register New Patient"
        subtitle="Create an official hospital EMR chart for a newly admitted or visiting patient."
        size="lg"
        footer={
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={() => setIsRegisterModalOpen(false)}
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
              form="register-patient-form"
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
              <UserPlus style={{ width: '15px', height: '15px' }} />
              <span>Register Patient</span>
            </button>
          </div>
        }
      >
        <form id="register-patient-form" onSubmit={handleRegisterPatient} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Section 1: Demographics */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              1. Patient Demographics
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginTop: '8px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Full Name <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Eleanor Vance"
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
                  Age <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  max="120"
                  value={formAge}
                  onChange={(e) => setFormAge(e.target.value)}
                  placeholder="e.g. 28"
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
                  Gender
                </label>
                <select
                  value={formGender}
                  onChange={(e) => setFormGender(e.target.value)}
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
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Contact & Insurance */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              2. Contact & Insurance
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1.5fr', gap: '12px', marginTop: '8px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Blood Group
                </label>
                <select
                  value={formBlood}
                  onChange={(e) => setFormBlood(e.target.value)}
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
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Phone Number <span style={{ color: '#EF4444' }}>*</span>
                </label>
                <input
                  type="text"
                  required
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
                  Insurance Provider
                </label>
                <input
                  type="text"
                  value={formInsurance}
                  onChange={(e) => setFormInsurance(e.target.value)}
                  placeholder="e.g. BlueCross Gold"
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
                  Emergency Contact (Name & Phone)
                </label>
                <input
                  type="text"
                  value={formEmergency}
                  onChange={(e) => setFormEmergency(e.target.value)}
                  placeholder="e.g. Mark Vance - +91 98765 11111"
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
                  Residential Address
                </label>
                <input
                  type="text"
                  value={formAddress}
                  onChange={(e) => setFormAddress(e.target.value)}
                  placeholder="Street address, City"
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

          {/* Section 3: Clinical Intake */}
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              3. Clinical Intake & Safety Alerts
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Known Allergies (Comma separated)
                </label>
                <input
                  type="text"
                  value={formAllergies}
                  onChange={(e) => setFormAllergies(e.target.value)}
                  placeholder="e.g. Penicillin, Latex, Peanuts"
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
                  Chronic Conditions / Diagnoses
                </label>
                <input
                  type="text"
                  value={formConditions}
                  onChange={(e) => setFormConditions(e.target.value)}
                  placeholder="e.g. Hypertension, Asthma"
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
        </form>
      </Modal>

      {/* Patient EMR Profile Modal */}
      {selectedPatient && (
        <Modal
          isOpen={!!selectedPatient}
          onClose={() => setSelectedPatient(null)}
          title={`Patient EMR Chart - ${selectedPatient.name}`}
          size="lg"
          footer={
            <button
              onClick={() => setSelectedPatient(null)}
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
              Close Chart
            </button>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Patient Header Card */}
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
                <Avatar name={selectedPatient.name} size="lg" />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    {selectedPatient.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px', fontSize: '12px', color: '#64748B' }}>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>ID: {selectedPatient.id}</span>
                    <span>&bull;</span>
                    <span>{selectedPatient.age} yrs &bull; {selectedPatient.gender}</span>
                    <span>&bull;</span>
                    <span style={{ fontWeight: 800, color: '#DC2626' }}>Blood: {selectedPatient.blood}</span>
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
                  backgroundColor: '#EFF6FF',
                  color: '#1D4ED8',
                  border: '1px solid #BFDBFE'
                }}
              >
                <Shield style={{ width: '13px', height: '13px' }} />
                {selectedPatient.insurance}
              </span>
            </div>

            {/* Contact & Address Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Information</span>
                <p style={{ margin: '6px 0 2px 0', fontSize: '12px', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Phone style={{ width: '12px', height: '12px', color: '#2563EB' }} />
                  {selectedPatient.phone}
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Mail style={{ width: '12px', height: '12px', color: '#64748B' }} />
                  {selectedPatient.email}
                </p>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Emergency & Address</span>
                <p style={{ margin: '6px 0 2px 0', fontSize: '12px', fontWeight: 700, color: '#DC2626' }}>
                  {selectedPatient.emergencyContact || 'No contact provided'}
                </p>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin style={{ width: '12px', height: '12px', color: '#94A3B8' }} />
                  {selectedPatient.address}
                </p>
              </div>
            </div>

            {/* Clinical Allergies & Conditions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#FFFBEB', border: '1px solid #FDE68A' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#B45309', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <AlertTriangle style={{ width: '13px', height: '13px' }} />
                  Documented Allergies
                </span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                  {selectedPatient.allergies && selectedPatient.allergies.length > 0 ? (
                    selectedPatient.allergies.map((a) => (
                      <span key={a} style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: 'white', color: '#92400E', border: '1px solid #FCD34D' }}>
                        {a}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '11px', color: '#92400E' }}>No known allergies</span>
                  )}
                </div>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: '#F3E8FF', border: '1px solid #E9D5FF' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#6B21A8', display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Heart style={{ width: '13px', height: '13px' }} />
                  Chronic Conditions
                </span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                  {selectedPatient.conditions && selectedPatient.conditions.length > 0 ? (
                    selectedPatient.conditions.map((c) => (
                      <span key={c} style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', backgroundColor: 'white', color: '#7E22CE', border: '1px solid #D8B4FE' }}>
                        {c}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: '11px', color: '#7E22CE' }}>No active chronic diagnoses</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StaffPatients;

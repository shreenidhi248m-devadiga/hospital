import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Users,
  Shield,
  Clock,
  Calendar,
  Eye,
  Edit3,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  UserPlus,
  Download,
  Activity,
  Award,
  Sparkles,
  MapPin,
  Save
} from 'lucide-react';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';
import { mockStaff } from '../../data/mockData';

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(parts[1], 10) - 1]} ${parseInt(parts[2], 10)}, ${parts[0]}`;
  }
  return dateStr;
};

const roleBadges = {
  Receptionist: { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  Nurse: { bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0' },
  'Lab Technician': { bg: '#FAF5FF', color: '#7E22CE', border: '#E9D5FF' },
  Pharmacist: { bg: '#FFFBEB', color: '#B45309', border: '#FDE68A' },
};

const AdminStaff = () => {
  const [staffList, setStaffList] = useState(mockStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [shiftFilter, setShiftFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [editingStaff, setEditingStaff] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // New Staff Form State
  const [formName, setFormName] = useState('');
  const [formRole, setFormRole] = useState('Nurse');
  const [formDept, setFormDept] = useState('Cardiology');
  const [formPhone, setFormPhone] = useState('+91 98765 ');
  const [formEmail, setFormEmail] = useState('');
  const [formShift, setFormShift] = useState('Morning (7AM - 3PM)');
  const [formStatus, setFormStatus] = useState('Active');

  // Edit Staff Form State
  const [editName, setEditName] = useState('');
  const [editRole, setEditRole] = useState('Nurse');
  const [editDept, setEditDept] = useState('Cardiology');
  const [editPhone, setEditPhone] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editShift, setEditShift] = useState('Morning (7AM - 3PM)');
  const [editStatus, setEditStatus] = useState('Active');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const newStaff = {
      id: `S00${staffList.length + 1}`,
      name: formName.trim(),
      role: formRole,
      department: formDept,
      phone: formPhone.trim(),
      email: formEmail.trim() || `${formName.toLowerCase().replace(/\s+/g, '.')}@medflow.com`,
      shift: formShift,
      status: formStatus,
      joinDate: new Date().toISOString().split('T')[0]
    };

    setStaffList([newStaff, ...staffList]);
    setIsAddModalOpen(false);
    setFormName('');
    setFormPhone('+91 98765 ');
    setFormEmail('');
    setFormRole('Nurse');
    setFormDept('Cardiology');
    setFormShift('Morning (7AM - 3PM)');
    setFormStatus('Active');
    showToast(`Added ${newStaff.name} to the hospital roster!`);
  };

  const handleOpenEdit = (staff) => {
    setEditingStaff(staff);
    setEditName(staff.name);
    setEditRole(staff.role);
    setEditDept(staff.department);
    setEditPhone(staff.phone || '');
    setEditEmail(staff.email || '');
    setEditShift(staff.shift);
    setEditStatus(staff.status);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingStaff) return;

    const updated = {
      ...editingStaff,
      name: editName.trim(),
      role: editRole,
      department: editDept,
      phone: editPhone.trim(),
      email: editEmail.trim(),
      shift: editShift,
      status: editStatus
    };

    setStaffList(staffList.map((s) => (s.id === editingStaff.id ? updated : s)));
    if (selectedStaff && selectedStaff.id === editingStaff.id) {
      setSelectedStaff(updated);
    }
    setEditingStaff(null);
    showToast(`Updated profile for ${updated.name}!`);
  };

  const handleToggleStatus = (staff) => {
    const newStatus = staff.status === 'Active' ? 'On Leave' : 'Active';
    const updated = { ...staff, status: newStatus };
    setStaffList(staffList.map((s) => (s.id === staff.id ? updated : s)));
    if (selectedStaff && selectedStaff.id === staff.id) {
      setSelectedStaff(updated);
    }
    showToast(`${staff.name} status updated to ${newStatus}`);
  };

  const handleExportCSV = () => {
    const headers = ['Staff ID', 'Name', 'Role', 'Department', 'Shift', 'Phone', 'Email', 'Status', 'Join Date'];
    const rows = staffList.map((s) => [
      `"${s.id}"`,
      `"${s.name}"`,
      `"${s.role}"`,
      `"${s.department}"`,
      `"${s.shift}"`,
      `"${s.phone || ''}"`,
      `"${s.email || ''}"`,
      `"${s.status}"`,
      `"${s.joinDate}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hospital_staff_roster_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Hospital staff roster exported successfully!');
  };

  const filteredStaff = staffList.filter((s) => {
    const matchesSearch =
      !searchTerm ||
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.phone && s.phone.includes(searchTerm)) ||
      (s.email && s.email.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesDept = deptFilter === 'all' || s.department === deptFilter;
    const matchesShift = shiftFilter === 'all' || s.shift.toLowerCase().includes(shiftFilter.toLowerCase());

    return matchesSearch && matchesDept && matchesShift;
  });

  const columns = [
    {
      key: 'name',
      label: 'Staff Member',
      render: (val, row) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Avatar name={val} size="sm" />
          <div>
            <span style={{ fontWeight: 800, color: '#0F172A', display: 'block', fontSize: '13px' }}>
              {val}
            </span>
            <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>
              {row.id} &bull; {row.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Clinical Role',
      render: (val) => {
        const conf = roleBadges[val] || { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' };
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '3px 9px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: conf.bg,
              color: conf.color,
              border: `1px solid ${conf.border}`
            }}
          >
            {val}
          </span>
        );
      },
    },
    {
      key: 'department',
      label: 'Department',
      render: (val) => (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            fontSize: '12px',
            fontWeight: 700,
            color: '#334155'
          }}
        >
          <Building style={{ width: '13px', height: '13px', color: '#64748B' }} />
          {val}
        </span>
      ),
    },
    {
      key: 'shift',
      label: 'Shift Assignment',
      render: (val) => (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '5px',
            padding: '3px 8px',
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            backgroundColor: '#F8FAFC',
            color: '#475569',
            border: '1px solid #E2E8F0'
          }}
        >
          <Clock style={{ width: '12px', height: '12px', color: '#2563EB' }} />
          {val}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Duty Status',
      render: (val, row) => {
        const isActive = val === 'Active';
        return (
          <button
            onClick={() => handleToggleStatus(row)}
            title="Click to toggle leave/active status"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 9px',
              borderRadius: '16px',
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: isActive ? '#F0FDF4' : '#FFFBEB',
              color: isActive ? '#15803D' : '#B45309',
              border: `1px solid ${isActive ? '#BBF7D0' : '#FDE68A'}`,
              cursor: 'pointer'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: isActive ? '#22C55E' : '#F59E0B'
              }}
            />
            {val}
          </button>
        );
      },
    },
    {
      key: 'joinDate',
      label: 'Joined Date',
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
            onClick={() => setSelectedStaff(row)}
            style={{
              padding: '5px 9px',
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
            title="View Staff Profile & Schedule"
          >
            <Eye style={{ width: '13px', height: '13px' }} />
            <span>Profile</span>
          </button>

          <button
            onClick={() => handleOpenEdit(row)}
            style={{
              padding: '5px 9px',
              fontSize: '11px',
              fontWeight: 700,
              borderRadius: '8px',
              backgroundColor: '#F8FAFC',
              color: '#334155',
              border: '1px solid #CBD5E1',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'background-color 0.15s ease'
            }}
            title="Edit Staff Member Details"
          >
            <Edit3 style={{ width: '13px', height: '13px' }} />
            <span>Edit</span>
          </button>
        </div>
      ),
    },
  ];

  const totalStaff = staffList.length;
  const activeStaff = staffList.filter((s) => s.status === 'Active').length;
  const onLeaveStaff = staffList.filter((s) => s.status === 'On Leave').length;
  const nurseCount = staffList.filter((s) => s.role === 'Nurse').length;

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
              Staff Management
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
              Hospital Operations & Duty Roster
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Administer nursing staff, receptionists, laboratory personnel, pharmacy specialists, and shift schedules.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={handleExportCSV}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '7px',
              padding: '9px 15px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              color: '#334155',
              fontSize: '13px',
              fontWeight: 600,
              border: '1px solid #CBD5E1',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
          >
            <Download style={{ width: '15px', height: '15px', color: '#64748B' }} />
            <span>Export Roster</span>
          </button>

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
            <span>Add Staff</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Total Hospital Staff
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A' }}>{totalStaff}</span>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>personnel</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #BBF7D0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#047857', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            On-Floor Active
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#047857' }}>{activeStaff}</span>
            <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>duty ready</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #BFDBFE', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Clinical Nursing Staff
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#1D4ED8' }}>{nurseCount}</span>
            <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600 }}>registered RNs</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #FDE68A', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#B45309', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            On Leave / Standby
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#B45309' }}>{onLeaveStaff}</span>
            <span style={{ fontSize: '12px', color: '#D97706', fontWeight: 600 }}>temporary absence</span>
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
        {/* Department Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto' }}>
          {[
            { id: 'all', label: `All Departments (${staffList.length})` },
            { id: 'Front Desk', label: 'Front Desk' },
            { id: 'Cardiology', label: 'Cardiology' },
            { id: 'Laboratory', label: 'Laboratory' },
            { id: 'Pharmacy', label: 'Pharmacy' },
            { id: 'Emergency', label: 'Emergency' },
          ].map((d) => {
            const active = deptFilter === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setDeptFilter(d.id)}
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
                {d.label}
              </button>
            );
          })}
        </div>

        {/* Shift Filter & Search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select
            value={shiftFilter}
            onChange={(e) => setShiftFilter(e.target.value)}
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
            <option value="all">All Shifts</option>
            <option value="morning">Morning Shift</option>
            <option value="day">Day Shift</option>
            <option value="night">Night Shift</option>
          </select>

          <div style={{ position: 'relative', width: '220px' }}>
            <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#94A3B8' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search staff, dept, role..."
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
          data={filteredStaff}
          searchable={false}
          emptyMessage="No hospital staff members found matching the criteria."
        />
      </div>

      {/* Add Staff Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Onboard New Staff Member"
        subtitle="Add a clinical nurse, technician, pharmacist, or administrative clerk to the hospital roster."
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
              form="admin-add-staff-form"
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
              <span>Save & Onboard</span>
            </button>
          </div>
        }
      >
        <form id="admin-add-staff-form" onSubmit={handleAddStaff} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
              Full Name <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="text"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. Jessica Taylor, RN"
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                Role
              </label>
              <select
                value={formRole}
                onChange={(e) => setFormRole(e.target.value)}
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
                <option value="Nurse">Nurse</option>
                <option value="Receptionist">Receptionist</option>
                <option value="Lab Technician">Lab Technician</option>
                <option value="Pharmacist">Pharmacist</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                Department
              </label>
              <select
                value={formDept}
                onChange={(e) => setFormDept(e.target.value)}
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
                <option value="Front Desk">Front Desk</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Laboratory">Laboratory</option>
                <option value="Pharmacy">Pharmacy</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
                Email Address
              </label>
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder="staff@medflow.com"
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                Shift Schedule
              </label>
              <select
                value={formShift}
                onChange={(e) => setFormShift(e.target.value)}
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
                <option value="Morning (7AM - 3PM)">Morning (7AM - 3PM)</option>
                <option value="Day (8AM - 4PM)">Day (8AM - 4PM)</option>
                <option value="Day (9AM - 5PM)">Day (9AM - 5PM)</option>
                <option value="Night (11PM - 7AM)">Night (11PM - 7AM)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                Duty Status
              </label>
              <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value)}
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
                <option value="Active">Active Duty</option>
                <option value="On Leave">On Leave</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>

      {/* Edit Staff Modal */}
      {editingStaff && (
        <Modal
          isOpen={!!editingStaff}
          onClose={() => setEditingStaff(null)}
          title={`Edit Staff Profile - ${editingStaff.name}`}
          subtitle={`Update department assignments, contact, and duty shifts for ID: ${editingStaff.id}`}
          size="md"
          footer={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setEditingStaff(null)}
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
                form="admin-edit-staff-form"
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
                <Save style={{ width: '15px', height: '15px' }} />
                <span>Save Changes</span>
              </button>
            </div>
          }
        >
          <form id="admin-edit-staff-form" onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Role
                </label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
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
                  <option value="Nurse">Nurse</option>
                  <option value="Receptionist">Receptionist</option>
                  <option value="Lab Technician">Lab Technician</option>
                  <option value="Pharmacist">Pharmacist</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Department
                </label>
                <select
                  value={editDept}
                  onChange={(e) => setEditDept(e.target.value)}
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
                  <option value="Front Desk">Front Desk</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
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
                  Email Address
                </label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
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

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Shift
                </label>
                <select
                  value={editShift}
                  onChange={(e) => setEditShift(e.target.value)}
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
                  <option value="Morning (7AM - 3PM)">Morning (7AM - 3PM)</option>
                  <option value="Day (8AM - 4PM)">Day (8AM - 4PM)</option>
                  <option value="Day (9AM - 5PM)">Day (9AM - 5PM)</option>
                  <option value="Night (11PM - 7AM)">Night (11PM - 7AM)</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Duty Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
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
                  <option value="Active">Active Duty</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {/* Staff Profile & Duty Modal */}
      {selectedStaff && (
        <Modal
          isOpen={!!selectedStaff}
          onClose={() => setSelectedStaff(null)}
          title={`Staff Profile - ${selectedStaff.name}`}
          subtitle={`Staff ID: ${selectedStaff.id} &bull; Joined ${formatDisplayDate(selectedStaff.joinDate)}`}
          size="md"
          footer={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <button
                onClick={() => {
                  const s = selectedStaff;
                  setSelectedStaff(null);
                  handleOpenEdit(s);
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: 700,
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: '#F8FAFC',
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                <Edit3 style={{ width: '14px', height: '14px' }} />
                <span>Edit Staff Member</span>
              </button>

              <button
                onClick={() => setSelectedStaff(null)}
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: 600,
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  backgroundColor: 'white',
                  color: '#475569',
                  cursor: 'pointer'
                }}
              >
                Close
              </button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderRadius: '12px',
                backgroundColor: '#F8FAFC',
                border: '1px solid #E2E8F0'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <Avatar name={selectedStaff.name} size="lg" />
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    {selectedStaff.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px', fontSize: '12px', color: '#64748B' }}>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{selectedStaff.role}</span>
                    <span>&bull;</span>
                    <span>{selectedStaff.department}</span>
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
                  backgroundColor: selectedStaff.status === 'Active' ? '#F0FDF4' : '#FFFBEB',
                  color: selectedStaff.status === 'Active' ? '#15803D' : '#B45309',
                  border: `1px solid ${selectedStaff.status === 'Active' ? '#BBF7D0' : '#FDE68A'}`
                }}
              >
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: selectedStaff.status === 'Active' ? '#22C55E' : '#F59E0B'
                  }}
                />
                {selectedStaff.status}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contact Details</span>
                <p style={{ margin: '6px 0 2px 0', fontSize: '12px', fontWeight: 600, color: '#1E293B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Phone style={{ width: '13px', height: '13px', color: '#2563EB' }} />
                  {selectedStaff.phone}
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail style={{ width: '13px', height: '13px', color: '#64748B' }} />
                  {selectedStaff.email}
                </p>
              </div>

              <div style={{ padding: '12px', borderRadius: '10px', backgroundColor: 'white', border: '1px solid #E2E8F0' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Assigned Duty Shift</span>
                <p style={{ margin: '6px 0 2px 0', fontSize: '12px', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Clock style={{ width: '13px', height: '13px', color: '#16A34A' }} />
                  {selectedStaff.shift}
                </p>
                <p style={{ margin: 0, fontSize: '11px', color: '#64748B' }}>
                  Department: <strong style={{ color: '#334155' }}>{selectedStaff.department}</strong>
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminStaff;

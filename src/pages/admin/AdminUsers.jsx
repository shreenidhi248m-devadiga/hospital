import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Users,
  Shield,
  UserCheck,
  UserX,
  Calendar,
  Eye,
  Edit3,
  Trash2,
  Mail,
  CheckCircle2,
  UserPlus,
  Download,
  KeyRound,
  Lock,
  Stethoscope,
  Briefcase,
  User
} from 'lucide-react';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import DataTable from '../../components/ui/DataTable';
import Modal from '../../components/ui/Modal';

const initialUsers = [
  { id: 'U001', name: 'Sarah Johnson', email: 'patient@medflow.com', role: 'patient', status: 'Active', lastLogin: '2026-09-26' },
  { id: 'U002', name: 'Dr. Michael Chen', email: 'doctor@medflow.com', role: 'doctor', status: 'Active', lastLogin: '2026-09-26' },
  { id: 'U003', name: 'Emily Rodriguez', email: 'staff@medflow.com', role: 'staff', status: 'Active', lastLogin: '2026-09-25' },
  { id: 'U004', name: 'James Wilson', email: 'admin@medflow.com', role: 'admin', status: 'Active', lastLogin: '2026-09-26' },
  { id: 'U005', name: 'Dr. Emily Watson', email: 'dr.watson@medflow.com', role: 'doctor', status: 'Active', lastLogin: '2026-09-24' },
  { id: 'U006', name: 'John Davis', email: 'john.d@email.com', role: 'patient', status: 'Inactive', lastLogin: '2026-09-10' },
];

const formatDisplayDate = (dateStr) => {
  if (!dateStr) return 'Never';
  const parts = dateStr.split('-');
  if (parts.length === 3) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(parts[1], 10) - 1]} ${parseInt(parts[2], 10)}, ${parts[0]}`;
  }
  return dateStr;
};

const roleConfig = {
  admin: { label: 'Administrator', bg: '#FDF2F8', color: '#BE185D', border: '#FBCFE8', icon: Shield },
  doctor: { label: 'Doctor (MD)', bg: '#F0FDF4', color: '#15803D', border: '#BBF7D0', icon: Stethoscope },
  staff: { label: 'Hospital Staff', bg: '#FFFBEB', color: '#B45309', border: '#FDE68A', icon: Briefcase },
  patient: { label: 'Patient', bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE', icon: User },
};

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Add User Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formRole, setFormRole] = useState('patient');
  const [formStatus, setFormStatus] = useState('Active');
  const [formPassword, setFormPassword] = useState('TempPass@2026');

  // Edit User Form State
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('patient');
  const [editStatus, setEditStatus] = useState('Active');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim()) return;

    const newUser = {
      id: `U00${users.length + 1}`,
      name: formName.trim(),
      email: formEmail.trim(),
      role: formRole,
      status: formStatus,
      lastLogin: new Date().toISOString().split('T')[0]
    };

    setUsers([newUser, ...users]);
    setIsAddModalOpen(false);
    setFormName('');
    setFormEmail('');
    setFormRole('patient');
    setFormStatus('Active');
    setFormPassword('TempPass@2026');
    showToast(`Created account for ${newUser.name} with ${newUser.role} role!`);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
    setEditStatus(user.status);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingUser) return;

    const updated = {
      ...editingUser,
      name: editName.trim(),
      email: editEmail.trim(),
      role: editRole,
      status: editStatus
    };

    setUsers(users.map((u) => (u.id === editingUser.id ? updated : u)));
    setEditingUser(null);
    showToast(`Updated profile and permissions for ${updated.name}!`);
  };

  const handleToggleStatus = (user) => {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    setUsers(users.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)));
    showToast(`${user.name} account set to ${newStatus}`);
  };

  const handleDeleteUser = () => {
    if (!userToDelete) return;
    setUsers(users.filter((u) => u.id !== userToDelete.id));
    showToast(`Deleted user account ${userToDelete.name}`);
    setUserToDelete(null);
  };

  const handleExportCSV = () => {
    const headers = ['User ID', 'Name', 'Email', 'Role', 'Status', 'Last Login'];
    const rows = users.map((u) => [
      `"${u.id}"`,
      `"${u.name}"`,
      `"${u.email}"`,
      `"${u.role}"`,
      `"${u.status}"`,
      `"${u.lastLogin || 'Never'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `system_users_directory_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('User directory exported successfully!');
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      !searchTerm ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const columns = [
    {
      key: 'name',
      label: 'System User',
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
      label: 'Assigned Role',
      render: (val) => {
        const conf = roleConfig[val] || roleConfig.patient;
        const IconComponent = conf.icon;
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '3px 9px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: conf.bg,
              color: conf.color,
              border: `1px solid ${conf.border}`
            }}
          >
            <IconComponent style={{ width: '12px', height: '12px' }} />
            {conf.label}
          </span>
        );
      },
    },
    {
      key: 'status',
      label: 'Account Status',
      render: (val, row) => {
        const isActive = val === 'Active';
        return (
          <button
            onClick={() => handleToggleStatus(row)}
            title="Click to toggle account status"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '3px 9px',
              borderRadius: '16px',
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: isActive ? '#F0FDF4' : '#F1F5F9',
              color: isActive ? '#15803D' : '#64748B',
              border: `1px solid ${isActive ? '#BBF7D0' : '#CBD5E1'}`,
              cursor: 'pointer'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: isActive ? '#22C55E' : '#94A3B8'
              }}
            />
            {val}
          </button>
        );
      },
    },
    {
      key: 'lastLogin',
      label: 'Last Sign In',
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
            title="Edit User Role & Credentials"
          >
            <Edit3 style={{ width: '13px', height: '13px' }} />
            <span>Edit</span>
          </button>

          <button
            onClick={() => setUserToDelete(row)}
            style={{
              padding: '5px 9px',
              fontSize: '11px',
              fontWeight: 700,
              borderRadius: '8px',
              backgroundColor: '#FEF2F2',
              color: '#DC2626',
              border: '1px solid #FECACA',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'background-color 0.15s ease'
            }}
            title="Revoke and Delete Account"
          >
            <Trash2 style={{ width: '13px', height: '13px' }} />
            <span>Delete</span>
          </button>
        </div>
      ),
    },
  ];

  const totalCount = users.length;
  const activeCount = users.filter((u) => u.status === 'Active').length;
  const doctorCount = users.filter((u) => u.role === 'doctor').length;
  const adminStaffCount = users.filter((u) => u.role === 'admin' || u.role === 'staff').length;

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
              User Management
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
              Access & Security Directory
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Administer system user credentials, security clearance tiers, role permissions, and active login sessions.
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
            <span>Export CSV</span>
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
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Total User Accounts
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A' }}>{totalCount}</span>
            <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>registered</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #BBF7D0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#047857', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Active Accounts
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#047857' }}>{activeCount}</span>
            <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>
              {Math.round((activeCount / totalCount) * 100)}% enabled
            </span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #BFDBFE', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Licensed Doctors
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#1D4ED8' }}>{doctorCount}</span>
            <span style={{ fontSize: '12px', color: '#2563EB', fontWeight: 600 }}>clinical staff</span>
          </div>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #FBCFE8', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#BE185D', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Operations & Admin
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '8px' }}>
            <span style={{ fontSize: '26px', fontWeight: 900, color: '#BE185D' }}>{adminStaffCount}</span>
            <span style={{ fontSize: '12px', color: '#9D174D', fontWeight: 600 }}>elevated access</span>
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
        {/* Role Filter Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto' }}>
          {[
            { id: 'all', label: `All Roles (${users.length})` },
            { id: 'patient', label: `Patients (${users.filter((u) => u.role === 'patient').length})` },
            { id: 'doctor', label: `Doctors (${users.filter((u) => u.role === 'doctor').length})` },
            { id: 'staff', label: `Staff (${users.filter((u) => u.role === 'staff').length})` },
            { id: 'admin', label: `Admins (${users.filter((u) => u.role === 'admin').length})` },
          ].map((r) => {
            const active = roleFilter === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRoleFilter(r.id)}
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
                {r.label}
              </button>
            );
          })}
        </div>

        {/* Status Filter & Search Input */}
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
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div style={{ position: 'relative', width: '220px' }}>
            <Search style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '15px', height: '15px', color: '#94A3B8' }} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search user, email..."
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
          data={filteredUsers}
          searchable={false}
          emptyMessage="No system users found matching the filter criteria."
        />
      </div>

      {/* Add User Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Create New User Account"
        subtitle="Provision portal login credentials and assign security role access permissions."
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
              form="admin-add-user-form"
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
              <span>Create Account</span>
            </button>
          </div>
        }
      >
        <form id="admin-add-user-form" onSubmit={handleAddUser} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
              Full Legal Name <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="text"
              required
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              placeholder="e.g. Dr. Robert Vance"
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
              Email Address (Login Username) <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              type="email"
              required
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
              placeholder="user@medflow.com"
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
                System Role & Clearance
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
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="staff">Staff Member</option>
                <option value="admin">Administrator</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                Initial Account Status
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
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
              Temporary Initial Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
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
            <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748B' }}>
              User will be prompted to reset password on their first login session.
            </p>
          </div>
        </form>
      </Modal>

      {/* Edit User Modal */}
      {editingUser && (
        <Modal
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          title={`Edit User Account - ${editingUser.name}`}
          subtitle={`Update authentication permissions, email, and roles for ID: ${editingUser.id}`}
          size="md"
          footer={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
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
                form="admin-edit-user-form"
                style={{
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
                Save Changes
              </button>
            </div>
          }
        >
          <form id="admin-edit-user-form" onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                Email Address
              </label>
              <input
                type="email"
                required
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
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                  <option value="staff">Staff Member</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                  Status
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
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete User Confirmation Modal */}
      {userToDelete && (
        <Modal
          isOpen={!!userToDelete}
          onClose={() => setUserToDelete(null)}
          title="Revoke & Delete Account"
          subtitle="Are you sure you want to delete this user account from the central MedFlow system?"
          size="sm"
          footer={
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setUserToDelete(null)}
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
                type="button"
                onClick={handleDeleteUser}
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  borderRadius: '9px',
                  border: 'none',
                  backgroundColor: '#DC2626',
                  color: 'white',
                  cursor: 'pointer',
                  boxShadow: '0 1px 3px rgba(220,38,38,0.25)'
                }}
              >
                Delete Account
              </button>
            </div>
          }
        >
          <div style={{ padding: '10px 0', fontSize: '13px', color: '#475569', lineHeight: '1.6' }}>
            You are about to delete the user profile for <strong style={{ color: '#0F172A' }}>{userToDelete.name}</strong> ({userToDelete.email}). This will terminate all active sessions and revoke portal access immediately.
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminUsers;

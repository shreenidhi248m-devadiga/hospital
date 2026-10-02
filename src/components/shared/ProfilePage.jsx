
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, MapPin, Shield, Camera, Save,
  CheckCircle2, Lock, KeyRound, Smartphone, Bell, Calendar, Sparkles, Check
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const ProfilePage = () => {
  const { user, updateUser } = useAuthStore();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [editing, setEditing] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [tfaEnabled, setTfaEnabled] = useState(false);
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [profileImage, setProfileImage] = useState(user?.avatar || null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+91 98765 12345',
    address: '123 Oak Street, Springfield, IL 62701',
    dob: '1992-05-14',
    gender: 'Female',
    emergencyContact: 'Robert Johnson (+91 98765 99999)',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageResult = event.target.result;
        setProfileImage(imageResult);
        if (updateUser) {
          updateUser({ avatar: imageResult });
        }
        setToastMsg('Profile photo updated successfully!');
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveInfo = (e) => {
    e.preventDefault();
    setEditing(false);
    if (updateUser) {
      updateUser({ name: formData.name, phone: formData.phone });
    }
    setToastMsg('Profile settings updated successfully!');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setShowPasswordForm(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setToastMsg('Account password updated successfully!');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 4000);
  };

  const roleLabels = { patient: 'Patient', doctor: 'Doctor', staff: 'Staff', admin: 'Administrator' };
  const roleColors = {
    patient: { bg: '#EFF6FF', text: '#1E40AF', border: '#BFDBFE' },
    doctor: { bg: '#F0FDFA', text: '#0F766E', border: '#99F6E4' },
    staff: { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
    admin: { bg: '#F5F3FF', text: '#6D28D9', border: '#DDD6FE' },
  };
  const rc = roleColors[user?.role] || roleColors.patient;
  const initials = user?.name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* Hidden File Picker Input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />

      {/* Top Header Banner */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '26px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.2 }}>
          Account Profile & Settings
        </h1>
        <p style={{ fontSize: '13px', color: '#64748B', margin: '4px 0 0', fontWeight: 500 }}>
          Manage your personal information, security credentials, and system preferences
        </p>
      </div>

      {/* Toast Alert Feedback */}
      {savedSuccess && (
        <div style={{
          backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46',
          padding: '12px 18px', borderRadius: '12px', marginBottom: '20px',
          display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', fontWeight: 600,
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)'
        }}>
          <CheckCircle2 size={18} style={{ color: '#059669', flexShrink: 0 }} />
          <span>{toastMsg || 'Profile settings updated successfully!'}</span>
        </div>
      )}

      {/* Main Grid Layout */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* HERO AVATAR CARD */}
        <div style={{
          backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB',
          padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>

            {/* Avatar Container with Camera Trigger */}
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '20px',
                background: 'linear-gradient(135deg, #0F2B5B 0%, #1E40AF 100%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', fontWeight: 800, color: 'white',
                boxShadow: '0 4px 12px rgba(15, 43, 91, 0.25)',
                overflow: 'hidden'
              }}>
                {(profileImage || user?.avatar) ? (
                  <img
                    src={profileImage || user?.avatar}
                    alt="Profile Avatar"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  initials
                )}
              </div>

              {/* Camera Icon Button triggers file picker */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  position: 'absolute', bottom: '-4px', right: '-4px',
                  width: '32px', height: '32px', borderRadius: '50%',
                  backgroundColor: '#2563EB', border: '2px solid white', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                  transition: 'transform 0.15s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
                title="Click to choose a new profile photo"
              >
                <Camera size={15} />
              </button>
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111827', margin: 0 }}>
                  {formData.name}
                </h2>
                <span style={{
                  padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                  textTransform: 'uppercase', letterSpacing: '0.05em',
                  backgroundColor: rc.bg, color: rc.text, border: `1px solid ${rc.border}`
                }}>
                  {roleLabels[user?.role] || user?.role}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#4B5563', margin: '4px 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} style={{ color: '#9CA3AF' }} /> {formData.email}
              </p>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={13} style={{ color: '#059669' }} /> Account Verified &bull; ID: #MF-8921
              </p>
            </div>
          </div>
        </div>

        {/* PERSONAL DETAILS CARD */}
        <div style={{
          backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB',
          padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={18} style={{ color: '#2563EB' }} /> Personal Details
              </h3>
              <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0' }}>Your verified contact and identity information</p>
            </div>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                style={{
                  padding: '8px 16px', borderRadius: '8px', border: '1px solid #D1D5DB',
                  backgroundColor: 'white', color: '#374151', fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
              >
                Edit Details
              </button>
            ) : (
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  style={{
                    padding: '8px 14px', borderRadius: '8px', border: '1px solid #D1D5DB',
                    backgroundColor: 'white', color: '#6B7280', fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveInfo}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '8px 16px', borderRadius: '8px', border: 'none',
                    backgroundColor: '#2563EB', color: 'white', fontSize: '13px', fontWeight: 700, cursor: 'pointer'
                  }}
                >
                  <Save size={14} /> Save Changes
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSaveInfo} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>Full Name</label>
              <input
                type="text"
                disabled={!editing}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{
                  width: '100%', padding: '9px 14px', fontSize: '13px', borderRadius: '8px',
                  border: editing ? '1px solid #3B82F6' : '1px solid #E5E7EB',
                  backgroundColor: editing ? 'white' : '#F9FAFB', color: '#111827', outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>Email Address</label>
              <input
                type="email"
                disabled
                value={formData.email}
                style={{
                  width: '100%', padding: '9px 14px', fontSize: '13px', borderRadius: '8px',
                  border: '1px solid #E5E7EB', backgroundColor: '#F3F4F6', color: '#6B7280', cursor: 'not-allowed'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>Phone Number</label>
              <input
                type="text"
                disabled={!editing}
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  width: '100%', padding: '9px 14px', fontSize: '13px', borderRadius: '8px',
                  border: editing ? '1px solid #3B82F6' : '1px solid #E5E7EB',
                  backgroundColor: editing ? 'white' : '#F9FAFB', color: '#111827', outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>Date of Birth</label>
              <input
                type="date"
                disabled={!editing}
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                style={{
                  width: '100%', padding: '9px 14px', fontSize: '13px', borderRadius: '8px',
                  border: editing ? '1px solid #3B82F6' : '1px solid #E5E7EB',
                  backgroundColor: editing ? 'white' : '#F9FAFB', color: '#111827', outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>Gender</label>
              <select
                disabled={!editing}
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                style={{
                  width: '100%', padding: '9px 14px', fontSize: '13px', borderRadius: '8px',
                  border: editing ? '1px solid #3B82F6' : '1px solid #E5E7EB',
                  backgroundColor: editing ? 'white' : '#F9FAFB', color: '#111827', outline: 'none'
                }}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>Emergency Contact</label>
              <input
                type="text"
                disabled={!editing}
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                style={{
                  width: '100%', padding: '9px 14px', fontSize: '13px', borderRadius: '8px',
                  border: editing ? '1px solid #3B82F6' : '1px solid #E5E7EB',
                  backgroundColor: editing ? 'white' : '#F9FAFB', color: '#111827', outline: 'none'
                }}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '4px' }}>Home Address</label>
              <input
                type="text"
                disabled={!editing}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                style={{
                  width: '100%', padding: '9px 14px', fontSize: '13px', borderRadius: '8px',
                  border: editing ? '1px solid #3B82F6' : '1px solid #E5E7EB',
                  backgroundColor: editing ? 'white' : '#F9FAFB', color: '#111827', outline: 'none'
                }}
              />
            </div>
          </form>
        </div>

        {/* SECURITY CARD */}
        <div style={{
          backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB',
          padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={18} style={{ color: '#059669' }} /> Security & Authentication
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>

            {/* Password Row */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px', borderRadius: '12px', backgroundColor: '#F9FAFB', border: '1px solid #F3F4F6'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <KeyRound size={20} style={{ color: '#2563EB' }} />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>Account Password</p>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0' }}>Last updated 30 days ago</p>
                </div>
              </div>
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                style={{
                  padding: '8px 16px', borderRadius: '8px', border: '1px solid #D1D5DB',
                  backgroundColor: 'white', color: '#374151', fontSize: '13px', fontWeight: 600, cursor: 'pointer'
                }}
              >
                {showPasswordForm ? 'Cancel' : 'Change Password'}
              </button>
            </div>

            {/* Password Expansion Form */}
            {showPasswordForm && (
              <form onSubmit={handlePasswordSubmit} style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1E40AF', marginBottom: '4px' }}>Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    style={{ width: '100%', padding: '8px 12px', fontSize: '13px', borderRadius: '8px', border: '1px solid #93C5FD', outline: 'none' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1E40AF', marginBottom: '4px' }}>New Password</label>
                    <input
                      type="password"
                      required
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', fontSize: '13px', borderRadius: '8px', border: '1px solid #93C5FD', outline: 'none' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#1E40AF', marginBottom: '4px' }}>Confirm New Password</label>
                    <input
                      type="password"
                      required
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      style={{ width: '100%', padding: '8px 12px', fontSize: '13px', borderRadius: '8px', border: '1px solid #93C5FD', outline: 'none' }}
                    />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <button
                    type="submit"
                    style={{ padding: '8px 16px', borderRadius: '8px', backgroundColor: '#2563EB', color: 'white', fontSize: '13px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
                  >
                    Update Password
                  </button>
                </div>
              </form>
            )}

            {/* 2FA Row */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '16px', borderRadius: '12px', backgroundColor: '#F9FAFB', border: '1px solid #F3F4F6'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#F0FDFA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Smartphone size={20} style={{ color: '#0D9488' }} />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#111827', margin: 0 }}>Two-Factor Authentication (2FA)</p>
                  <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0' }}>Add SMS or Authenticator App verification</p>
                </div>
              </div>
              <button
                onClick={() => setTfaEnabled(!tfaEnabled)}
                style={{
                  padding: '8px 16px', borderRadius: '8px',
                  border: tfaEnabled ? '1px solid #059669' : '1px solid #D1D5DB',
                  backgroundColor: tfaEnabled ? '#ECFDF5' : 'white',
                  color: tfaEnabled ? '#047857' : '#374151',
                  fontSize: '13px', fontWeight: 700, cursor: 'pointer'
                }}
              >
                {tfaEnabled ? '2FA Enabled' : 'Enable 2FA'}
              </button>
            </div>
          </div>
        </div>

        {/* PREFERENCES CARD */}
        <div style={{
          backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB',
          padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#111827', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={18} style={{ color: '#D97706' }} /> Notification Preferences
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '10px', backgroundColor: '#F9FAFB', cursor: 'pointer' }}>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>Email Notifications</p>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0' }}>Receive appointment reminders & lab updates via email</p>
              </div>
              <input
                type="checkbox"
                checked={emailNotifs}
                onChange={(e) => setEmailNotifs(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#2563EB' }}
              />
            </label>

            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: '10px', backgroundColor: '#F9FAFB', cursor: 'pointer' }}>
              <div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>SMS Text Notifications</p>
                <p style={{ fontSize: '12px', color: '#6B7280', margin: '2px 0 0' }}>Instant queue status alerts sent to your mobile phone</p>
              </div>
              <input
                type="checkbox"
                checked={smsNotifs}
                onChange={(e) => setSmsNotifs(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#2563EB' }}
              />
            </label>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;

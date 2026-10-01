import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Save,
  Globe,
  Bell,
  Database,
  Mail,
  Shield,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  HardDrive,
  RefreshCw,
  Sliders,
  Lock,
  Server,
  Zap,
  RotateCcw,
  Check
} from 'lucide-react';
import Modal from '../../components/ui/Modal';

const AdminSettings = () => {
  // General Info State
  const [hospitalName, setHospitalName] = useState('MedFlow General Hospital');
  const [registrationNo, setRegistrationNo] = useState('MED-HOSP-2024-9841');
  const [contactEmail, setContactEmail] = useState('admin@medflow.com');
  const [phone, setPhone] = useState('+1 (555) 000-0000');
  const [emergencyHotline, setEmergencyHotline] = useState('+1 (555) 911-0000');
  const [address, setAddress] = useState('123 Healthcare Blvd, Springfield');
  const [timezone, setTimezone] = useState('America/New_York (EST)');
  const [currency, setCurrency] = useState('USD ($)');

  // Notification Toggles
  const [notifications, setNotifications] = useState({
    emailAppointments: true,
    smsReminders: true,
    staffShiftAlerts: true,
    maintenanceAlerts: false,
    emergencyBroadcast: true,
    labResultsReady: true,
  });

  // System Infrastructure Settings
  const [backupSchedule, setBackupSchedule] = useState('Daily at 02:00 AM');
  const [backupRetention, setBackupRetention] = useState('30 days');
  const [rateLimit, setRateLimit] = useState(100);
  const [sessionTimeout, setSessionTimeout] = useState('30 minutes');
  const [hipaaMode, setHipaaMode] = useState(true);
  const [auditLogLevel, setAuditLogLevel] = useState('Verbose (Full Trace)');

  // Modals & Feedback
  const [activeModal, setActiveModal] = useState(null); // 'backup', 'rateLimit', 'timeout'
  const [toastMessage, setToastMessage] = useState(null);
  const [isBackingUp, setIsBackingUp] = useState(false);

  // Active Tab
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'general', 'notifications', 'infrastructure'

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleToggle = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
    showToast(`Notification preference updated`);
  };

  const handleSaveAll = (e) => {
    e?.preventDefault();
    showToast('All hospital system settings saved successfully!');
  };

  const handleRestoreDefaults = () => {
    setHospitalName('MedFlow General Hospital');
    setContactEmail('admin@medflow.com');
    setPhone('+1 (555) 000-0000');
    setAddress('123 Healthcare Blvd, Springfield');
    setNotifications({
      emailAppointments: true,
      smsReminders: true,
      staffShiftAlerts: true,
      maintenanceAlerts: false,
      emergencyBroadcast: true,
      labResultsReady: true,
    });
    setBackupSchedule('Daily at 02:00 AM');
    setRateLimit(100);
    setSessionTimeout('30 minutes');
    showToast('Restored default configuration settings');
  };

  const triggerManualBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      setActiveModal(null);
      showToast('Manual backup snapshot completed & encrypted (142.8 MB)');
    }, 1200);
  };

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
              System Settings & Configuration
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
              <Sliders style={{ width: '12px', height: '12px' }} />
              Global Administration
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Configure hospital identification, automated notification gateways, data backup routines, and security policies.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            type="button"
            onClick={handleRestoreDefaults}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 15px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              color: '#475569',
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
            <RotateCcw style={{ width: '14px', height: '14px', color: '#64748B' }} />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 18px',
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
            <Save style={{ width: '15px', height: '15px' }} />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Status Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            System Core Status
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#22C55E' }} />
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A' }}>100% Operational</span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>
            All microservices & databases healthy
          </p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #BBF7D0', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#047857', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Automated Backup
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '8px' }}>
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#047857' }}>Encrypted</span>
            <span style={{ fontSize: '12px', color: '#059669', fontWeight: 600 }}>AES-256</span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>
            Last snapshot: Today, 02:00 AM
          </p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #BFDBFE', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#1D4ED8', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Notification Relays
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '8px' }}>
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#1D4ED8' }}>Email & SMS</span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563EB', backgroundColor: '#EFF6FF', padding: '1px 6px', borderRadius: '4px' }}>
              Online
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>
            Dispatch latency: 42ms avg
          </p>
        </div>

        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #FBCFE8', padding: '16px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#BE185D', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
            Compliance & Privacy
          </span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '8px' }}>
            <span style={{ fontSize: '20px', fontWeight: 900, color: '#BE185D' }}>HIPAA Active</span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748B' }}>
            Audit trace enabled on all PHI access
          </p>
        </div>
      </div>

      {/* Navigation Filter Tabs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
        {[
          { id: 'all', label: 'All Settings' },
          { id: 'general', label: 'Hospital Identity' },
          { id: 'notifications', label: 'Notification Dispatch' },
          { id: 'system', label: 'System & Security' },
        ].map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '6px 14px',
                fontSize: '13px',
                fontWeight: 700,
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: active ? '#2563EB' : '#F1F5F9',
                color: active ? '#FFFFFF' : '#475569',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Section 1: General Hospital Identity */}
      {(activeTab === 'all' || activeTab === 'general') && (
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe style={{ width: '20px', height: '20px', color: '#2563EB' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Hospital Identity & Facility Information
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                Public facility details, registration credentials, and contact coordinates shown on official charts and invoices.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Hospital Name
              </label>
              <input
                type="text"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '9px',
                  outline: 'none',
                  color: '#0F172A',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Healthcare License / Registry ID
              </label>
              <input
                type="text"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '9px',
                  outline: 'none',
                  color: '#0F172A',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Central Administrative Email
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '9px',
                  outline: 'none',
                  color: '#0F172A',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Reception Desk Phone
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '9px',
                  outline: 'none',
                  color: '#0F172A',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Facility Street Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  fontSize: '13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '9px',
                  outline: 'none',
                  color: '#0F172A',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                System Time Zone
              </label>
              <select
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 10px',
                  fontSize: '13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '9px',
                  outline: 'none',
                  color: '#0F172A',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box'
                }}
              >
                <option value="America/New_York (EST)">America/New_York (EST - UTC-5)</option>
                <option value="America/Chicago (CST)">America/Chicago (CST - UTC-6)</option>
                <option value="America/Los_Angeles (PST)">America/Los_Angeles (PST - UTC-8)</option>
                <option value="Asia/Kolkata (IST)">Asia/Kolkata (IST - UTC+5:30)</option>
                <option value="Europe/London (GMT)">Europe/London (GMT - UTC+0)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Billing Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 10px',
                  fontSize: '13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '9px',
                  outline: 'none',
                  color: '#0F172A',
                  backgroundColor: '#FFFFFF',
                  boxSizing: 'border-box'
                }}
              >
                <option value="USD ($)">USD ($) - United States Dollar</option>
                <option value="INR (₹)">INR (₹) - Indian Rupee</option>
                <option value="EUR (€)">EUR (€) - Euro</option>
                <option value="GBP (£)">GBP (£) - British Pound</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Section 2: Automated Notifications */}
      {(activeTab === 'all' || activeTab === 'notifications') && (
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bell style={{ width: '20px', height: '20px', color: '#D97706' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Automated Notification & Dispatch Gateways
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                Configure real-time SMS triggers, email confirmations, shift change alerts, and clinical emergency broadcasts.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                key: 'emailAppointments',
                title: 'Email Confirmation for New Appointments',
                desc: 'Immediately dispatch calendar invitation and booking summary to patients upon schedule confirmation.',
              },
              {
                key: 'smsReminders',
                title: 'SMS Reminders to Patients (24h Ahead)',
                desc: 'Send automated text reminder with doctor name, room number, and check-in instructions.',
              },
              {
                key: 'labResultsReady',
                title: 'Diagnostic & Lab Report Ready Alerts',
                desc: 'Notify patients and attending physicians as soon as laboratory tests are uploaded and verified.',
              },
              {
                key: 'staffShiftAlerts',
                title: 'Staff Shift Handover & Duty Change Alerts',
                desc: 'Broadcast duty roster updates, shift transitions, and urgent on-call shift swap notifications.',
              },
              {
                key: 'emergencyBroadcast',
                title: 'Critical Emergency Code Broadcasts',
                desc: 'Instant priority push notification to emergency department and floor nurses for Code Blue/Trauma.',
              },
              {
                key: 'maintenanceAlerts',
                title: 'System Maintenance & Infrastructure Notifications',
                desc: 'Notify administrative staff 48 hours prior to scheduled database snapshots or server updates.',
              },
            ].map((item) => {
              const isEnabled = notifications[item.key];
              return (
                <div
                  key={item.key}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    backgroundColor: isEnabled ? '#F8FAFC' : '#FFFFFF',
                    border: `1px solid ${isEnabled ? '#CBD5E1' : '#E2E8F0'}`,
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ paddingRight: '20px' }}>
                    <p style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>
                      {item.title}
                    </p>
                    <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Rock-solid Custom Toggle Switch */}
                  <button
                    type="button"
                    onClick={() => handleToggle(item.key)}
                    style={{
                      width: '46px',
                      height: '24px',
                      borderRadius: '999px',
                      backgroundColor: isEnabled ? '#2563EB' : '#CBD5E1',
                      border: 'none',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'background-color 0.2s ease',
                      flexShrink: 0,
                      padding: '2px',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title={isEnabled ? 'Click to disable' : 'Click to enable'}
                  >
                    <span
                      style={{
                        display: 'block',
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#FFFFFF',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
                        transform: isEnabled ? 'translateX(22px)' : 'translateX(0px)',
                        transition: 'transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section 3: System Infrastructure & Security */}
      {(activeTab === 'all' || activeTab === 'system') && (
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #F1F5F9' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Database style={{ width: '20px', height: '20px', color: '#16A34A' }} />
            </div>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                System Infrastructure & Security Policies
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                Control automated cloud backups, API throttling thresholds, authentication timeouts, and HIPAA audit logging.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Automatic Backups Card */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <HardDrive style={{ width: '18px', height: '18px', color: '#2563EB' }} />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                    Automated Database Backups
                  </p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                    Schedule: <strong style={{ color: '#0F172A' }}>{backupSchedule}</strong> &bull; Retention: {backupRetention} &bull; Target: AWS S3 Encrypted
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setActiveModal('backup')}
                  style={{
                    padding: '7px 14px',
                    fontSize: '12px',
                    fontWeight: 700,
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    color: '#2563EB',
                    border: '1px solid #BFDBFE',
                    cursor: 'pointer'
                  }}
                >
                  Configure
                </button>
              </div>
            </div>

            {/* API Rate Limiting */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Zap style={{ width: '18px', height: '18px', color: '#16A34A' }} />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                    API Rate Limiting & DDoS Shield
                  </p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                    Threshold: <strong style={{ color: '#0F172A' }}>{rateLimit} requests / minute</strong> per IP &bull; DDoS mitigation active
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal('rateLimit')}
                style={{
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#2563EB',
                  border: '1px solid #BFDBFE',
                  cursor: 'pointer'
                }}
              >
                Configure
              </button>
            </div>

            {/* Session Security Timeout */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', borderRadius: '12px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', backgroundColor: '#FAF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock style={{ width: '18px', height: '18px', color: '#8B5CF6' }} />
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>
                    Inactivity Session Timeout
                  </p>
                  <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                    Auto-terminate portal session after: <strong style={{ color: '#0F172A' }}>{sessionTimeout}</strong> of inactivity
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal('timeout')}
                style={{
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  color: '#2563EB',
                  border: '1px solid #BFDBFE',
                  cursor: 'pointer'
                }}
              >
                Configure
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating/Bottom Action Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 24px',
          backgroundColor: '#0F172A',
          color: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Shield style={{ width: '20px', height: '20px', color: '#38BDF8' }} />
          <div>
            <span style={{ fontSize: '13px', fontWeight: 800, display: 'block' }}>
              System Changes Are Protected
            </span>
            <span style={{ fontSize: '11px', color: '#94A3B8' }}>
              Modifications are recorded to the central audit log under administrator ID JW-001.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSaveAll}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 22px',
            borderRadius: '10px',
            backgroundColor: '#2563EB',
            color: 'white',
            fontSize: '13px',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(37,99,235,0.3)',
            transition: 'background-color 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
        >
          <Save style={{ width: '16px', height: '16px' }} />
          <span>Save All Settings</span>
        </button>
      </div>

      {/* Backup Configuration Modal */}
      {activeModal === 'backup' && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="Configure Database Backups"
          subtitle="Set routine cloud snapshot frequencies, encrypted archival, and retention policies."
          size="md"
          footer={
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
              <button
                type="button"
                disabled={isBackingUp}
                onClick={triggerManualBackup}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  fontSize: '12px',
                  fontWeight: 700,
                  borderRadius: '8px',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  border: '1px solid #BFDBFE',
                  cursor: isBackingUp ? 'not-allowed' : 'pointer'
                }}
              >
                <RefreshCw style={{ width: '13px', height: '13px', animation: isBackingUp ? 'spin 1s linear infinite' : 'none' }} />
                <span>{isBackingUp ? 'Backing Up...' : 'Run Backup Now'}</span>
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
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
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setActiveModal(null);
                    showToast('Backup schedule updated successfully');
                  }}
                  style={{
                    padding: '8px 18px',
                    fontSize: '13px',
                    fontWeight: 700,
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#2563EB',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Save Schedule
                </button>
              </div>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                Automated Backup Frequency
              </label>
              <select
                value={backupSchedule}
                onChange={(e) => setBackupSchedule(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 10px',
                  fontSize: '13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  outline: 'none',
                  color: '#0F172A',
                  backgroundColor: 'white'
                }}
              >
                <option value="Daily at 02:00 AM">Daily at 02:00 AM (Recommended)</option>
                <option value="Twice Daily (12:00 AM & 12:00 PM)">Twice Daily (12:00 AM & 12:00 PM)</option>
                <option value="Hourly Incremental">Hourly Incremental Snapshots</option>
                <option value="Weekly (Sundays at 01:00 AM)">Weekly (Sundays at 01:00 AM)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                Snapshot Retention Window
              </label>
              <select
                value={backupRetention}
                onChange={(e) => setBackupRetention(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 10px',
                  fontSize: '13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  outline: 'none',
                  color: '#0F172A',
                  backgroundColor: 'white'
                }}
              >
                <option value="14 days">14 Days</option>
                <option value="30 days">30 Days (HIPAA Standard)</option>
                <option value="90 days">90 Days</option>
                <option value="365 days">1 Year (Long-term Archive)</option>
              </select>
            </div>
          </div>
        </Modal>
      )}

      {/* Rate Limit Modal */}
      {activeModal === 'rateLimit' && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="API Rate Limiting & Throttling"
          subtitle="Safeguard hospital database against denial of service and runaway traffic."
          size="md"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', width: '100%' }}>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
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
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  showToast('API throttling threshold updated');
                }}
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#2563EB',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Save Limits
              </button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                Max Requests Per Minute (Per IP Address)
              </label>
              <input
                type="number"
                min="20"
                max="1000"
                step="10"
                value={rateLimit}
                onChange={(e) => setRateLimit(Number(e.target.value))}
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
              <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748B' }}>
                Standard recommendation: 100 requests per minute for hospital workstations.
              </p>
            </div>
          </div>
        </Modal>
      )}

      {/* Session Timeout Modal */}
      {activeModal === 'timeout' && (
        <Modal
          isOpen={true}
          onClose={() => setActiveModal(null)}
          title="Inactivity Session Timeout"
          subtitle="Automatically log out inactive doctor and admin workstations to protect patient data."
          size="md"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', width: '100%' }}>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
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
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveModal(null);
                  showToast('Session security policy updated');
                }}
                style={{
                  padding: '8px 18px',
                  fontSize: '13px',
                  fontWeight: 700,
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#2563EB',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Apply Timeout
              </button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '5px' }}>
                Inactivity Window Before Forced Logout
              </label>
              <select
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 10px',
                  fontSize: '13px',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  outline: 'none',
                  color: '#0F172A',
                  backgroundColor: 'white'
                }}
              >
                <option value="15 minutes">15 Minutes (High Security)</option>
                <option value="30 minutes">30 Minutes (Recommended)</option>
                <option value="60 minutes">1 Hour</option>
                <option value="120 minutes">2 Hours</option>
              </select>
              <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#64748B' }}>
                Workstation locks automatically and requires password re-entry.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminSettings;

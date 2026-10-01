import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Calendar,
  Activity,
  DollarSign,
  ArrowRight,
  UserPlus,
  Stethoscope,
  UserCog,
  LayoutDashboard,
  TrendingUp,
  Download,
  Building2,
  Star,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { analyticsData, mockDoctors, mockPatients, mockStaff } from '../../data/mockData';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

const AdminDashboard = () => {
  const { user } = useAuthStore();
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const totalPatientsCount = 2450;
  const activeDoctorsCount = mockDoctors.length;
  const totalStaffCount = mockStaff.length;

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

      {/* Neat Executive Hospital Welcome Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', minWidth: '280px' }}>
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              backgroundColor: '#EFF6FF',
              border: '1px solid #BFDBFE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#2563EB',
              flexShrink: 0
            }}
          >
            <LayoutDashboard style={{ width: '26px', height: '26px' }} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
                Hospital Executive Overview
              </h1>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 700,
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  border: '1px solid #A7F3D0'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                Hospital System: Operational
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B', fontWeight: 500 }}>
              Welcome back, <strong>{user?.name || 'James Wilson'}</strong> &bull; Complete analytics for outpatient, clinical revenue, and patient satisfaction.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => showToast('Monthly analytical report exported to PDF.')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 15px',
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              color: '#475569',
              fontSize: '13px',
              fontWeight: 700,
              border: '1px solid #CBD5E1',
              cursor: 'pointer',
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
          >
            <Download style={{ width: '15px', height: '15px' }} />
            <span>Export Report</span>
          </button>

          <Link
            to="/admin/users"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 16px',
              borderRadius: '10px',
              backgroundColor: '#2563EB',
              color: 'white',
              fontSize: '13px',
              fontWeight: 700,
              border: 'none',
              textDecoration: 'none',
              boxShadow: '0 1px 3px rgba(37, 99, 235, 0.25)',
              transition: 'background-color 0.15s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1D4ED8')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
          >
            <UserPlus style={{ width: '15px', height: '15px' }} />
            <span>+ Add New User</span>
          </Link>
        </div>
      </div>

      {/* 4 Clean Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {/* Metric 1 */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Total Patients
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users style={{ width: '18px', height: '18px' }} />
            </div>
          </div>
          <div style={{ marginTop: '12px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em' }}>2,450</span>
            <span style={{ fontSize: '12px', color: '#64748B', marginLeft: '6px', fontWeight: 600 }}>registered</span>
          </div>
          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: '#ECFDF5', color: '#065F46', border: '1px solid #A7F3D0' }}>
              &uarr; 12% this month
            </span>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>&bull; +280 new</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Active Doctors
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#F0FDFA', color: '#0D9488', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Stethoscope style={{ width: '18px', height: '18px' }} />
            </div>
          </div>
          <div style={{ marginTop: '12px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em' }}>{activeDoctorsCount}</span>
            <span style={{ fontSize: '12px', color: '#64748B', marginLeft: '6px', fontWeight: 600 }}>on duty</span>
          </div>
          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: '#EFF6FF', color: '#1E40AF', border: '1px solid #BFDBFE' }}>
              100% attendance
            </span>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>&bull; 6 departments</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Today's Revenue
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign style={{ width: '18px', height: '18px' }} />
            </div>
          </div>
          <div style={{ marginTop: '12px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em' }}>₹2,45,000</span>
          </div>
          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: '#ECFDF5', color: '#065F46', border: '1px solid #A7F3D0' }}>
              &uarr; 8% vs yesterday
            </span>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>&bull; OPD + Diagnostics</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Daily Appointments
            </span>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar style={{ width: '18px', height: '18px' }} />
            </div>
          </div>
          <div style={{ marginTop: '12px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', letterSpacing: '-0.03em' }}>156</span>
            <span style={{ fontSize: '12px', color: '#64748B', marginLeft: '6px', fontWeight: 600 }}>booked</span>
          </div>
          <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', backgroundColor: '#FEF3C7', color: '#92400E', border: '1px solid #FDE68A' }}>
              94% capacity
            </span>
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>&bull; 12 walk-ins</span>
          </div>
        </div>
      </div>

      {/* Row 2: Charts (2 Columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        
        {/* Patient Visits Chart */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Patient Visits & New Registrations
              </h2>
              <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                10-Month outpatient census and patient acquisition trajectory
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', fontWeight: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563EB' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
                <span>Total Visits</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0D9488' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#0D9488' }} />
                <span>New Patients</span>
              </div>
            </div>
          </div>

          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.patientVisits} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.06)',
                    fontWeight: 600
                  }}
                />
                <Area type="monotone" dataKey="visits" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#colorVisits)" />
                <Line type="monotone" dataKey="newPatients" stroke="#0D9488" strokeWidth={2} dot={{ r: 3, fill: '#0D9488' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue vs Expenses Chart */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '22px 24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Revenue vs Operating Expenses
              </h2>
              <p style={{ margin: '3px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                Financial breakdown and operating margins (in ₹ Thousands)
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', fontWeight: 600 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2563EB' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#2563EB' }} />
                <span>Revenue</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94A3B8' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: '#CBD5E1' }} />
                <span>Expenses</span>
              </div>
            </div>
          </div>

          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.revenue} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: '10px',
                    border: '1px solid #E2E8F0',
                    fontSize: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.06)',
                    fontWeight: 600
                  }}
                  formatter={(v) => [`₹${v.toLocaleString()}`, '']}
                />
                <Bar dataKey="revenue" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" fill="#CBD5E1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 3: Department Load, Quick Actions, Patient Satisfaction (3 Columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
        
        {/* Col 1: Department Load */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '22px 24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Department Distribution
              </h2>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  border: '1px solid #BFDBFE'
                }}
              >
                6 Clinics
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
              Patient consultations by clinical specialty
            </p>

            {/* Donut Chart with Center KPI */}
            <div style={{ position: 'relative', width: '100%', height: '170px', marginTop: '8px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.departmentLoad}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={72}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {analyticsData.departmentLoad.map((entry, i) => (
                      <Cell key={i} fill={entry.color} strokeWidth={2} stroke="#ffffff" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderRadius: '8px',
                      color: 'white',
                      border: 'none',
                      fontSize: '12px',
                      padding: '8px 12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>

              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}
              >
                <span style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>1,600</span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '2px' }}>Consults</span>
              </div>
            </div>

            {/* Clean Department Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {analyticsData.departmentLoad.map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: d.color }} />
                    <span style={{ fontWeight: 600, color: '#334155' }}>{d.name}</span>
                  </div>
                  <span style={{ fontWeight: 800, color: '#0F172A' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Col 2: Quick Actions */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '22px 24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Administrative Shortcuts
              </h2>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backgroundColor: '#F1F5F9',
                  color: '#475569',
                  border: '1px solid #CBD5E1'
                }}
              >
                Staff Portal
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
              Fast access to user roles, doctor rosters, and patient records
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
              {[
                { icon: UserPlus, label: 'Add New User', desc: 'Create doctor, patient, or staff login', to: '/admin/users' },
                { icon: Stethoscope, label: 'Manage Doctors', desc: 'Duty rosters, specialties, and schedules', to: '/admin/doctors' },
                { icon: Users, label: 'Patient Directory', desc: 'Master health records and registrations', to: '/admin/patients' },
                { icon: UserCog, label: 'Staff Management', desc: 'Reception, nurses, and laboratory staff', to: '/admin/staff' },
              ].map((item, i) => (
                <Link key={i} to={item.to} style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: '12px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      transition: 'all 0.15s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#EFF6FF';
                      e.currentTarget.style.borderColor = '#BFDBFE';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                      e.currentTarget.style.borderColor = '#E2E8F0';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          backgroundColor: '#FFFFFF',
                          color: '#2563EB',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid #E2E8F0',
                          flexShrink: 0
                        }}
                      >
                        <item.icon style={{ width: '18px', height: '18px' }} />
                      </div>
                      <div>
                        <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', display: 'block' }}>
                          {item.label}
                        </span>
                        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 500 }}>
                          {item.desc}
                        </span>
                      </div>
                    </div>
                    <ChevronRight style={{ width: '16px', height: '16px', color: '#94A3B8' }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Col 3: Patient Satisfaction */}
        <div
          style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '22px 24px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Patient Satisfaction
              </h2>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '12px',
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  border: '1px solid #A7F3D0'
                }}
              >
                4.5 / 5.0 ⭐
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>
              Post-visit patient feedback ratings across 5 key metrics
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '16px' }}>
              {analyticsData.satisfaction.map((item, i) => {
                const percentage = (item.score / 5) * 100;
                return (
                  <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span style={{ fontWeight: 600, color: '#334155' }}>{item.category}</span>
                      <span style={{ fontWeight: 800, color: '#0F172A' }}>{item.score} / 5</span>
                    </div>
                    <div style={{ width: '100%', height: '7px', backgroundColor: '#F1F5F9', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${percentage}%`,
                          height: '100%',
                          borderRadius: '4px',
                          backgroundColor: percentage >= 90 ? '#10B981' : '#2563EB',
                          transition: 'width 0.6s ease'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div
            style={{
              paddingTop: '12px',
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              color: '#64748B',
              marginTop: '16px'
            }}
          >
            <span>Based on <strong>450+ patient surveys</strong></span>
            <span style={{ color: '#10B981', fontWeight: 700 }}>92% Positive</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

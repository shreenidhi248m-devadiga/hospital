import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Award,
  Clock,
  ArrowUpRight,
  Download,
  Calendar,
  Filter,
  CheckCircle2,
  BarChart3,
  PieChart as PieIcon,
  Activity,
  FileText,
  Sparkles,
  Star,
  Building,
  Bed,
  HeartPulse
} from 'lucide-react';
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
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { analyticsData } from '../../data/mockData';

const departmentDetails = [
  { name: 'Pediatrics', visits: 310, revenue: '$485,000', doctorCount: 4, satisfaction: 4.8, color: '#F59E0B' },
  { name: 'Cardiology', visits: 280, revenue: '$620,000', doctorCount: 3, satisfaction: 4.9, color: '#3B82F6' },
  { name: 'Orthopedics', visits: 250, revenue: '$410,000', doctorCount: 3, satisfaction: 4.6, color: '#06B6D4' },
  { name: 'Neurology', visits: 210, revenue: '$540,000', doctorCount: 2, satisfaction: 4.7, color: '#8B5CF6' },
  { name: 'Surgery', visits: 195, revenue: '$780,000', doctorCount: 4, satisfaction: 4.8, color: '#10B981' },
  { name: 'Dermatology', visits: 165, revenue: '$290,000', doctorCount: 2, satisfaction: 4.5, color: '#EF4444' },
];

const CustomTooltip = ({ active, payload, label, prefix = '', suffix = '' }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#0F172A',
          color: 'white',
          padding: '10px 14px',
          borderRadius: '10px',
          fontSize: '12px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
          border: '1px solid #334155'
        }}
      >
        <p style={{ fontWeight: 700, margin: '0 0 6px 0', color: '#94A3B8' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={`item-${index}`} style={{ margin: '3px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: entry.color || entry.fill }} />
            <span style={{ color: '#E2E8F0', fontWeight: 500 }}>{entry.name}:</span>
            <span style={{ fontWeight: 800, color: 'white' }}>
              {prefix}{typeof entry.value === 'number' ? entry.value.toLocaleString() : entry.value}{suffix}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const AdminAnalytics = () => {
  const [timeRange, setTimeRange] = useState('year');
  const [activeTab, setActiveTab] = useState('overview');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExportReport = () => {
    const reportData = [
      'Hospital Performance & Executive Analytics Summary',
      `Generated On: ${new Date().toLocaleString()}`,
      `Selected Range: ${timeRange === 'year' ? 'Year to Date 2026' : timeRange === 'quarter' ? 'Q3 2026' : 'Last 30 Days'}`,
      '',
      '--- FINANCIAL METRICS ---',
      'Total Annual Revenue: $3,580,000',
      'Operating Expenditures: $2,185,000',
      'Net Surplus Margin: $1,395,000 (39.0%)',
      '',
      '--- PATIENT VOLUME ---',
      'Total Annual Visits: 15,290',
      'New Patient Intake: 2,265 (14.8%)',
      'Overall Patient Satisfaction: 4.5 / 5.0 (94%)',
      '',
      '--- DEPARTMENT BREAKDOWN ---',
      ...departmentDetails.map((d) => `${d.name}: ${d.visits} cases, ${d.revenue} revenue, CSAT: ${d.satisfaction}/5.0`)
    ].join('\n');

    const blob = new Blob([reportData], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `medflow_executive_report_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Executive performance report exported successfully!');
  };

  // Calculations
  const totalRevenue = analyticsData.revenue.reduce((acc, curr) => acc + curr.revenue, 0);
  const totalExpenses = analyticsData.revenue.reduce((acc, curr) => acc + curr.expenses, 0);
  const netMargin = totalRevenue - totalExpenses;
  const marginPercent = ((netMargin / totalRevenue) * 100).toFixed(1);
  const totalVisits = analyticsData.patientVisits.reduce((acc, curr) => acc + curr.visits, 0);
  const totalDepartmentCases = analyticsData.departmentLoad.reduce((acc, curr) => acc + curr.value, 0);

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
              Analytics & Executive Reports
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
              <Activity style={{ width: '12px', height: '12px' }} />
              Hospital BI Hub
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748B' }}>
            Real-time business intelligence covering patient census, fiscal sustainability, departmental workload, and clinical quality.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Timeframe Selector */}
          <div style={{ display: 'flex', backgroundColor: '#F1F5F9', padding: '3px', borderRadius: '10px' }}>
            {[
              { id: 'month', label: '30 Days' },
              { id: 'quarter', label: 'Quarterly' },
              { id: 'year', label: 'Year to Date' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTimeRange(t.id)}
                style={{
                  padding: '6px 12px',
                  fontSize: '12px',
                  fontWeight: 700,
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  backgroundColor: timeRange === t.id ? '#FFFFFF' : 'transparent',
                  color: timeRange === t.id ? '#0F172A' : '#64748B',
                  boxShadow: timeRange === t.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Export Report Button */}
          <button
            onClick={handleExportReport}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
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
            <Download style={{ width: '15px', height: '15px' }} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {/* Total Census */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Patient Census
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users style={{ width: '16px', height: '16px', color: '#2563EB' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '10px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A' }}>
              {totalVisits.toLocaleString()}
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#16A34A', display: 'flex', alignItems: 'center' }}>
              <TrendingUp style={{ width: '13px', height: '13px', marginRight: '2px' }} /> +12.4%
            </span>
          </div>
          <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#64748B' }}>
            2,265 first-time patient admissions this year
          </p>
        </div>

        {/* Gross Revenue */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Gross Revenue (YTD)
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign style={{ width: '16px', height: '16px', color: '#16A34A' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '10px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A' }}>
              ${(totalRevenue / 1000000).toFixed(2)}M
            </span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#16A34A', display: 'flex', alignItems: 'center' }}>
              <TrendingUp style={{ width: '13px', height: '13px', marginRight: '2px' }} /> +8.7%
            </span>
          </div>
          <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#64748B' }}>
            ${(netMargin / 1000000).toFixed(2)}M operating surplus ({marginPercent}%)
          </p>
        </div>

        {/* Bed Utilization */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Bed & Room Occupancy
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FAF5FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Bed style={{ width: '16px', height: '16px', color: '#8B5CF6' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '10px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A' }}>
              87.4%
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#8B5CF6', backgroundColor: '#F3E8FF', padding: '2px 7px', borderRadius: '6px' }}>
              Optimal
            </span>
          </div>
          <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#64748B' }}>
            Average patient inpatient stay: 3.2 days
          </p>
        </div>

        {/* Patient Satisfaction */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Quality & Satisfaction
            </span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Star style={{ width: '16px', height: '16px', color: '#D97706', fill: '#F59E0B' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '10px' }}>
            <span style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A' }}>
              4.5 <span style={{ fontSize: '16px', color: '#94A3B8', fontWeight: 500 }}>/ 5.0</span>
            </span>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#B45309', backgroundColor: '#FEF3C7', padding: '2px 7px', borderRadius: '6px' }}>
              94% CSAT
            </span>
          </div>
          <p style={{ margin: '6px 0 0 0', fontSize: '12px', color: '#64748B' }}>
            Calculated across 2,400+ post-discharge surveys
          </p>
        </div>
      </div>

      {/* Row 1: Patient Census Area Chart + Revenue Bar Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        
        {/* Chart 1: Patient Census Trend */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Patient Visits Trend
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                Monthly inpatient admissions and outpatient consultation throughput
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', fontWeight: 700 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#2563EB' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#2563EB' }} />
                Total Visits
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#0D9488' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0D9488' }} />
                New Patients
              </span>
            </div>
          </div>

          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData.patientVisits} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="tealGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0D9488" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#0D9488" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="visits" name="Total Visits" stroke="#2563EB" strokeWidth={2.5} fill="url(#blueGradient)" activeDot={{ r: 5, fill: '#2563EB', stroke: '#EFF6FF', strokeWidth: 2 }} />
                <Area type="monotone" dataKey="newPatients" name="New Patients" stroke="#0D9488" strokeWidth={2} fill="url(#tealGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Metrics Bar Under Chart */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Peak Volume</span>
              <p style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>1,850 (Sep)</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Monthly Average</span>
              <p style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>1,529 visits</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Returning Ratio</span>
              <p style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: 800, color: '#16A34A' }}>85.2%</p>
            </div>
          </div>
        </div>

        {/* Chart 2: Revenue vs Expenses Dual Bar */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Revenue & Expenditure Overview
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                Comparison of departmental gross receipts vs hospital operating costs
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', fontWeight: 700 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#3B82F6' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#3B82F6' }} />
                Revenue
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10B981' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#10B981' }} />
                Expenses
              </span>
            </div>
          </div>

          <div style={{ height: '280px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.revenue} margin={{ top: 10, right: 10, left: -5, bottom: 0 }} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B', fontWeight: 600 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip content={<CustomTooltip prefix="$" />} />
                <Bar dataKey="revenue" name="Revenue" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Expenses" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick Metrics Bar Under Chart */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Highest Month</span>
              <p style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>$435k (Sep)</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Avg Monthly Costs</span>
              <p style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>$218.5k</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Surplus Margin</span>
              <p style={{ margin: '2px 0 0 0', fontSize: '14px', fontWeight: 800, color: '#16A34A' }}>+{marginPercent}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Department Caseload (Modern Donut + Legend) & Patient Satisfaction Scores */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '20px' }}>
        
        {/* Chart 3: Department Caseload Distribution */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Department Caseload Distribution
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                Proportion of clinical patient visits segmented by medical specialty
              </p>
            </div>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', backgroundColor: '#EFF6FF', padding: '3px 10px', borderRadius: '8px' }}>
              6 Specialties
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.4fr', alignItems: 'center', gap: '16px' }}>
            {/* Modern Donut Chart with Center Metric */}
            <div style={{ position: 'relative', height: '230px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.departmentLoad}
                    cx="50%"
                    cy="50%"
                    innerRadius={68}
                    outerRadius={95}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {analyticsData.departmentLoad.map((entry, i) => (
                      <Cell key={i} fill={entry.color} stroke="white" strokeWidth={2} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0F172A', color: 'white', borderRadius: '8px', border: 'none', fontSize: '12px' }}
                    formatter={(val, name) => [`${val} patients (${((val / totalDepartmentCases) * 100).toFixed(0)}%)`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ position: 'absolute', textAlign: 'center', pointerEvents: 'none' }}>
                <span style={{ fontSize: '24px', fontWeight: 900, color: '#0F172A', display: 'block', lineHeight: '1.1' }}>
                  {totalDepartmentCases}
                </span>
                <span style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Active Cases</span>
              </div>
            </div>

            {/* Structured Legend List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {analyticsData.departmentLoad.map((d) => {
                const percent = ((d.value / totalDepartmentCases) * 100).toFixed(1);
                return (
                  <div
                    key={d.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 10px',
                      borderRadius: '8px',
                      backgroundColor: '#F8FAFC',
                      fontSize: '12px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: d.color, flexShrink: 0 }} />
                      <span style={{ fontWeight: 700, color: '#1E293B' }}>{d.name}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#64748B', fontWeight: 500 }}>{d.value} cases</span>
                      <span style={{ fontWeight: 800, color: '#0F172A', width: '38px', textAlign: 'right' }}>
                        {percent}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Chart 4: Patient Satisfaction & Quality Metrics */}
        <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                Patient Satisfaction & Care Quality
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
                Aggregated survey metrics scored on a clinical 5.0 star scale
              </p>
            </div>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 800, color: '#15803D', backgroundColor: '#F0FDF4', padding: '3px 10px', borderRadius: '8px' }}>
              <Star style={{ width: '12px', height: '12px', fill: '#16A34A', color: '#16A34A' }} />
              Top Quartile
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '6px' }}>
            {analyticsData.satisfaction.map((item) => {
              const scorePercent = (item.score / 5) * 100;
              const isTop = item.score >= 4.5;
              return (
                <div key={item.category}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#1E293B' }}>
                        {item.category}
                      </span>
                      {isTop && (
                        <span style={{ fontSize: '10px', fontWeight: 800, color: '#047857', backgroundColor: '#DCFCE7', padding: '1px 6px', borderRadius: '4px' }}>
                          Exemplary
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 900, color: '#0F172A' }}>
                        {item.score.toFixed(1)}
                      </span>
                      <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 600 }}>/ 5.0</span>
                    </div>
                  </div>

                  {/* Progress Bar with Gradient */}
                  <div style={{ width: '100%', height: '9px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${scorePercent}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      style={{
                        height: '100%',
                        borderRadius: '999px',
                        background: item.score >= 4.5
                          ? 'linear-gradient(90deg, #10B981, #059669)'
                          : 'linear-gradient(90deg, #3B82F6, #2563EB)'
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '16px', paddingTop: '14px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ color: '#64748B', fontWeight: 500 }}>
              National Healthcare Benchmark: <strong style={{ color: '#0F172A' }}>4.1 / 5.0</strong>
            </span>
            <span style={{ color: '#16A34A', fontWeight: 700 }}>
              +9.8% Above National Average
            </span>
          </div>
        </div>
      </div>

      {/* Row 3: Department Performance Breakdown Table */}
      <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Clinical Department Operational Matrix
            </h2>
            <p style={{ margin: '2px 0 0 0', fontSize: '12px', color: '#64748B' }}>
              Comparative breakdown of patient volume, revenue yield, attending physician density, and quality ratings
            </p>
          </div>
          <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569' }}>
            All Active Wards
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', fontSize: '13px', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Department</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Monthly Visits</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Revenue Yield</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Physicians</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>CSAT Rating</th>
                <th style={{ padding: '12px 16px', fontSize: '11px', fontWeight: 700, color: '#475569', textTransform: 'uppercase' }}>Performance</th>
              </tr>
            </thead>
            <tbody>
              {departmentDetails.map((dept, i) => (
                <tr
                  key={dept.name}
                  style={{
                    borderBottom: i < departmentDetails.length - 1 ? '1px solid #F1F5F9' : 'none',
                    transition: 'background-color 0.15s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: dept.color }} />
                      <span style={{ fontWeight: 800, color: '#0F172A' }}>{dept.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 600, color: '#334155' }}>
                    {dept.visits} admissions
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: 700, color: '#0F172A' }}>
                    {dept.revenue}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#475569', fontWeight: 500 }}>
                    {dept.doctorCount} Doctors
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontWeight: 700, color: '#0F172A' }}>
                      <Star style={{ width: '13px', height: '13px', fill: '#F59E0B', color: '#F59E0B' }} />
                      {dept.satisfaction}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        backgroundColor: '#F0FDF4',
                        color: '#15803D',
                        border: '1px solid #BBF7D0'
                      }}
                    >
                      <ArrowUpRight style={{ width: '12px', height: '12px' }} />
                      Optimal Target
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;

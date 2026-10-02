import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import {
  Activity,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Stethoscope,
  Heart,
  Shield,
  UserCog,
  CheckCircle2,
  Users,
  Calendar,
  ShieldCheck,
  Star,
  FileText
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const LoginPage = () => {
  const [showPw, setShowPw] = useState(false);
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const u = await login(data.email, data.password);
      navigate(`/${u.role}`);
    } catch { }
  };

  const demoLogin = async (email) => {
    try {
      const u = await login(email, 'password123');
      navigate(`/${u.role}`);
    } catch { }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: '#FFFFFF' }}>

      {/* LEFT COLUMN: Authentication Form */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '32px 40px',
          backgroundColor: '#FFFFFF',
          overflowY: 'auto'
        }}
      >
        {/* Top Navigation Bar: Back to Landing Page & Logo */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 14px',
              borderRadius: '10px',
              backgroundColor: '#F8FAFC',
              border: '1px solid #E2E8F0',
              color: '#334155',
              fontSize: '13px',
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              transition: 'all 0.15s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#EFF6FF';
              e.currentTarget.style.borderColor = '#BFDBFE';
              e.currentTarget.style.color = '#2563EB';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#F8FAFC';
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.color = '#334155';
            }}
          >
            <ArrowLeft style={{ width: '15px', height: '15px' }} />
            <span>Back to Home</span>
          </Link>

          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{ width: '32px', height: '32px', backgroundColor: '#0F2B5B', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity style={{ width: '16px', height: '16px', color: 'white' }} />
            </div>
            <span style={{ fontSize: '16px', fontWeight: 800, color: '#0F2B5B' }}>MedFlow</span>
          </Link>
        </div>

        {/* Center Container: Main Sign In Card */}
        <div style={{ maxWidth: '420px', width: '100%', margin: '40px auto' }}>
          <div>
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
                border: '1px solid #BFDBFE',
                marginBottom: '12px'
              }}
            >
              <Sparkles style={{ width: '12px', height: '12px' }} />
              Healthcare Portal
            </span>
            <h1 style={{ fontSize: '26px', fontWeight: 900, color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
              Welcome back
            </h1>
            <p style={{ marginTop: '6px', fontSize: '13px', color: '#64748B' }}>
              Sign in with your verified credentials to access your clinical dashboard.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                marginTop: '16px',
                padding: '10px 14px',
                borderRadius: '10px',
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#DC2626',
                fontSize: '13px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <span>{error}</span>
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94A3B8' }} />
                <input
                  type="email"
                  placeholder="name@medflow.com"
                  style={{
                    width: '100%',
                    padding: '10px 14px 10px 38px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#0F172A',
                    backgroundColor: '#F8FAFC',
                    border: `1px solid ${errors.email ? '#EF4444' : '#CBD5E1'}`,
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'all 0.15s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563EB';
                    e.target.style.backgroundColor = '#FFFFFF';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.email ? '#EF4444' : '#CBD5E1';
                    e.target.style.boxShadow = 'none';
                  }}
                  {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })}
                  onChange={() => clearError()}
                />
              </div>
              {errors.email && (
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#EF4444', fontWeight: 600 }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#94A3B8' }} />
                <input
                  type={showPw ? 'text' : 'password'}
                  placeholder="Enter password"
                  style={{
                    width: '100%',
                    padding: '10px 40px 10px 38px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#0F172A',
                    backgroundColor: '#F8FAFC',
                    border: `1px solid ${errors.password ? '#EF4444' : '#CBD5E1'}`,
                    borderRadius: '10px',
                    outline: 'none',
                    transition: 'all 0.15s ease',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563EB';
                    e.target.style.backgroundColor = '#FFFFFF';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = errors.password ? '#EF4444' : '#CBD5E1';
                    e.target.style.boxShadow = 'none';
                  }}
                  {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
                  onChange={() => clearError()}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#94A3B8',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#EF4444', fontWeight: 600 }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569', cursor: 'pointer', userSelect: 'none' }}>
                <input type="checkbox" style={{ width: '15px', height: '15px', accentColor: '#2563EB', cursor: 'pointer' }} />
                <span>Remember this device</span>
              </label>
              <Link to="/forgot-password" style={{ fontSize: '12px', fontWeight: 700, color: '#2563EB', textDecoration: 'none' }}>
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '11px 18px',
                fontSize: '14px',
                fontWeight: 700,
                color: 'white',
                backgroundColor: isLoading ? '#94A3B8' : '#0F2B5B',
                border: 'none',
                borderRadius: '10px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 6px rgba(15, 43, 91, 0.25)',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = '#1E3E62';
              }}
              onMouseLeave={(e) => {
                if (!isLoading) e.currentTarget.style.backgroundColor = '#0F2B5B';
              }}
            >
              {isLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          <p style={{ marginTop: '18px', textAlign: 'center', fontSize: '13px', color: '#64748B' }}>
            New to MedFlow?{' '}
            <Link to="/register" style={{ fontWeight: 800, color: '#2563EB', textDecoration: 'none' }}>
              Create an account
            </Link>
          </p>

          {/* Quick Demo Logins Section */}
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #F1F5F9' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles style={{ width: '13px', height: '13px', color: '#2563EB' }} />
                <span style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#64748B' }}>
                  Quick Role Logins
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: 500 }}>Click to test</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { role: 'Patient', sub: 'Sarah J.', email: 'patient@medflow.com', icon: Heart, color: '#2563EB', bg: '#EFF6FF', border: '#BFDBFE' },
                { role: 'Doctor', sub: 'Dr. Chen', email: 'doctor@medflow.com', icon: Stethoscope, color: '#0D9488', bg: '#F0FDFA', border: '#99F6E4' },
                { role: 'Staff', sub: 'Front Desk', email: 'staff@medflow.com', icon: UserCog, color: '#D97706', bg: '#FFFBEB', border: '#FDE68A' },
                { role: 'Admin', sub: 'Full Access', email: 'admin@medflow.com', icon: Shield, color: '#7C3AED', bg: '#F5F3FF', border: '#DDD6FE' },
              ].map((d) => (
                <button
                  key={d.role}
                  type="button"
                  onClick={() => demoLogin(d.email)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '10px',
                    border: `1px solid ${d.border}`,
                    backgroundColor: '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'left',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.02)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = d.bg;
                    e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                    e.currentTarget.style.boxShadow = '0 1px 2px rgba(0,0,0,0.02)';
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: d.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <d.icon style={{ width: '16px', height: '16px', color: d.color }} />
                  </div>
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A', display: 'block', lineHeight: '1.2' }}>
                      {d.role}
                    </span>
                    <span style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>
                      {d.sub}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer Notice */}
        <div style={{ textAlign: 'center', fontSize: '11px', color: '#94A3B8' }}>
          &copy; 2026 MedFlow Health Systems. End-to-end encrypted under HIPAA standards.
        </div>
      </div>

      {/* RIGHT COLUMN: Stylish Brand Showcase & Visual */}
      <div
        className="hidden lg:flex"
        style={{
          width: '48%',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #091931 0%, #0F2B5B 50%, #1E40AF 100%)',
          position: 'relative',
          overflow: 'hidden',
          padding: '48px'
        }}
      >
        {/* Subtle Geometric Background Elements */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,184,166,0.15) 0%, transparent 70%)' }} />

        {/* Glassmorphic Central Card */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '440px',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            borderRadius: '24px',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '36px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Top Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '20px', backgroundColor: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#38BDF8', fontSize: '11px', fontWeight: 700, marginBottom: '20px' }}>
            <ShieldCheck style={{ width: '13px', height: '13px' }} />
            <span>Hospital-Grade Operating System</span>
          </div>

          {/* Logo Badge */}
          <div style={{ width: '56px', height: '56px', backgroundColor: 'rgba(255, 255, 255, 0.12)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.15)', marginBottom: '20px' }}>
            <Activity style={{ width: '28px', height: '28px', color: 'white' }} />
          </div>

          <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'white', lineHeight: '1.25', margin: 0 }}>
            Intelligent Clinical Workflow & Patient Care
          </h2>
          <p style={{ marginTop: '12px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)', lineHeight: '1.6' }}>
            Streamline patient queues, centralize medical records, coordinate doctor shifts, and deliver faster clinical outcomes.
          </p>

          {/* 4 Feature Highlights with Icons */}
          <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { title: 'Real-Time Patient Queue Intelligence', icon: Users, color: '#38BDF8' },
              { title: 'Encrypted Electronic Health Records (EMR)', icon: ShieldCheck, color: '#4ADE80' },
              { title: 'Integrated Physician & Ward Scheduling', icon: Calendar, color: '#FBBF24' },
              { title: 'AI-Powered Diagnostic Document Review', icon: Sparkles, color: '#C084FC' },
            ].map((f, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '7px', backgroundColor: 'rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <f.icon style={{ width: '15px', height: '15px', color: f.color }} />
                </div>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'rgba(255, 255, 255, 0.9)' }}>
                  {f.title}
                </span>
              </div>
            ))}
          </div>

          {/* Social Proof Footer */}
          <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} style={{ width: '13px', height: '13px', fill: '#FBBF24', color: '#FBBF24' }} />
              ))}
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'white', marginLeft: '4px' }}>4.9/5</span>
            </div>
            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 600 }}>
              99.98% System Uptime SLA
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

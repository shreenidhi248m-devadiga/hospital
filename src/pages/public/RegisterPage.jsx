import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Activity, User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, Heart, Stethoscope, UserCog, Shield, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('patient');
  const { register: registerUser, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      const user = await registerUser({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
        phone: data.phone,
        role: selectedRole,
      });
      navigate(`/${user.role}`);
    } catch {
      // error handled by store
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px 12px 44px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#111827',
    backgroundColor: '#F9FAFB',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.2s ease',
  };

  const inputStyleNoPad = { ...inputStyle, paddingLeft: '16px' };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '6px',
  };

  const iconStyle = {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '18px',
    height: '18px',
    color: '#9CA3AF',
  };

  const focusHandler = (e) => { e.target.style.borderColor = '#3B82F6'; e.target.style.backgroundColor = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)'; };
  const blurHandler = (e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.backgroundColor = '#F9FAFB'; e.target.style.boxShadow = 'none'; };

  const roles = [
    { id: 'patient', label: 'Patient', desc: 'Book appointments & manage health', icon: Heart, color: '#2563EB', bg: '#EFF6FF' },
    { id: 'doctor', label: 'Doctor', desc: 'Manage patients & consultations', icon: Stethoscope, color: '#0D9488', bg: '#F0FDFA' },
    { id: 'staff', label: 'Staff', desc: 'Operations & administration', icon: UserCog, color: '#D97706', bg: '#FFFBEB' },
    { id: 'admin', label: 'Admin', desc: 'Full system management', icon: Shield, color: '#7C3AED', bg: '#F5F3FF' },
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ──── Left: Visual Panel ──── */}
      <div className="hidden lg:flex" style={{
        flex: '0 0 420px', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0D9488 0%, #0F766E 50%, #115E59 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div style={{ position: 'absolute', top: '20%', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)' }} />
        <div style={{ position: 'absolute', bottom: '15%', left: '-60px', width: '350px', height: '350px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '48px 40px', maxWidth: '400px' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <div style={{ width: '72px', height: '72px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 36px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Activity style={{ width: '32px', height: '32px', color: 'white' }} />
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', lineHeight: 1.2 }}>
              Join MedFlow<br />Today
            </h2>
            <p style={{ marginTop: '14px', fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
              Create your account and start managing your healthcare journey with ease.
            </p>

            <div style={{ marginTop: '36px', display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
              {['Secure & private accounts', 'Access from any device', 'Real-time notifications', 'AI-powered assistance'].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.12 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', backgroundColor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <CheckCircle2 style={{ width: '16px', height: '16px', color: '#5EEAD4', flexShrink: 0 }} />
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ──── Right: Form ──── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 32px', backgroundColor: 'white', overflowY: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', maxWidth: '520px' }}
        >
          {/* Logo (mobile) */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '32px' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#0F2B5B', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity style={{ width: '18px', height: '18px', color: 'white' }} />
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F2B5B' }}>MedFlow</span>
          </Link>

          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#111827' }}>Create your account</h1>
          <p style={{ marginTop: '6px', fontSize: '15px', color: '#6B7280' }}>Start your healthcare journey with MedFlow</p>

          {error && (
            <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '12px', backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', fontSize: '14px', fontWeight: 500 }}>{error}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '28px' }}>

            {/* Role Selection */}
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>I am a</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {roles.map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    style={{
                      padding: '14px 8px', borderRadius: '12px', border: selectedRole === role.id ? `2px solid ${role.color}` : '1px solid #E5E7EB',
                      backgroundColor: selectedRole === role.id ? role.bg : 'white',
                      cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center',
                    }}
                  >
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: selectedRole === role.id ? role.bg : '#F9FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                      <role.icon style={{ width: '16px', height: '16px', color: role.color }} />
                    </div>
                    <p style={{ fontSize: '13px', fontWeight: 700, color: '#111827', margin: 0 }}>{role.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
              <div>
                <label style={labelStyle}>First Name</label>
                <input
                  type="text" placeholder="John"
                  style={{ ...inputStyleNoPad, borderColor: errors.firstName ? '#EF4444' : '#E5E7EB' }}
                  onFocus={focusHandler} onBlur={blurHandler}
                  {...register('firstName', { required: 'Required' })}
                />
                {errors.firstName && <p style={{ marginTop: '4px', fontSize: '12px', color: '#EF4444' }}>{errors.firstName.message}</p>}
              </div>
              <div>
                <label style={labelStyle}>Last Name</label>
                <input
                  type="text" placeholder="Doe"
                  style={{ ...inputStyleNoPad, borderColor: errors.lastName ? '#EF4444' : '#E5E7EB' }}
                  onFocus={focusHandler} onBlur={blurHandler}
                  {...register('lastName', { required: 'Required' })}
                />
                {errors.lastName && <p style={{ marginTop: '4px', fontSize: '12px', color: '#EF4444' }}>{errors.lastName.message}</p>}
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail style={iconStyle} />
                <input
                  type="email" placeholder="you@example.com"
                  style={{ ...inputStyle, borderColor: errors.email ? '#EF4444' : '#E5E7EB' }}
                  onFocus={focusHandler} onBlur={blurHandler}
                  {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                />
              </div>
              {errors.email && <p style={{ marginTop: '4px', fontSize: '12px', color: '#EF4444' }}>{errors.email.message}</p>}
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Phone <span style={{ color: '#9CA3AF', fontWeight: 400 }}>(optional)</span></label>
              <div style={{ position: 'relative' }}>
                <Phone style={iconStyle} />
                <input
                  type="tel" placeholder="(555) 000-0000"
                  style={inputStyle}
                  onFocus={focusHandler} onBlur={blurHandler}
                  {...register('phone')}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock style={iconStyle} />
                <input
                  type={showPassword ? 'text' : 'password'} placeholder="Create a strong password"
                  style={{ ...inputStyle, paddingRight: '44px', borderColor: errors.password ? '#EF4444' : '#E5E7EB' }}
                  onFocus={focusHandler} onBlur={blurHandler}
                  {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Min 8 characters' } })}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p style={{ marginTop: '4px', fontSize: '12px', color: '#EF4444' }}>{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>Confirm Password</label>
              <div style={{ position: 'relative' }}>
                <Lock style={iconStyle} />
                <input
                  type="password" placeholder="Confirm your password"
                  style={{ ...inputStyle, borderColor: errors.confirmPassword ? '#EF4444' : '#E5E7EB' }}
                  onFocus={focusHandler} onBlur={blurHandler}
                  {...register('confirmPassword', { required: 'Please confirm', validate: (val) => val === password || 'Passwords do not match' })}
                />
              </div>
              {errors.confirmPassword && <p style={{ marginTop: '4px', fontSize: '12px', color: '#EF4444' }}>{errors.confirmPassword.message}</p>}
            </div>

            {/* Terms */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                <input type="checkbox" required style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: '#0F2B5B', flexShrink: 0 }} />
                <span style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.5 }}>
                  I agree to the <a href="#" style={{ color: '#0F2B5B', fontWeight: 600, textDecoration: 'none' }}>Terms of Service</a> and <a href="#" style={{ color: '#0F2B5B', fontWeight: 600, textDecoration: 'none' }}>Privacy Policy</a>
                </span>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                padding: '14px', fontSize: '15px', fontWeight: 700, color: 'white',
                backgroundColor: isLoading ? '#6B7280' : '#0F2B5B', border: 'none', borderRadius: '12px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(15,43,91,0.2)', transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#1a3d7a')}
              onMouseLeave={(e) => !isLoading && (e.target.style.backgroundColor = '#0F2B5B')}
            >
              {isLoading ? 'Creating account...' : <><span>Create Account</span> <ArrowRight size={16} /></>}
            </button>
          </form>

          {/* Login Link */}
          <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#6B7280' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ fontWeight: 700, color: '#0F2B5B', textDecoration: 'none' }}>Sign in</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;

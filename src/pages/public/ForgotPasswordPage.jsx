import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Activity, Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [sent, setSent] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = () => setSent(true);

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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', backgroundColor: '#FAFBFC', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ width: '100%', maxWidth: '440px', backgroundColor: 'white', borderRadius: '20px', border: '1px solid #E5E7EB', padding: '40px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', marginBottom: '32px' }}>
          <div style={{ width: '36px', height: '36px', backgroundColor: '#0F2B5B', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Activity style={{ width: '18px', height: '18px', color: 'white' }} />
          </div>
          <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F2B5B' }}>MedFlow</span>
        </Link>

        {!sent ? (
          <>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>Reset your password</h1>
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '28px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Email</label>
                <div style={{ position: 'relative' }}>
                  <Mail style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '18px', height: '18px', color: '#9CA3AF' }} />
                  <input
                    type="email" placeholder="you@example.com"
                    style={{ ...inputStyle, borderColor: errors.email ? '#EF4444' : '#E5E7EB' }}
                    onFocus={(e) => { e.target.style.borderColor = '#3B82F6'; e.target.style.backgroundColor = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#E5E7EB'; e.target.style.backgroundColor = '#F9FAFB'; e.target.style.boxShadow = 'none'; }}
                    {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                  />
                </div>
                {errors.email && <p style={{ marginTop: '4px', fontSize: '12px', color: '#EF4444' }}>{errors.email.message}</p>}
              </div>

              <button
                type="submit"
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '14px', fontSize: '15px', fontWeight: 700, color: 'white',
                  backgroundColor: '#0F2B5B', border: 'none', borderRadius: '12px', cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(15,43,91,0.2)',
                }}
              >
                Send Reset Link <ArrowRight size={16} />
              </button>
            </form>
          </>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <CheckCircle2 style={{ width: '28px', height: '28px', color: '#059669' }} />
            </div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#111827' }}>Check your email</h2>
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>
              We've sent a password reset link to your email address. Please check your inbox.
            </p>
            <button onClick={() => setSent(false)} style={{
              marginTop: '24px', width: '100%', padding: '14px', fontSize: '15px', fontWeight: 700,
              color: 'white', backgroundColor: '#0F2B5B', border: 'none', borderRadius: '12px', cursor: 'pointer',
            }}>
              Back to Reset
            </button>
          </motion.div>
        )}

        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '14px', fontWeight: 600, color: '#0F2B5B', textDecoration: 'none' }}>
            <ArrowLeft size={14} /> Back to Sign in
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;

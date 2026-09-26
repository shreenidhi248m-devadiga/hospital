import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, Stethoscope, Heart, Shield, UserCog } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';

const LoginPage = () => {
  const [showPw, setShowPw] = useState(false);
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try { const u = await login(data.email, data.password); navigate(`/${u.role}`); } catch {}
  };
  const demoLogin = async (email) => {
    try { const u = await login(email, 'password123'); navigate(`/${u.role}`); } catch {}
  };

  const inp = { width:'100%', padding:'10px 14px 10px 40px', fontSize:'13px', fontWeight:500, color:'#111827', backgroundColor:'#F9FAFB', border:'1px solid #E5E7EB', borderRadius:'10px', outline:'none', transition:'all 0.2s' };
  const lbl = { display:'block', fontSize:'12px', fontWeight:600, color:'#374151', marginBottom:'5px' };
  const ico = { position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', width:'16px', height:'16px', color:'#9CA3AF' };

  return (
    <div style={{ height:'100vh', display:'flex', fontFamily:"'Inter',system-ui,sans-serif", overflow:'hidden' }}>
      {/* LEFT — Form */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:'24px 32px', background:'white', overflowY:'auto' }}>
        <div style={{ width:'100%', maxWidth:'380px' }}>
          <Link to="/" style={{ display:'flex', alignItems:'center', gap:'8px', textDecoration:'none', marginBottom:'28px' }}>
            <div style={{ width:'34px', height:'34px', backgroundColor:'#0F2B5B', borderRadius:'10px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Activity style={{ width:'16px', height:'16px', color:'white' }} />
            </div>
            <span style={{ fontSize:'17px', fontWeight:800, color:'#0F2B5B' }}>MedFlow</span>
          </Link>

          <h1 style={{ fontSize:'24px', fontWeight:800, color:'#111827' }}>Welcome back</h1>
          <p style={{ marginTop:'4px', fontSize:'13px', color:'#6B7280' }}>Sign in to your account to continue</p>

          {error && <div style={{ marginTop:'12px', padding:'10px 14px', borderRadius:'10px', backgroundColor:'#FEF2F2', border:'1px solid #FECACA', color:'#DC2626', fontSize:'13px' }}>{error}</div>}

          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop:'20px' }}>
            <div style={{ marginBottom:'14px' }}>
              <label style={lbl}>Email</label>
              <div style={{ position:'relative' }}>
                <Mail style={ico} />
                <input type="email" placeholder="you@example.com" style={{ ...inp, borderColor: errors.email ? '#EF4444':'#E5E7EB' }}
                  onFocus={e=>{e.target.style.borderColor='#3B82F6';e.target.style.boxShadow='0 0 0 3px rgba(59,130,246,0.08)';}}
                  onBlur={e=>{e.target.style.borderColor='#E5E7EB';e.target.style.boxShadow='none';}}
                  {...register('email',{required:'Required',pattern:{value:/^\S+@\S+$/i,message:'Invalid'}})} onChange={()=>clearError()} />
              </div>
              {errors.email && <p style={{ marginTop:'3px', fontSize:'11px', color:'#EF4444' }}>{errors.email.message}</p>}
            </div>

            <div style={{ marginBottom:'14px' }}>
              <label style={lbl}>Password</label>
              <div style={{ position:'relative' }}>
                <Lock style={ico} />
                <input type={showPw?'text':'password'} placeholder="Enter password" style={{ ...inp, paddingRight:'40px', borderColor:errors.password?'#EF4444':'#E5E7EB' }}
                  onFocus={e=>{e.target.style.borderColor='#3B82F6';e.target.style.boxShadow='0 0 0 3px rgba(59,130,246,0.08)';}}
                  onBlur={e=>{e.target.style.borderColor='#E5E7EB';e.target.style.boxShadow='none';}}
                  {...register('password',{required:'Required',minLength:{value:6,message:'Min 6'}})} onChange={()=>clearError()} />
                <button type="button" onClick={()=>setShowPw(!showPw)} style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', background:'none', border:'none', cursor:'pointer', color:'#9CA3AF', padding:0 }}>
                  {showPw?<EyeOff size={14}/>:<Eye size={14}/>}
                </button>
              </div>
              {errors.password && <p style={{ marginTop:'3px', fontSize:'11px', color:'#EF4444' }}>{errors.password.message}</p>}
            </div>

            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'18px' }}>
              <label style={{ display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', color:'#6B7280', cursor:'pointer' }}>
                <input type="checkbox" style={{ width:'14px', height:'14px', accentColor:'#0F2B5B' }} /> Remember me
              </label>
              <Link to="/forgot-password" style={{ fontSize:'12px', fontWeight:600, color:'#0F2B5B', textDecoration:'none' }}>Forgot?</Link>
            </div>

            <button type="submit" disabled={isLoading} style={{
              width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:'6px',
              padding:'11px', fontSize:'14px', fontWeight:700, color:'white',
              backgroundColor:isLoading?'#6B7280':'#0F2B5B', border:'none', borderRadius:'10px',
              cursor:isLoading?'not-allowed':'pointer', boxShadow:'0 2px 8px rgba(15,43,91,0.15)',
            }}>
              {isLoading?'Signing in...':<>Sign In <ArrowRight size={14}/></>}
            </button>
          </form>

          <p style={{ marginTop:'16px', textAlign:'center', fontSize:'13px', color:'#6B7280' }}>
            Don't have an account? <Link to="/register" style={{ fontWeight:700, color:'#0F2B5B', textDecoration:'none' }}>Create account</Link>
          </p>

          {/* Demo Logins */}
          <div style={{ marginTop:'20px', paddingTop:'18px', borderTop:'1px solid #F3F4F6' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', marginBottom:'10px' }}>
              <Sparkles style={{ width:'12px', height:'12px', color:'#0F2B5B' }} />
              <span style={{ fontSize:'10px', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'#9CA3AF' }}>Quick Demo Login</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
              {[
                { role:'Patient', email:'patient@medflow.com', icon:Heart, color:'#2563EB', bg:'#EFF6FF' },
                { role:'Doctor', email:'doctor@medflow.com', icon:Stethoscope, color:'#0D9488', bg:'#F0FDFA' },
                { role:'Staff', email:'staff@medflow.com', icon:UserCog, color:'#D97706', bg:'#FFFBEB' },
                { role:'Admin', email:'admin@medflow.com', icon:Shield, color:'#7C3AED', bg:'#F5F3FF' },
              ].map(d=>(
                <button key={d.role} type="button" onClick={()=>demoLogin(d.email)} style={{
                  display:'flex', alignItems:'center', gap:'10px', padding:'10px 12px',
                  borderRadius:'10px', border:'1px solid #E5E7EB', backgroundColor:'white',
                  cursor:'pointer', transition:'all 0.15s', textAlign:'left',
                }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor='#D1D5DB';e.currentTarget.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)';}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor='#E5E7EB';e.currentTarget.style.boxShadow='none';}}
                >
                  <div style={{ width:'32px', height:'32px', borderRadius:'8px', backgroundColor:d.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <d.icon style={{ width:'14px', height:'14px', color:d.color }} />
                  </div>
                  <span style={{ fontSize:'13px', fontWeight:700, color:'#111827' }}>{d.role}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT — Visual */}
      <div className="hidden lg:flex" style={{ width:'45%', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg,#0F2B5B 0%,#1E40AF 100%)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, opacity:0.05, backgroundImage:'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize:'28px 28px' }} />
        <div style={{ position:'absolute', top:'10%', right:'-60px', width:'250px', height:'250px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.07)' }} />
        <div style={{ position:'absolute', bottom:'10%', left:'-50px', width:'300px', height:'300px', borderRadius:'50%', border:'1px solid rgba(255,255,255,0.05)' }} />

        <div style={{ position:'relative', zIndex:1, textAlign:'center', padding:'40px', maxWidth:'400px' }}>
          <div style={{ width:'64px', height:'64px', backgroundColor:'rgba(255,255,255,0.1)', borderRadius:'18px', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 32px', border:'1px solid rgba(255,255,255,0.08)' }}>
            <Activity style={{ width:'28px', height:'28px', color:'white' }} />
          </div>
          <h2 style={{ fontSize:'26px', fontWeight:800, color:'white', lineHeight:1.2 }}>Modern Healthcare<br/>Management</h2>
          <p style={{ marginTop:'12px', fontSize:'14px', color:'rgba(255,255,255,0.55)', lineHeight:1.7 }}>Streamline your practice with intelligent tools designed for healthcare professionals.</p>

          <div style={{ marginTop:'32px', display:'flex', flexDirection:'column', gap:'8px', textAlign:'left' }}>
            {['Real-time queue tracking','Secure medical records','Smart scheduling','AI document analysis'].map((t,i)=>(
              <div key={i} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px 14px', borderRadius:'10px', backgroundColor:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ width:'6px', height:'6px', borderRadius:'50%', backgroundColor:'#14B8A6', flexShrink:0 }} />
                <span style={{ fontSize:'13px', fontWeight:500, color:'rgba(255,255,255,0.8)' }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

import { motion } from 'framer-motion';
import { Calendar, Clock, FileText, Users, ArrowRight, PillBottle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { mockAppointments } from '../../data/mockData';

const StatCard = ({ title, value, sub, subColor, icon: Icon, iconBg, iconColor }) => (
  <div style={{ backgroundColor:'white', borderRadius:'12px', border:'1px solid #E5E7EB', padding:'18px', transition:'box-shadow 0.2s' }}>
    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
      <div>
        <p style={{ fontSize:'12px', fontWeight:600, color:'#6B7280', margin:0 }}>{title}</p>
        <p style={{ fontSize:'28px', fontWeight:800, color:'#111827', margin:'6px 0 0', letterSpacing:'-0.02em' }}>{value}</p>
        {sub && <p style={{ fontSize:'11px', fontWeight:600, color:subColor||'#059669', margin:'4px 0 0' }}>{sub}</p>}
      </div>
      <div style={{ width:'40px', height:'40px', borderRadius:'10px', backgroundColor:iconBg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <Icon style={{ width:'18px', height:'18px', color:iconColor }} />
      </div>
    </div>
  </div>
);

const PatientDashboard = () => {
  const { user } = useAuthStore();
  const apts = mockAppointments.filter(a => a.patientId === 'P001' && (a.status === 'confirmed' || a.status === 'pending')).slice(0, 3);
  const statusDot = { confirmed:'#059669', pending:'#D97706', cancelled:'#EF4444' };

  return (
    <div>
      {/* Welcome */}
      <div style={{ background:'linear-gradient(135deg,#0F2B5B 0%,#1E40AF 100%)', borderRadius:'14px', padding:'24px 28px', marginBottom:'20px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'-40px', right:'-20px', width:'160px', height:'160px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.04)' }} />
        <h1 style={{ fontSize:'22px', fontWeight:800, color:'white', margin:0 }}>Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
        <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.6)', margin:'4px 0 0' }}>Here's an overview of your health dashboard.</p>
        <Link to="/patient/appointments" style={{ display:'inline-flex', alignItems:'center', gap:'6px', marginTop:'14px', padding:'8px 16px', borderRadius:'8px', backgroundColor:'rgba(255,255,255,0.12)', color:'white', fontSize:'13px', fontWeight:600, textDecoration:'none', border:'1px solid rgba(255,255,255,0.1)' }}>
          Book Appointment <ArrowRight size={14} />
        </Link>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'14px', marginBottom:'20px' }}>
        <StatCard title="Upcoming Appointments" value="3" sub="↑ 1 this week" icon={Calendar} iconBg="#EFF6FF" iconColor="#2563EB" />
        <StatCard title="Queue Position" value="#2" sub="~15 min wait" subColor="#D97706" icon={Clock} iconBg="#FFFBEB" iconColor="#D97706" />
        <StatCard title="Medical Records" value="12" sub="↑ 2 new" icon={FileText} iconBg="#F0FDFA" iconColor="#0D9488" />
        <StatCard title="Active Prescriptions" value="2" icon={PillBottle} iconBg="#F0FDF4" iconColor="#059669" />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'20px' }} className="lg:!grid-cols-[2fr_1fr]">
        {/* Appointments */}
        <div style={{ backgroundColor:'white', borderRadius:'12px', border:'1px solid #E5E7EB', padding:'20px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:700, color:'#111827', margin:0 }}>Upcoming Appointments</h2>
            <Link to="/patient/appointments" style={{ fontSize:'13px', fontWeight:600, color:'#2563EB', textDecoration:'none', display:'flex', alignItems:'center', gap:'4px' }}>View All <ArrowRight size={14} /></Link>
          </div>
          {apts.map((a, i) => (
            <div key={a.id} style={{ display:'flex', alignItems:'center', gap:'14px', padding:'14px', borderRadius:'10px', backgroundColor:'#FAFBFC', border:'1px solid #F3F4F6', marginBottom:i<apts.length-1?'8px':0 }}>
              <div style={{ width:'44px', height:'44px', borderRadius:'10px', backgroundColor:'#EFF6FF', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Calendar style={{ width:'18px', height:'18px', color:'#2563EB' }} />
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                  <p style={{ fontSize:'14px', fontWeight:700, color:'#111827', margin:0 }}>{a.doctorName}</p>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'11px', fontWeight:600, color:statusDot[a.status] }}>
                    <span style={{ width:'6px', height:'6px', borderRadius:'50%', backgroundColor:statusDot[a.status] }} />{a.status}
                  </span>
                </div>
                <p style={{ fontSize:'12px', color:'#6B7280', margin:'2px 0 0' }}>{a.specialty} · {a.type}</p>
              </div>
              <div style={{ textAlign:'right', flexShrink:0 }}>
                <p style={{ fontSize:'13px', fontWeight:700, color:'#111827', margin:0 }}>{a.date}</p>
                <p style={{ fontSize:'11px', color:'#9CA3AF', margin:'2px 0 0' }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right column */}
        <div>
          {/* Quick Actions */}
          <div style={{ backgroundColor:'white', borderRadius:'12px', border:'1px solid #E5E7EB', padding:'20px', marginBottom:'14px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:700, color:'#111827', margin:'0 0 14px' }}>Quick Actions</h2>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px' }}>
              {[
                { icon:Calendar, label:'Book Appt', to:'/patient/appointments', bg:'#EFF6FF', color:'#2563EB', border:'#DBEAFE' },
                { icon:Users, label:'Find Doctor', to:'/patient/doctors', bg:'#F0FDFA', color:'#0D9488', border:'#CCFBF1' },
                { icon:FileText, label:'My Records', to:'/patient/records', bg:'#F5F3FF', color:'#7C3AED', border:'#EDE9FE' },
                { icon:Clock, label:'Queue', to:'/patient/queue', bg:'#FFFBEB', color:'#D97706', border:'#FEF3C7' },
              ].map((a, i) => (
                <Link key={i} to={a.to} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', padding:'14px 8px', borderRadius:'10px', border:`1px solid ${a.border}`, backgroundColor:a.bg, textDecoration:'none', textAlign:'center', transition:'transform 0.15s' }}>
                  <a.icon style={{ width:'20px', height:'20px', color:a.color }} />
                  <span style={{ fontSize:'11px', fontWeight:700, color:'#374151' }}>{a.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Health Summary */}
          <div style={{ backgroundColor:'white', borderRadius:'12px', border:'1px solid #E5E7EB', padding:'20px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:700, color:'#111827', margin:'0 0 14px' }}>Health Summary</h2>
            {[
              { label:'Blood Pressure', value:'120/80', status:'Normal', color:'#059669' },
              { label:'Heart Rate', value:'72 bpm', status:'Normal', color:'#059669' },
              { label:'Blood Sugar', value:'95 mg/dL', status:'Normal', color:'#059669' },
              { label:'Cholesterol', value:'195 mg/dL', status:'Borderline', color:'#D97706' },
            ].map((h, i) => (
              <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom: i<3 ? '1px solid #F3F4F6' : 'none' }}>
                <span style={{ fontSize:'13px', color:'#6B7280' }}>{h.label}</span>
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                  <span style={{ fontSize:'13px', fontWeight:700, color:'#111827' }}>{h.value}</span>
                  <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'11px', fontWeight:600, color:h.color }}>
                    <span style={{ width:'5px', height:'5px', borderRadius:'50%', backgroundColor:h.color }} />{h.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;

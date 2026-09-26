import { Calendar, Users, Clock, Activity, ArrowRight, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { mockAppointments, mockQueue } from '../../data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const weeklyData = [
  { day:'Mon', patients:18 }, { day:'Tue', patients:22 }, { day:'Wed', patients:15 },
  { day:'Thu', patients:25 }, { day:'Fri', patients:20 },
];

const StatCard = ({ title, value, sub, subColor, icon: Icon, iconBg, iconColor }) => (
  <div style={{ backgroundColor:'white', borderRadius:'12px', border:'1px solid #E5E7EB', padding:'18px' }}>
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

const DoctorDashboard = () => {
  const { user } = useAuthStore();
  const apts = mockAppointments.filter(a => a.doctorId === '1' && a.status !== 'cancelled').slice(0, 4);
  const queue = mockQueue.filter(q => q.doctorId === '1');
  const statusDot = { confirmed:'#059669', pending:'#D97706' };

  return (
    <div>
      {/* Welcome */}
      <div style={{ background:'linear-gradient(135deg,#0D9488 0%,#0F766E 100%)', borderRadius:'14px', padding:'24px 28px', marginBottom:'20px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:'-40px', right:'-20px', width:'160px', height:'160px', borderRadius:'50%', backgroundColor:'rgba(255,255,255,0.04)' }} />
        <div style={{ display:'flex', alignItems:'center', gap:'14px' }}>
          <div style={{ width:'48px', height:'48px', borderRadius:'14px', backgroundColor:'rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
            <Stethoscope style={{ width:'24px', height:'24px', color:'white' }} />
          </div>
          <div>
            <h1 style={{ fontSize:'22px', fontWeight:800, color:'white', margin:0 }}>Good morning, {user?.name?.split(' ').slice(0, 2).join(' ')} 👨‍⚕️</h1>
            <p style={{ fontSize:'14px', color:'rgba(255,255,255,0.6)', margin:'4px 0 0' }}>Here's your schedule for today. You have {apts.length} appointments.</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(200px, 1fr))', gap:'14px', marginBottom:'20px' }}>
        <StatCard title="Today's Patients" value="8" sub="↑ 12% vs last week" icon={Users} iconBg="#EFF6FF" iconColor="#2563EB" />
        <StatCard title="Appointments" value="12" sub="3 pending" subColor="#D97706" icon={Calendar} iconBg="#F0FDFA" iconColor="#0D9488" />
        <StatCard title="Queue Length" value={queue.length.toString()} icon={Clock} iconBg="#FFFBEB" iconColor="#D97706" />
        <StatCard title="Completed Today" value="5" sub="↑ 63% completion" icon={Activity} iconBg="#F0FDF4" iconColor="#059669" />
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:'20px' }} className="lg:!grid-cols-[2fr_1fr]">
        {/* Schedule */}
        <div style={{ backgroundColor:'white', borderRadius:'12px', border:'1px solid #E5E7EB', padding:'20px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'16px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:700, color:'#111827', margin:0 }}>Today's Schedule</h2>
            <Link to="/doctor/appointments" style={{ fontSize:'13px', fontWeight:600, color:'#2563EB', textDecoration:'none', display:'flex', alignItems:'center', gap:'4px' }}>View All <ArrowRight size={14} /></Link>
          </div>
          {apts.map((a, i) => (
            <div key={a.id} style={{ display:'flex', alignItems:'center', gap:'14px', padding:'14px', borderRadius:'10px', backgroundColor:'#FAFBFC', border:'1px solid #F3F4F6', marginBottom:i<apts.length-1?'8px':0 }}>
              <div style={{ textAlign:'center', minWidth:'56px', padding:'8px', borderRadius:'10px', backgroundColor:'#EFF6FF', border:'1px solid #DBEAFE' }}>
                <p style={{ fontSize:'13px', fontWeight:800, color:'#2563EB', margin:0 }}>{a.time}</p>
                <p style={{ fontSize:'9px', fontWeight:500, color:'#93C5FD', margin:'2px 0 0' }}>Room {a.room}</p>
              </div>
              <div style={{ width:'32px', height:'32px', borderRadius:'50%', background:'linear-gradient(135deg,#0F2B5B,#1E40AF)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'11px', fontWeight:700, color:'white', flexShrink:0 }}>
                {a.patientName?.split(' ').map(n=>n[0]).join('')}
              </div>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:'14px', fontWeight:700, color:'#111827', margin:0 }}>{a.patientName}</p>
                <p style={{ fontSize:'12px', color:'#6B7280', margin:'2px 0 0' }}>{a.type} · {a.notes}</p>
              </div>
              <span style={{ display:'flex', alignItems:'center', gap:'4px', fontSize:'11px', fontWeight:600, color:statusDot[a.status]||'#6B7280' }}>
                <span style={{ width:'6px', height:'6px', borderRadius:'50%', backgroundColor:statusDot[a.status]||'#D1D5DB' }} />{a.status}
              </span>
            </div>
          ))}
        </div>

        <div>
          {/* Queue */}
          <div style={{ backgroundColor:'white', borderRadius:'12px', border:'1px solid #E5E7EB', padding:'20px', marginBottom:'14px' }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'14px' }}>
              <h2 style={{ fontSize:'16px', fontWeight:700, color:'#111827', margin:0 }}>Patient Queue</h2>
              <Link to="/doctor/queue" style={{ fontSize:'13px', fontWeight:600, color:'#2563EB', textDecoration:'none' }}>View</Link>
            </div>
            {queue.map(q => (
              <div key={q.id} style={{ display:'flex', alignItems:'center', gap:'10px', padding:'10px', borderRadius:'8px', backgroundColor:'#FAFBFC', border:'1px solid #F3F4F6', marginBottom:'6px' }}>
                <div style={{ width:'32px', height:'32px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:800,
                  backgroundColor: q.status==='in-progress'?'#D1FAE5':'#F3F4F6',
                  color: q.status==='in-progress'?'#059669':'#6B7280',
                  border: q.status==='in-progress'?'2px solid #6EE7B7':'none'
                }}>{q.position}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:'13px', fontWeight:600, color:'#111827', margin:0, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{q.patientName}</p>
                  <p style={{ fontSize:'11px', color:'#9CA3AF', margin:'1px 0 0' }}>{q.type}</p>
                </div>
                <span style={{ fontSize:'10px', fontWeight:700, padding:'3px 8px', borderRadius:'6px',
                  backgroundColor: q.status==='in-progress'?'#D1FAE5':'#FEF3C7',
                  color: q.status==='in-progress'?'#059669':'#D97706'
                }}>{q.status === 'in-progress' ? 'Current' : 'Waiting'}</span>
              </div>
            ))}
          </div>

          {/* Chart */}
          <div style={{ backgroundColor:'white', borderRadius:'12px', border:'1px solid #E5E7EB', padding:'20px' }}>
            <h2 style={{ fontSize:'16px', fontWeight:700, color:'#111827', margin:'0 0 14px' }}>This Week</h2>
            <div style={{ height:'180px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                  <XAxis dataKey="day" tick={{ fontSize:11, fill:'#94A3B8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize:11, fill:'#94A3B8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ borderRadius:'10px', border:'1px solid #E2E8F0', fontSize:'12px' }} cursor={{ fill:'#F8FAFC' }} />
                  <Bar dataKey="patients" fill="#2563EB" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;

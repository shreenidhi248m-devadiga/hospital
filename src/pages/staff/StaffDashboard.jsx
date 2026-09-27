import { motion } from 'framer-motion';
import { Calendar, Users, Clock, ListOrdered, ArrowRight, ClipboardList } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import { mockAppointments, mockQueue, mockPatients } from '../../data/mockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const departmentData = [
  { name: 'Cardiology', value: 12, color: '#3B82F6' },
  { name: 'Neurology', value: 8, color: '#8B5CF6' },
  { name: 'Orthopedics', value: 10, color: '#14B8A6' },
  { name: 'Pediatrics', value: 15, color: '#F59E0B' },
  { name: 'Other', value: 6, color: '#6B7280' },
];

const StaffDashboard = () => {
  const { user } = useAuthStore();
  const todayAppointments = mockAppointments.filter((a) => a.status !== 'cancelled').slice(0, 4);

  return (
    <div className="space-y-7">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 rounded-2xl p-7 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm border border-white/10">
            <ClipboardList className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">
              Welcome, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="mt-1 text-amber-100/90 text-[15px]">
              Front Desk & Operations Dashboard &bull; Manage today's patients and queue flow
            </p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Queue" value={mockQueue.length.toString()} change="2 waiting" changeType="increase" icon={Clock} color="warning" />
        <StatCard title="Today's Check-ins" value="28" change="15%" changeType="increase" description="vs yesterday" icon={Users} color="primary" />
        <StatCard title="Appointments" value={todayAppointments.length.toString()} change="On schedule" changeType="increase" icon={Calendar} color="secondary" />
        <StatCard title="Avg Wait Time" value="14 min" change="2 min" changeType="decrease" description="faster today" icon={ListOrdered} color="success" />
      </div>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-extrabold text-surface-900">Today's Patient Schedule</h2>
              <p className="text-xs text-surface-500 mt-0.5">Real-time check-in and queue management</p>
            </div>
            <Link to="/staff/appointments" className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1">
              Manage All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {todayAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-3.5 rounded-xl bg-surface-50 border border-surface-200/60 hover:bg-surface-100/60 transition-colors">
                <div className="flex items-center gap-3.5">
                  <Avatar name={apt.patientName} size="md" />
                  <div>
                    <p className="text-sm font-bold text-surface-900">{apt.patientName}</p>
                    <p className="text-xs text-surface-500">{apt.doctorName} &bull; {apt.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-surface-700 bg-white px-2.5 py-1 rounded-lg border border-surface-200">{apt.time}</span>
                  <Badge variant={apt.status === 'confirmed' ? 'success' : 'warning'}>{apt.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Department Overview */}
        <Card>
          <h2 className="text-lg font-extrabold text-surface-900 mb-2">Department Traffic</h2>
          <p className="text-xs text-surface-500 mb-4">Patient distribution by department</p>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                  {departmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '10px', color: 'white', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-surface-100">
            {departmentData.slice(0, 4).map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-xs text-surface-600 font-medium truncate">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboard;

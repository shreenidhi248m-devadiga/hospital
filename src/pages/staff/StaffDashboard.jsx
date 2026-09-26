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
            <p className="mt-1 text-amber-100/80 text-[15px]">Daily operations overview — {mockQueue.length} patients in queue</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Appointments" value="24" change="8%" changeType="increase" description="today" icon={Calendar} color="primary" />
        <StatCard title="Patients in Queue" value={mockQueue.length.toString()} icon={ListOrdered} color="warning" />
        <StatCard title="Registered Patients" value={mockPatients.length.toString()} change="2 new" changeType="increase" icon={Users} color="secondary" />
        <StatCard title="Avg Wait Time" value="14 min" change="3 min" changeType="decrease" description="improvement" icon={Clock} color="success" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Today's Appointments</h2>
            <Link to="/staff/appointments" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
              Manage <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {todayAppointments.map((apt, i) => (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-50/80 hover:bg-gray-100/80 border border-transparent hover:border-gray-200 transition-all duration-200"
              >
                <Avatar name={apt.patientName} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-[15px] font-bold text-gray-900">{apt.patientName}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{apt.doctorName} · {apt.specialty}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-gray-700">{apt.time}</p>
                  <Badge variant={apt.status === 'confirmed' ? 'success' : 'warning'} dot>{apt.status}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Department Load */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-5">Department Load</h2>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={departmentData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {departmentData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '13px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-3">
            {departmentData.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-gray-600">{d.name}</span>
                </div>
                <span className="font-bold text-gray-800">{d.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default StaffDashboard;

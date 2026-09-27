import { motion } from 'framer-motion';
import { Users, Calendar, Activity, DollarSign, ArrowRight, UserPlus, Stethoscope, UserCog, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import StatCard from '../../components/ui/StatCard';
import Card from '../../components/ui/Card';
import { analyticsData, mockDoctors } from '../../data/mockData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-7">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-violet-600 via-purple-700 to-indigo-800 rounded-2xl p-7 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-white/5 rounded-full translate-y-1/2" />
        <div className="relative flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center backdrop-blur-sm border border-white/10">
            <LayoutDashboard className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Admin Dashboard</h1>
            <p className="mt-1 text-purple-200/80 text-[15px]">System-wide overview and analytics for {user?.name}</p>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Patients" value="2,450" change="12%" changeType="increase" description="this month" icon={Users} color="primary" />
        <StatCard title="Active Doctors" value={mockDoctors.length.toString()} change="1 new" changeType="increase" icon={Stethoscope} color="secondary" />
        <StatCard title="Today's Revenue" value="₹2,45,000" change="8%" changeType="increase" description="vs yesterday" icon={DollarSign} color="success" />
        <StatCard title="Appointments" value="156" change="3%" changeType="decrease" description="vs last week" icon={Calendar} color="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Visits Chart */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-5">Patient Visits & New Registrations</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analyticsData.patientVisits}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '13px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} />
                <Line type="monotone" dataKey="visits" stroke="#3B82F6" strokeWidth={2.5} dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#fff' }} />
                <Line type="monotone" dataKey="newPatients" stroke="#14B8A6" strokeWidth={2.5} dot={{ r: 4, fill: '#14B8A6', strokeWidth: 2, stroke: '#fff' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500"><div className="w-3 h-1 bg-blue-500 rounded-full" />Total Visits</div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500"><div className="w-3 h-1 bg-teal-500 rounded-full" />New Patients</div>
          </div>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-5">Revenue vs Expenses</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analyticsData.revenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '13px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} formatter={(v) => `₹${v.toLocaleString()}`} />
                <Bar dataKey="revenue" fill="#3B82F6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="expenses" fill="#E2E8F0" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center gap-6 mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500"><div className="w-3 h-3 bg-blue-500 rounded" />Revenue</div>
            <div className="flex items-center gap-2 text-xs font-medium text-gray-500"><div className="w-3 h-3 bg-gray-200 rounded" />Expenses</div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Load */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-5">Department Load</h2>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={analyticsData.departmentLoad} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {analyticsData.departmentLoad.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '13px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {analyticsData.departmentLoad.map((d, i) => (
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

        {/* Quick Links */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-5">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { icon: UserPlus, label: 'Add New User', to: '/admin/users', color: 'bg-blue-50 text-blue-600 border-blue-100' },
              { icon: Stethoscope, label: 'Manage Doctors', to: '/admin/doctors', color: 'bg-teal-50 text-teal-600 border-teal-100' },
              { icon: Users, label: 'View Patients', to: '/admin/patients', color: 'bg-violet-50 text-violet-600 border-violet-100' },
              { icon: UserCog, label: 'Staff Management', to: '/admin/staff', color: 'bg-amber-50 text-amber-600 border-amber-100' },
            ].map((item, i) => (
              <Link key={i} to={item.to}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-3.5 p-3.5 rounded-xl border ${item.color} hover:shadow-md transition-all cursor-pointer`}
                >
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center shadow-sm">
                    <item.icon className="w-4.5 h-4.5" />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 flex-1">{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </motion.div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Patient Satisfaction */}
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-5">Patient Satisfaction</h2>
          <div className="space-y-4">
            {analyticsData.satisfaction.map((item, i) => (
              <div key={i}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">{item.category}</span>
                  <span className="text-sm font-extrabold text-gray-900">{item.score}/5</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.score / 5) * 100}%` }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-blue-400"
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;


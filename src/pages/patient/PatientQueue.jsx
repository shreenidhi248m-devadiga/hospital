import { motion } from 'framer-motion';
import { Clock, Users, CheckCircle2, AlertCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import StatCard from '../../components/ui/StatCard';
import { mockQueue } from '../../data/mockData';

const PatientQueue = () => {
  const myQueue = mockQueue.find((q) => q.patientId === 'P001');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Queue Status</h1>
        <p className="text-sm text-surface-500 mt-1">Track your position in the patient queue</p>
      </div>

      {/* Current Status */}
      {myQueue ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-primary-200 bg-gradient-to-r from-primary-50/50 to-white">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={myQueue.status === 'in-progress' ? 'success' : 'warning'} dot>
                    {myQueue.status === 'in-progress' ? 'In Progress' : 'Waiting'}
                  </Badge>
                </div>
                <h2 className="text-xl font-bold text-surface-900">You're #{myQueue.position} in line</h2>
                <p className="text-sm text-surface-500 mt-1">
                  {myQueue.doctorName} · {myQueue.department}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 rounded-xl bg-white border border-surface-200">
                  <p className="text-2xl font-bold text-primary-600">{myQueue.position}</p>
                  <p className="text-xs text-surface-500 mt-0.5">Position</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white border border-surface-200">
                  <p className="text-2xl font-bold text-amber-600">~15</p>
                  <p className="text-xs text-surface-500 mt-0.5">Min Wait</p>
                </div>
                <div className="text-center p-3 rounded-xl bg-white border border-surface-200">
                  <p className="text-2xl font-bold text-surface-800">{myQueue.estimatedTime}</p>
                  <p className="text-xs text-surface-500 mt-0.5">Est. Time</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ) : (
        <Card className="text-center py-12">
          <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-surface-900">You're not in any queue</h3>
          <p className="text-sm text-surface-500 mt-1">Book an appointment to join a queue</p>
        </Card>
      )}

      {/* Queue Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Patients Ahead" value="1" icon={Users} color="primary" />
        <StatCard title="Avg Wait Time" value="12 min" icon={Clock} color="warning" />
        <StatCard title="Checked In" value="9:45 AM" icon={CheckCircle2} color="success" />
      </div>

      {/* Queue Progress */}
      <Card>
        <h2 className="text-lg font-semibold text-surface-900 mb-4">Queue Timeline</h2>
        <div className="space-y-4">
          {[
            { step: 'Checked In', time: '9:45 AM', status: 'completed', desc: 'Registration confirmed' },
            { step: 'Waiting', time: '9:50 AM', status: 'completed', desc: 'Assigned to Dr. Chen' },
            { step: 'Consultation', time: '~10:15 AM', status: 'current', desc: 'Estimated start time' },
            { step: 'Completed', time: '—', status: 'upcoming', desc: 'Visit summary & next steps' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                  item.status === 'current' ? 'bg-primary-100 text-primary-600 ring-2 ring-primary-600/20' :
                  'bg-surface-100 text-surface-400'
                }`}>
                  {item.status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> :
                   item.status === 'current' ? <Clock className="w-4 h-4" /> :
                   <AlertCircle className="w-4 h-4" />}
                </div>
                {i < 3 && <div className={`w-0.5 flex-1 mt-1 ${item.status === 'completed' ? 'bg-emerald-200' : 'bg-surface-200'}`} />}
              </div>
              <div className="pb-6">
                <p className={`text-sm font-semibold ${item.status === 'upcoming' ? 'text-surface-400' : 'text-surface-900'}`}>{item.step}</p>
                <p className="text-xs text-surface-500 mt-0.5">{item.desc}</p>
                <p className="text-xs text-surface-400 mt-0.5">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PatientQueue;

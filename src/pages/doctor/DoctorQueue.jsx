import { motion } from 'framer-motion';
import { Play, Pause, SkipForward, Clock, Users, CheckCircle2 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import StatCard from '../../components/ui/StatCard';
import { mockQueue } from '../../data/mockData';

const DoctorQueue = () => {
  const queue = mockQueue.filter((q) => q.doctorId === '1');
  const currentPatient = queue.find((q) => q.status === 'in-progress');
  const waiting = queue.filter((q) => q.status === 'waiting');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Patient Queue</h1>
        <p className="text-sm text-surface-500 mt-1">Manage your current patient queue</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="In Queue" value={queue.length.toString()} icon={Users} color="primary" />
        <StatCard title="Current Wait" value="~15 min" icon={Clock} color="warning" />
        <StatCard title="Seen Today" value="5" icon={CheckCircle2} color="success" />
      </div>

      {/* Current Patient */}
      {currentPatient && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="border-emerald-200 bg-gradient-to-r from-emerald-50/50 to-white">
            <div className="flex items-center justify-between mb-3">
              <Badge variant="success" dot>Currently Seeing</Badge>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" icon={Pause}>Pause</Button>
                <Button variant="success" size="sm" icon={CheckCircle2}>Complete</Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Avatar name={currentPatient.patientName} size="lg" />
              <div>
                <h3 className="text-lg font-bold text-surface-900">{currentPatient.patientName}</h3>
                <p className="text-sm text-surface-500">{currentPatient.type} · Checked in at {currentPatient.checkInTime}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Waiting List */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-surface-900">Waiting ({waiting.length})</h2>
          {waiting.length > 0 && <Button size="sm" icon={SkipForward}>Call Next</Button>}
        </div>
        <div className="space-y-3">
          {waiting.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 p-3.5 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-sm font-bold text-primary-700">
                #{q.position}
              </div>
              <Avatar name={q.patientName} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-surface-900">{q.patientName}</p>
                <p className="text-xs text-surface-500">{q.type} · Check-in: {q.checkInTime}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-surface-700">{q.estimatedTime}</p>
                <p className="text-xs text-surface-400">Est. time</p>
              </div>
              <Button variant="outline" size="sm">Call</Button>
            </motion.div>
          ))}
          {waiting.length === 0 && (
            <div className="text-center py-8 text-surface-400 text-sm">No patients waiting</div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default DoctorQueue;

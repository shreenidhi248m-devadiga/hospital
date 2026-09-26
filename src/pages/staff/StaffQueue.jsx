import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Play, Pause, UserPlus, RefreshCw } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { mockQueue } from '../../data/mockData';

const StaffQueue = () => {
  const departments = [...new Set(mockQueue.map((q) => q.department))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-surface-900">Queue Management</h1>
          <p className="text-sm text-surface-500 mt-1">Manage patient queues across departments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" icon={RefreshCw} size="sm">Refresh</Button>
          <Button icon={UserPlus} size="sm">Add to Queue</Button>
        </div>
      </div>

      {departments.map((dept) => {
        const deptQueue = mockQueue.filter((q) => q.department === dept);
        return (
          <Card key={dept}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-surface-900">{dept}</h2>
              <Badge variant="primary">{deptQueue.length} in queue</Badge>
            </div>
            <div className="space-y-2">
              {deptQueue.map((q, i) => (
                <motion.div
                  key={q.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-surface-50 hover:bg-surface-100 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    q.status === 'in-progress' ? 'bg-emerald-100 text-emerald-700' : 'bg-surface-200 text-surface-600'
                  }`}>{q.position}</div>
                  <Avatar name={q.patientName} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-900">{q.patientName}</p>
                    <p className="text-xs text-surface-500">{q.doctorName} · {q.type}</p>
                  </div>
                  <Badge variant={q.status === 'in-progress' ? 'success' : 'warning'} dot>
                    {q.status === 'in-progress' ? 'In Progress' : 'Waiting'}
                  </Badge>
                  <div className="flex items-center gap-1">
                    <button className="p-1 rounded hover:bg-surface-200 text-surface-400 cursor-pointer"><ArrowUp className="w-4 h-4" /></button>
                    <button className="p-1 rounded hover:bg-surface-200 text-surface-400 cursor-pointer"><ArrowDown className="w-4 h-4" /></button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default StaffQueue;

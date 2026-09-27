import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, change, changeType = 'increase', icon: Icon, color = 'primary', description }) => {
  const colors = {
    primary: { bg: 'bg-blue-50', icon: 'text-blue-600', border: 'border-blue-100', ring: 'ring-blue-50' },
    secondary: { bg: 'bg-teal-50', icon: 'text-teal-600', border: 'border-teal-100', ring: 'ring-teal-50' },
    success: { bg: 'bg-emerald-50', icon: 'text-emerald-600', border: 'border-emerald-100', ring: 'ring-emerald-50' },
    warning: { bg: 'bg-amber-50', icon: 'text-amber-600', border: 'border-amber-100', ring: 'ring-amber-50' },
    danger: { bg: 'bg-red-50', icon: 'text-red-600', border: 'border-red-100', ring: 'ring-red-50' },
    purple: { bg: 'bg-violet-50', icon: 'text-violet-600', border: 'border-violet-100', ring: 'ring-violet-50' },
  };

  const c = colors[color] || colors.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl border ${c.border} p-5 hover:shadow-md transition-all duration-200`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{title}</p>
          <p className="mt-2 text-2xl font-extrabold text-gray-900 tracking-tight">{value}</p>
          {change && (
            <div className="mt-2 flex items-center gap-1.5 flex-wrap">
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-bold px-2 py-0.5 rounded-md ${
                  changeType === 'increase'
                    ? 'text-emerald-700 bg-emerald-50 border border-emerald-200'
                    : 'text-red-700 bg-red-50 border border-red-200'
                }`}
              >
                {changeType === 'increase' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {change}
              </span>
              {description && (
                <span className="text-xs text-gray-400 font-medium">{description}</span>
              )}
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${c.bg} ring-4 ${c.ring} flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${c.icon}`} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;

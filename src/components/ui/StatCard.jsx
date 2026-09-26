import { motion } from 'framer-motion';

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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-2xl border ${c.border} p-5 hover:shadow-md transition-all duration-300`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">{value}</p>
          {change && (
            <div className="mt-2.5 flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-md ${
                  changeType === 'increase'
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-red-700 bg-red-50'
                }`}
              >
                {changeType === 'increase' ? '↑' : '↓'} {change}
              </span>
              {description && (
                <span className="text-xs text-gray-400">{description}</span>
              )}
            </div>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl ${c.bg} ring-4 ${c.ring}`}>
            <Icon className={`w-5 h-5 ${c.icon}`} />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default StatCard;

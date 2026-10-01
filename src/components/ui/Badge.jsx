const badgeVariants = {
  default: 'bg-surface-100 text-surface-700',
  primary: 'bg-primary-50 text-primary-700',
  secondary: 'bg-secondary-50 text-secondary-700',
  success: 'bg-success-light text-emerald-800',
  warning: 'bg-warning-light text-amber-800',
  danger: 'bg-danger-light text-red-800',
  info: 'bg-info-light text-blue-800',
};

const Badge = ({ children, variant = 'default', dot = false, className = '' }) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeVariants[variant]} ${className}`}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${variant === 'success' ? 'bg-emerald-500' :
            variant === 'warning' ? 'bg-amber-500' :
              variant === 'danger' ? 'bg-red-500' :
                variant === 'info' ? 'bg-blue-500' :
                  variant === 'primary' ? 'bg-primary-500' :
                    variant === 'secondary' ? 'bg-secondary-500' :
                      'bg-surface-500'
          }`} />
      )}
      {children}
    </span>
  );
};

export default Badge;

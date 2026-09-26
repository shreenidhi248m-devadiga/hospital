import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = false, padding = 'p-6', ...props }) => {
  const Component = hover ? motion.div : 'div';
  const hoverProps = hover
    ? { whileHover: { y: -3, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.06), 0 4px 6px -4px rgba(0,0,0,0.04)' }, transition: { duration: 0.2 } }
    : {};

  return (
    <Component
      className={`bg-white rounded-2xl border border-gray-200/80 shadow-sm ${padding} ${className}`}
      {...hoverProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;

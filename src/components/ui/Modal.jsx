import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md', footer }) => {
  const widthSizes = {
    sm: '480px',
    md: '560px',
    lg: '680px',
    xl: '840px',
  };

  const maxWidth = widthSizes[size] || '560px';

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '16px'
        }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute', inset: 0,
              backgroundColor: 'rgba(15, 23, 42, 0.5)',
              backdropFilter: 'blur(4px)'
            }}
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ type: 'spring', duration: 0.25 }}
            style={{
              position: 'relative',
              backgroundColor: 'white',
              borderRadius: '20px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
              width: '100%',
              maxWidth: maxWidth,
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              fontFamily: "'Inter', system-ui, sans-serif"
            }}
          >
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #E2E8F0',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              gap: '16px',
              backgroundColor: 'white'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0, lineHeight: 1.3, flex: 1 }}>
                {title}
              </h2>
              <button
                onClick={onClose}
                style={{
                  width: '32px', height: '32px', borderRadius: '9px',
                  border: '1px solid #E2E8F0', backgroundColor: '#F8FAFC',
                  color: '#64748B', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, marginLeft: 'auto',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FEF2F2'; e.currentTarget.style.color = '#DC2626'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#F8FAFC'; e.currentTarget.style.color = '#64748B'; }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px',
              color: '#1E293B'
            }}>
              {children}
            </div>

            {/* Modal Footer */}
            {footer && (
              <div style={{
                padding: '16px 24px',
                borderTop: '1px solid #E2E8F0',
                backgroundColor: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justify: 'flex-end',
                gap: '12px'
              }}>
                {footer}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;

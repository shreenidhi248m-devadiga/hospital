import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, Calendar, ClipboardList, Shield, Users, ArrowRight,
  CheckCircle2, Star, Zap, Heart, Clock, BarChart3, ChevronRight,
  Brain, Eye, UserCog, Stethoscope, ListOrdered, Lock, KeyRound,
  Server, ShieldCheck, Menu, X, Cpu, TrendingUp, PieChart, Layers, Scan
} from 'lucide-react';

const fade = {
  hidden: { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: d, ease: 'easeOut' } }),
};

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Solutions', href: '#roles' },
    { label: 'AI Intelligence', href: '#ai' },
    { label: 'Security', href: '#security' },
  ];

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif" }} className="min-h-screen bg-white text-gray-900">

      {/* ──────── NAVBAR ──────── */}
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: '72px',
          backgroundColor: scrolled ? 'rgba(255,255,255,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid #f1f1f1' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <div style={{ width: '36px', height: '36px', backgroundColor: '#0F2B5B', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Activity style={{ width: '18px', height: '18px', color: 'white' }} />
            </div>
            <span style={{ fontSize: '18px', fontWeight: 800, color: '#0F2B5B' }}>MedFlow</span>
          </Link>

          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '32px' }}>
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} style={{ fontSize: '14px', fontWeight: 600, color: '#6B7280', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.target.style.color = '#111'}
                onMouseLeave={(e) => e.target.style.color = '#6B7280'}
              >{l.label}</a>
            ))}
          </div>

          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '12px' }}>
            <Link to="/login" style={{ fontSize: '14px', fontWeight: 600, color: '#4B5563', textDecoration: 'none', padding: '8px 16px', borderRadius: '10px' }}>Login</Link>
            <Link to="/register" style={{ fontSize: '14px', fontWeight: 600, color: 'white', backgroundColor: '#0F2B5B', textDecoration: 'none', padding: '10px 20px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              Get Started <ArrowRight style={{ width: '14px', height: '14px' }} />
            </Link>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden" style={{ padding: '8px', cursor: 'pointer', background: 'none', border: 'none' }}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {menuOpen && (
          <div style={{ position: 'absolute', top: '72px', left: 0, right: 0, background: 'white', borderBottom: '1px solid #e5e7eb', padding: '16px 24px' }}>
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '10px 0', fontSize: '15px', fontWeight: 600, color: '#374151', textDecoration: 'none' }}>{l.label}</a>
            ))}
            <div style={{ display: 'flex', gap: '12px', paddingTop: '12px', borderTop: '1px solid #f3f4f6', marginTop: '8px' }}>
              <Link to="/login" style={{ flex: 1, textAlign: 'center', padding: '10px', fontSize: '14px', fontWeight: 600, border: '1px solid #e5e7eb', borderRadius: '10px', textDecoration: 'none', color: '#374151' }}>Login</Link>
              <Link to="/register" style={{ flex: 1, textAlign: 'center', padding: '10px', fontSize: '14px', fontWeight: 600, backgroundColor: '#0F2B5B', color: 'white', borderRadius: '10px', textDecoration: 'none' }}>Get Started</Link>
            </div>
          </div>
        )}
      </nav>

      {/* ──────── HERO ──────── */}
      <section style={{ paddingTop: '160px', paddingBottom: '100px', paddingLeft: '24px', paddingRight: '24px', background: 'linear-gradient(180deg, #F8FAFF 0%, #FFFFFF 100%)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '60px', alignItems: 'center' }} className="lg:!grid-cols-2">
          {/* Left */}
          <motion.div initial="hidden" animate="visible">
            <motion.div variants={fade}>
              <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2563EB', backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', padding: '8px 16px', borderRadius: '100px', marginBottom: '28px' }}>
                Smart Healthcare Management Platform
              </span>
            </motion.div>

            <motion.h1 variants={fade} custom={0.1} style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#0B1120' }}>
              Healthcare,{' '}
              <span style={{ color: '#0F2B5B' }}>Connected.</span>
              <br />
              Care,{' '}
              <span style={{ background: 'linear-gradient(135deg, #0D9488, #06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Simplified.</span>
            </motion.h1>

            <motion.p variants={fade} custom={0.2} style={{ marginTop: '24px', fontSize: '17px', lineHeight: 1.7, color: '#6B7280', maxWidth: '480px' }}>
              One platform connecting patients, doctors, staff, and administrators. Manage appointments, records, queues, and documents — all in one place.
            </motion.p>

            <motion.div variants={fade} custom={0.3} style={{ marginTop: '32px', display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
              <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#0F2B5B', color: 'white', fontWeight: 600, fontSize: '15px', padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', boxShadow: '0 4px 14px rgba(15,43,91,0.2)' }}>
                Get Started <ArrowRight size={16} />
              </Link>
              <a href="#features" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', color: '#374151', fontWeight: 600, fontSize: '15px', padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', border: '1px solid #E5E7EB' }}>
                Explore Platform
              </a>
            </motion.div>

            <motion.div variants={fade} custom={0.4} style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
              {['Secure', 'Intelligent', 'Connected'].map((t) => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#9CA3AF' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#14B8A6' }} />{t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Dashboard */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
            <div style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', boxShadow: '0 20px 60px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
              {/* Browser chrome */}
              <div style={{ padding: '14px 20px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FCA5A5' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#FCD34D' }} />
                  <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#6EE7B7' }} />
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF' }}>Today's Overview</span>
                <div style={{ width: '40px' }} />
              </div>

              {/* Stats */}
              <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }} className="sm:!grid-cols-4">
                {[
                  { label: 'Patients', value: '128', icon: Users, bg: '#EFF6FF', color: '#2563EB' },
                  { label: 'Appointments', value: '24', icon: Calendar, bg: '#F0FDFA', color: '#0D9488' },
                  { label: 'Waiting', value: '08', icon: Clock, bg: '#FFFBEB', color: '#D97706' },
                  { label: 'Completed', value: '96%', icon: CheckCircle2, bg: '#F0FDF4', color: '#059669' },
                ].map((s, i) => (
                  <div key={i} style={{ backgroundColor: '#FAFBFC', borderRadius: '12px', padding: '16px', border: '1px solid #F3F4F6' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                      <s.icon style={{ width: '16px', height: '16px', color: s.color }} />
                    </div>
                    <p style={{ fontSize: '24px', fontWeight: 800, color: '#111827' }}>{s.value}</p>
                    <p style={{ fontSize: '12px', fontWeight: 500, color: '#9CA3AF', marginTop: '2px' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Mini notification bar */}
              <div style={{ padding: '0 24px 20px 24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { icon: CheckCircle2, text: 'Appointment Confirmed', sub: '10:30 AM', bg: '#F0FDF4', color: '#059669' },
                  { icon: Brain, text: 'AI Analysis Complete', sub: 'Document ready', bg: '#F5F3FF', color: '#7C3AED' },
                  { icon: ListOrdered, text: 'Queue Token #24', sub: '3 ahead', bg: '#FFFBEB', color: '#D97706' },
                ].map((n, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', borderRadius: '10px', border: '1px solid #F3F4F6', backgroundColor: 'white', flex: '1', minWidth: '140px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: n.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <n.icon style={{ width: '14px', height: '14px', color: n.color }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '12px', fontWeight: 700, color: '#374151' }}>{n.text}</p>
                      <p style={{ fontSize: '10px', color: '#9CA3AF' }}>{n.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ──────── TRUST STRIP ──────── */}
      <section style={{ padding: '48px 24px', borderTop: '1px solid #F3F4F6', borderBottom: '1px solid #F3F4F6' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '15px', fontWeight: 500, color: '#6B7280', marginBottom: '20px' }}>Everything your healthcare workflow needs, in one platform.</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px 36px' }}>
            {['Patient Management', 'Doctor Workflow', 'Smart Appointments', 'Queue Management', 'Digital Records', 'AI Intelligence'].map((item) => (
              <span key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: '#4B5563' }}>
                <CheckCircle2 style={{ width: '16px', height: '16px', color: '#14B8A6' }} />{item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── PROBLEM → SOLUTION ──────── */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2563EB', marginBottom: '12px' }}>The Transformation</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#111827', letterSpacing: '-0.01em' }}>From fragmented workflows to connected care.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {/* Traditional */}
            <div style={{ backgroundColor: '#F9FAFB', borderRadius: '16px', padding: '32px', border: '1px solid #E5E7EB' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '24px' }}>Traditional</p>
              {['Long waiting times', 'Manual registration', 'Appointment confusion', 'Paper-based records', 'Document handling', 'Disconnected depts'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: i < 5 ? '1px solid #F3F4F6' : 'none' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <X style={{ width: '12px', height: '12px', color: '#D1D5DB' }} />
                  </div>
                  <span style={{ fontSize: '14px', color: '#9CA3AF' }}>{item}</span>
                </div>
              ))}
            </div>

            {/* Smart */}
            <div style={{ backgroundColor: '#F0FDFA', borderRadius: '16px', padding: '32px', border: '1px solid #CCFBF1' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0D9488', marginBottom: '24px' }}>Smart Platform</p>
              {['Digital Registration', 'Smart Appointment', 'Live Queue', 'Digital Medical Records', 'AI Document Processing', 'Connected Healthcare'].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 0', borderBottom: i < 5 ? '1px solid #D1FAE5' : 'none' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#14B8A6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle2 style={{ width: '12px', height: '12px', color: 'white' }} />
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#374151' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────── FEATURES ──────── */}
      <section id="features" style={{ padding: '120px 24px', backgroundColor: '#FAFBFC' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2563EB', marginBottom: '12px' }}>Features</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#111827' }}>One Platform. Every Healthcare Workflow.</h2>
            <p style={{ marginTop: '16px', fontSize: '16px', color: '#6B7280', maxWidth: '560px', margin: '16px auto 0' }}>A comprehensive suite of intelligent tools for modern healthcare management.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '20px' }}>
            {[
              { icon: Calendar, title: 'Smart Appointments', desc: 'Book, manage, reschedule, and track appointments effortlessly with real-time availability.', bg: '#EFF6FF', color: '#2563EB', border: '#DBEAFE' },
              { icon: ListOrdered, title: 'Queue Management', desc: 'Give patients real-time visibility into their queue position and estimated waiting time.', bg: '#F0FDFA', color: '#0D9488', border: '#CCFBF1' },
              { icon: ClipboardList, title: 'Digital Medical Records', desc: 'Access organized patient medical information securely from anywhere.', bg: '#F5F3FF', color: '#7C3AED', border: '#EDE9FE' },
              { icon: Scan, title: 'AI Document Processing', desc: 'Extract and organize information from uploaded healthcare documents automatically.', bg: '#ECFEFF', color: '#0891B2', border: '#CFFAFE' },
              { icon: Brain, title: 'AI Intelligence', desc: 'Use AI-powered assistance to improve healthcare workflows and information handling.', bg: '#FFF1F2', color: '#E11D48', border: '#FFE4E6' },
              { icon: BarChart3, title: 'Analytics', desc: 'Turn operational data into actionable insights through dashboards and reports.', bg: '#FFFBEB', color: '#D97706', border: '#FEF3C7' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.08} variants={fade}
                style={{
                  backgroundColor: 'white', borderRadius: '16px', padding: '32px', border: '1px solid #E5E7EB',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                }}
                whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}
              >
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: f.bg, border: `1px solid ${f.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <f.icon style={{ width: '22px', height: '22px', color: f.color }} />
                </div>
                <h3 style={{ marginTop: '20px', fontSize: '17px', fontWeight: 700, color: '#111827' }}>{f.title}</h3>
                <p style={{ marginTop: '10px', fontSize: '14px', color: '#6B7280', lineHeight: 1.7 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── ROLES ──────── */}
      <section id="roles" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2563EB', marginBottom: '12px' }}>Solutions</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#111827' }}>Designed Around Every Role.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {[
              { role: 'Patient', icon: Heart, gradient: 'linear-gradient(135deg, #2563EB, #3B82F6)', features: ['Book appointments', 'Track queue', 'View records', 'Upload documents', 'Get notifications'] },
              { role: 'Doctor', icon: Stethoscope, gradient: 'linear-gradient(135deg, #0D9488, #14B8A6)', features: ['Manage appointments', 'View patient records', 'Manage queue', 'Add consultation notes', 'Review documents'] },
              { role: 'Staff', icon: UserCog, gradient: 'linear-gradient(135deg, #D97706, #F59E0B)', features: ['Register patients', 'Manage appointments', 'Control queues', 'Process documents'] },
              { role: 'Admin', icon: Shield, gradient: 'linear-gradient(135deg, #7C3AED, #8B5CF6)', features: ['Manage users', 'Monitor operations', 'View analytics', 'Configure system', 'Manage security'] },
            ].map((r, i) => (
              <motion.div
                key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1} variants={fade}
                style={{ backgroundColor: 'white', borderRadius: '16px', border: '1px solid #E5E7EB', overflow: 'hidden', transition: 'box-shadow 0.3s ease' }}
                whileHover={{ boxShadow: '0 12px 40px rgba(0,0,0,0.06)' }}
              >
                <div style={{ background: r.gradient, padding: '24px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <r.icon style={{ width: '20px', height: '20px', color: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white' }}>{r.role}</h3>
                </div>
                <div style={{ padding: '24px' }}>
                  {r.features.map((f, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', fontSize: '14px', color: '#4B5563' }}>
                      <CheckCircle2 style={{ width: '16px', height: '16px', color: '#14B8A6', flexShrink: 0 }} />{f}
                    </div>
                  ))}
                  <Link to="/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '16px', fontSize: '13px', fontWeight: 700, color: '#2563EB', textDecoration: 'none' }}>
                    {r.role} Experience <ArrowRight style={{ width: '14px', height: '14px' }} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── HOW IT WORKS ──────── */}
      <section id="how-it-works" style={{ padding: '120px 24px', backgroundColor: '#FAFBFC' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2563EB', marginBottom: '12px' }}>How It Works</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#111827' }}>Simple for Patients. Powerful for Teams.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
            {[
              { step: '01', title: 'Connect', desc: 'Create your account and access your personalized healthcare workspace.', icon: Users },
              { step: '02', title: 'Manage', desc: 'Book appointments, manage queues, records, documents, and daily workflows.', icon: Layers },
              { step: '03', title: 'Understand', desc: 'Use intelligent tools to organize information and support operations.', icon: Brain },
              { step: '04', title: 'Improve', desc: 'Use analytics and insights to improve efficiency and patient experience.', icon: TrendingUp },
            ].map((s, i) => (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.1} variants={fade} style={{ textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <s.icon style={{ width: '24px', height: '24px', color: '#0F2B5B' }} />
                </div>
                <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.15em', color: '#2563EB', textTransform: 'uppercase' }}>{s.step}</p>
                <h3 style={{ marginTop: '8px', fontSize: '18px', fontWeight: 700, color: '#111827' }}>{s.title}</h3>
                <p style={{ marginTop: '8px', fontSize: '14px', color: '#6B7280', lineHeight: 1.7 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── AI SECTION ──────── */}
      <section id="ai" style={{ padding: '120px 24px', backgroundColor: '#0B1120', color: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr', gap: '60px', alignItems: 'center' }} className="lg:!grid-cols-2">
          <div>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2563EB', marginBottom: '12px' }}>AI Intelligence</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, lineHeight: 1.15 }}>Intelligence That Works Behind the Scenes.</h2>
            <p style={{ marginTop: '20px', fontSize: '16px', color: '#9CA3AF', lineHeight: 1.7 }}>AI-powered tools that assist healthcare workflows — from document analysis to intelligent information extraction.</p>

            <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Document analysis', 'Information extraction', 'Smart assistance', 'Workflow support', 'Intelligent insights'].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#D1D5DB' }}>
                  <CheckCircle2 style={{ width: '16px', height: '16px', color: '#14B8A6' }} />{item}
                </div>
              ))}
            </div>

            <p style={{ marginTop: '32px', fontSize: '13px', color: '#6B7280', borderLeft: '2px solid #374151', paddingLeft: '16px', lineHeight: 1.7 }}>
              AI provides assistive information and does not replace qualified medical professionals or clinical judgment.
            </p>

            <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '32px', backgroundColor: '#14B8A6', color: 'white', fontWeight: 600, fontSize: '14px', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none' }}>
              Explore AI Intelligence <ArrowRight size={16} />
            </Link>
          </div>

          {/* AI Terminal */}
          <div style={{ backgroundColor: '#111827', borderRadius: '16px', border: '1px solid #1F2937', padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <Cpu style={{ width: '16px', height: '16px', color: '#14B8A6' }} />
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#D1D5DB' }}>AI Intelligence</span>
            </div>
            <div style={{ backgroundColor: '#0B1120', borderRadius: '12px', padding: '24px', border: '1px solid #1F2937' }}>
              <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '20px' }}>Analyzing uploaded document...</p>
              {['Patient information detected', 'Document type identified', 'Key information extracted'].map((text, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.25 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0' }}
                >
                  <CheckCircle2 style={{ width: '16px', height: '16px', color: '#14B8A6' }} />
                  <span style={{ fontSize: '14px', color: '#D1D5DB' }}>{text}</span>
                </motion.div>
              ))}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #1F2937' }}>
                <span style={{ fontSize: '14px', fontWeight: 700, color: '#14B8A6' }}>✓ Processing Complete</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────── SECURITY ──────── */}
      <section id="security" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#2563EB', marginBottom: '12px' }}>Trust & Security</p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 800, color: '#111827' }}>Built With Privacy and Security in Mind.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
            {[
              { icon: ShieldCheck, title: 'Role-Based Access', desc: 'Granular permissions ensuring users only access what they need.' },
              { icon: KeyRound, title: 'Secure Authentication', desc: 'Multi-layer authentication protecting every account.' },
              { icon: Server, title: 'Protected APIs', desc: 'Hardened API endpoints with rate limiting and validation.' },
              { icon: Lock, title: 'Encrypted Communication', desc: 'End-to-end encryption for all data in transit and at rest.' },
              { icon: Eye, title: 'Audit-Friendly Architecture', desc: 'Complete activity logging for compliance and transparency.' },
              { icon: Shield, title: 'Controlled Data Access', desc: 'Fine-grained data access controls across the platform.' },
            ].map((s, i) => (
              <div key={i} style={{ backgroundColor: 'white', borderRadius: '14px', padding: '28px', border: '1px solid #E5E7EB', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <s.icon style={{ width: '20px', height: '20px', color: '#0F2B5B' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>{s.title}</h3>
                  <p style={{ marginTop: '6px', fontSize: '14px', color: '#6B7280', lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────── FINAL CTA ──────── */}
      <section style={{ padding: '120px 24px', background: 'linear-gradient(135deg, #0B1120 0%, #0F2050 50%, #0B1120 100%)' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: 'white', lineHeight: 1.15 }}>
            Build a Smarter<br />Healthcare Experience.
          </h2>
          <p style={{ marginTop: '20px', fontSize: '17px', color: '#9CA3AF', lineHeight: 1.7 }}>
            Connect patients, doctors, staff, and healthcare operations through one intelligent platform.
          </p>
          <div style={{ marginTop: '36px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px' }}>
            <Link to="/register" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'white', color: '#0F2B5B', fontWeight: 700, fontSize: '15px', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none' }}>
              Get Started <ArrowRight size={16} />
            </Link>
            <a href="#features" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 600, fontSize: '15px', padding: '14px 32px', borderRadius: '12px', textDecoration: 'none' }}>
              Explore Platform
            </a>
          </div>
        </div>
      </section>

      {/* ──────── FOOTER ──────── */}
      <footer style={{ padding: '64px 24px 40px', backgroundColor: '#0B1120', borderTop: '1px solid #1F2937' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '40px', marginBottom: '48px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{ width: '32px', height: '32px', backgroundColor: '#0F2B5B', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Activity style={{ width: '14px', height: '14px', color: 'white' }} />
                </div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'white' }}>MedFlow</span>
              </div>
              <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.7 }}>Smart healthcare management for modern hospitals.</p>
            </div>
            {[
              { title: 'Platform', links: ['Features', 'AI Intelligence', 'Appointments', 'Queue', 'Analytics'] },
              { title: 'Solutions', links: ['Patients', 'Doctors', 'Staff', 'Admin'] },
              { title: 'Company', links: ['About', 'Contact', 'Docs'] },
              { title: 'Legal', links: ['Privacy', 'Terms', 'Security'] },
            ].map((col) => (
              <div key={col.title}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6B7280', marginBottom: '16px' }}>{col.title}</p>
                {col.links.map((l) => (
                  <a key={l} href="#" style={{ display: 'block', fontSize: '13px', color: '#9CA3AF', textDecoration: 'none', padding: '4px 0' }}>{l}</a>
                ))}
              </div>
            ))}
          </div>
          <div style={{ paddingTop: '24px', borderTop: '1px solid #1F2937', textAlign: 'center' }}>
            <p style={{ fontSize: '13px', color: '#6B7280' }}>© 2026 MedFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

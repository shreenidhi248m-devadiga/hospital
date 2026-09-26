import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './stores/authStore';

// Layout
import DashboardLayout from './components/layout/DashboardLayout';
import ProtectedRoute from './components/layout/ProtectedRoute';

// Shared
import NotificationsPage from './components/shared/NotificationsPage';
import ProfilePage from './components/shared/ProfilePage';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';
import ForgotPasswordPage from './pages/public/ForgotPasswordPage';

// Patient Pages
import PatientDashboard from './pages/patient/PatientDashboard';
import PatientAppointments from './pages/patient/PatientAppointments';
import PatientDoctors from './pages/patient/PatientDoctors';
import PatientQueue from './pages/patient/PatientQueue';
import PatientRecords from './pages/patient/PatientRecords';
import PatientDocuments from './pages/patient/PatientDocuments';

// Doctor Pages
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppointments from './pages/doctor/DoctorAppointments';
import DoctorQueue from './pages/doctor/DoctorQueue';
import DoctorRecords from './pages/doctor/DoctorRecords';
import DoctorPrescriptions from './pages/doctor/DoctorPrescriptions';

// Staff Pages
import StaffDashboard from './pages/staff/StaffDashboard';
import StaffAppointments from './pages/staff/StaffAppointments';
import StaffQueue from './pages/staff/StaffQueue';
import StaffPatients from './pages/staff/StaffPatients';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminDoctors from './pages/admin/AdminDoctors';
import AdminPatients from './pages/admin/AdminPatients';
import AdminStaff from './pages/admin/AdminStaff';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminSettings from './pages/admin/AdminSettings';
import AdminSecurity from './pages/admin/AdminSecurity';

// Wrapper for shared pages that use mock data for admin-level tables
import Card from './components/ui/Card';
import Badge from './components/ui/Badge';
import DataTable from './components/ui/DataTable';
import Avatar from './components/ui/Avatar';
import { mockAppointments, mockQueue, mockMedicalRecords, mockDocuments } from './data/mockData';

// Reusable shared documents page
const SharedDocuments = () => {
  const columns = [
    { key: 'name', label: 'Document', render: (val) => <span className="font-medium text-surface-900">{val}</span> },
    { key: 'category', label: 'Category', render: (val) => <Badge variant="primary">{val}</Badge> },
    { key: 'size', label: 'Size' },
    { key: 'uploadDate', label: 'Uploaded' },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={val === 'Verified' || val === 'Final' ? 'success' : 'info'} dot>{val}</Badge> },
  ];
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-surface-900">Documents</h1><p className="text-sm text-surface-500 mt-1">Manage documents and files</p></div>
      <Card><DataTable columns={columns} data={mockDocuments} searchPlaceholder="Search documents..." /></Card>
    </div>
  );
};

// Reusable admin appointments / queue / records pages
const AdminAppointments = () => {
  const statusColors = { confirmed: 'success', pending: 'warning', cancelled: 'danger', completed: 'info' };
  const columns = [
    { key: 'patientName', label: 'Patient', render: (val) => <div className="flex items-center gap-2"><Avatar name={val} size="sm" /><span className="font-medium">{val}</span></div> },
    { key: 'doctorName', label: 'Doctor' },
    { key: 'specialty', label: 'Specialty' },
    { key: 'date', label: 'Date' },
    { key: 'time', label: 'Time' },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={statusColors[val]} dot>{val}</Badge> },
  ];
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-surface-900">All Appointments</h1><p className="text-sm text-surface-500 mt-1">System-wide appointment management</p></div>
      <Card><DataTable columns={columns} data={mockAppointments} searchPlaceholder="Search appointments..." /></Card>
    </div>
  );
};

const AdminQueue = () => {
  const columns = [
    { key: 'patientName', label: 'Patient', render: (val) => <div className="flex items-center gap-2"><Avatar name={val} size="sm" /><span className="font-medium">{val}</span></div> },
    { key: 'doctorName', label: 'Doctor' },
    { key: 'department', label: 'Department' },
    { key: 'position', label: 'Position', render: (val) => <span className="font-bold">#{val}</span> },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={val === 'in-progress' ? 'success' : 'warning'} dot>{val === 'in-progress' ? 'In Progress' : 'Waiting'}</Badge> },
    { key: 'estimatedTime', label: 'Est. Time' },
  ];
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-surface-900">Queue Overview</h1><p className="text-sm text-surface-500 mt-1">Monitor all patient queues</p></div>
      <Card><DataTable columns={columns} data={mockQueue} searchPlaceholder="Search queue..." /></Card>
    </div>
  );
};

const AdminRecords = () => {
  const columns = [
    { key: 'patientName', label: 'Patient' },
    { key: 'title', label: 'Title', render: (val) => <span className="font-medium text-surface-900">{val}</span> },
    { key: 'type', label: 'Type', render: (val) => <Badge variant="primary">{val}</Badge> },
    { key: 'doctor', label: 'Doctor' },
    { key: 'date', label: 'Date' },
    { key: 'status', label: 'Status', render: (val) => <Badge variant={val === 'Active' ? 'success' : 'info'} dot>{val}</Badge> },
  ];
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-surface-900">Medical Records</h1><p className="text-sm text-surface-500 mt-1">All patient medical records</p></div>
      <Card><DataTable columns={columns} data={mockMedicalRecords} searchPlaceholder="Search records..." /></Card>
    </div>
  );
};

const App = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to={`/${user?.role}`} replace /> : <LandingPage />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to={`/${user?.role}`} replace /> : <LoginPage />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to={`/${user?.role}`} replace /> : <RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Patient Routes */}
        <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/patient/appointments" element={<PatientAppointments />} />
            <Route path="/patient/doctors" element={<PatientDoctors />} />
            <Route path="/patient/queue" element={<PatientQueue />} />
            <Route path="/patient/records" element={<PatientRecords />} />
            <Route path="/patient/documents" element={<PatientDocuments />} />
            <Route path="/patient/notifications" element={<NotificationsPage />} />
            <Route path="/patient/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Doctor Routes */}
        <Route element={<ProtectedRoute allowedRoles={['doctor']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/doctor/queue" element={<DoctorQueue />} />
            <Route path="/doctor/records" element={<DoctorRecords />} />
            <Route path="/doctor/prescriptions" element={<DoctorPrescriptions />} />
            <Route path="/doctor/documents" element={<SharedDocuments />} />
            <Route path="/doctor/notifications" element={<NotificationsPage />} />
            <Route path="/doctor/profile" element={<ProfilePage />} />
          </Route>
        </Route>

        {/* Staff Routes */}
        <Route element={<ProtectedRoute allowedRoles={['staff']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/staff" element={<StaffDashboard />} />
            <Route path="/staff/appointments" element={<StaffAppointments />} />
            <Route path="/staff/queue" element={<StaffQueue />} />
            <Route path="/staff/patients" element={<StaffPatients />} />
            <Route path="/staff/documents" element={<SharedDocuments />} />
            <Route path="/staff/notifications" element={<NotificationsPage />} />
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/doctors" element={<AdminDoctors />} />
            <Route path="/admin/patients" element={<AdminPatients />} />
            <Route path="/admin/staff" element={<AdminStaff />} />
            <Route path="/admin/appointments" element={<AdminAppointments />} />
            <Route path="/admin/queue" element={<AdminQueue />} />
            <Route path="/admin/records" element={<AdminRecords />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/security" element={<AdminSecurity />} />
          </Route>
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

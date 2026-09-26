// ===================== DOCTORS =====================
export const mockDoctors = [
  { id: '1', name: 'Dr. Michael Chen', specialty: 'Cardiology', department: 'Cardiology', experience: '15 years', rating: 4.9, patients: 1250, available: true, email: 'dr.chen@medflow.com', phone: '+1 (555) 234-5678', education: 'Harvard Medical School', bio: 'Board-certified cardiologist with extensive experience in interventional cardiology and heart failure management.', schedule: { mon: '9:00 AM - 5:00 PM', tue: '9:00 AM - 5:00 PM', wed: '9:00 AM - 1:00 PM', thu: '9:00 AM - 5:00 PM', fri: '9:00 AM - 3:00 PM' }, fee: 250 },
  { id: '2', name: 'Dr. Emily Watson', specialty: 'Neurology', department: 'Neurology', experience: '12 years', rating: 4.8, patients: 980, available: true, email: 'dr.watson@medflow.com', phone: '+1 (555) 345-6789', education: 'Johns Hopkins University', bio: 'Specialized in neurodegenerative diseases and stroke management.', schedule: { mon: '10:00 AM - 6:00 PM', tue: '10:00 AM - 6:00 PM', wed: '10:00 AM - 6:00 PM', thu: '10:00 AM - 6:00 PM', fri: '10:00 AM - 2:00 PM' }, fee: 280 },
  { id: '3', name: 'Dr. Sarah Patel', specialty: 'Orthopedics', department: 'Orthopedics', experience: '10 years', rating: 4.7, patients: 850, available: true, email: 'dr.patel@medflow.com', phone: '+1 (555) 456-7890', education: 'Stanford University', bio: 'Expert in joint replacement surgery and sports medicine.', schedule: { mon: '8:00 AM - 4:00 PM', tue: '8:00 AM - 4:00 PM', wed: '8:00 AM - 12:00 PM', thu: '8:00 AM - 4:00 PM', fri: '8:00 AM - 4:00 PM' }, fee: 220 },
  { id: '4', name: 'Dr. James Rodriguez', specialty: 'Pediatrics', department: 'Pediatrics', experience: '18 years', rating: 4.9, patients: 2100, available: false, email: 'dr.rodriguez@medflow.com', phone: '+1 (555) 567-8901', education: 'Yale School of Medicine', bio: 'Dedicated pediatrician focusing on childhood development and preventive care.', schedule: { mon: '9:00 AM - 5:00 PM', tue: '9:00 AM - 5:00 PM', wed: '9:00 AM - 5:00 PM', thu: '9:00 AM - 5:00 PM', fri: '9:00 AM - 1:00 PM' }, fee: 180 },
  { id: '5', name: 'Dr. Lisa Kim', specialty: 'Dermatology', department: 'Dermatology', experience: '8 years', rating: 4.6, patients: 720, available: true, email: 'dr.kim@medflow.com', phone: '+1 (555) 678-9012', education: 'UCLA Medical School', bio: 'Specializing in cosmetic dermatology and skin cancer treatment.', schedule: { mon: '10:00 AM - 5:00 PM', tue: '10:00 AM - 5:00 PM', wed: 'Closed', thu: '10:00 AM - 5:00 PM', fri: '10:00 AM - 5:00 PM' }, fee: 200 },
  { id: '6', name: 'Dr. Robert Taylor', specialty: 'General Surgery', department: 'Surgery', experience: '20 years', rating: 4.8, patients: 1500, available: true, email: 'dr.taylor@medflow.com', phone: '+1 (555) 789-0123', education: 'Columbia University', bio: 'Renowned general surgeon with expertise in minimally invasive procedures.', schedule: { mon: '7:00 AM - 3:00 PM', tue: '7:00 AM - 3:00 PM', wed: '7:00 AM - 3:00 PM', thu: '7:00 AM - 3:00 PM', fri: '7:00 AM - 12:00 PM' }, fee: 350 },
];

// ===================== APPOINTMENTS =====================
export const mockAppointments = [
  { id: '1', patientName: 'Sarah Johnson', patientId: 'P001', doctorName: 'Dr. Michael Chen', doctorId: '1', specialty: 'Cardiology', date: '2026-10-15', time: '10:00 AM', status: 'confirmed', type: 'Check-up', notes: 'Annual heart check-up', room: '301' },
  { id: '2', patientName: 'Sarah Johnson', patientId: 'P001', doctorName: 'Dr. Emily Watson', doctorId: '2', specialty: 'Neurology', date: '2026-10-18', time: '2:30 PM', status: 'pending', type: 'Consultation', notes: 'Follow-up for headaches', room: '205' },
  { id: '3', patientName: 'John Davis', patientId: 'P002', doctorName: 'Dr. Michael Chen', doctorId: '1', specialty: 'Cardiology', date: '2026-10-15', time: '11:00 AM', status: 'confirmed', type: 'Follow-up', notes: 'Post-surgery follow-up', room: '301' },
  { id: '4', patientName: 'Maria Garcia', patientId: 'P003', doctorName: 'Dr. Sarah Patel', doctorId: '3', specialty: 'Orthopedics', date: '2026-10-16', time: '9:00 AM', status: 'confirmed', type: 'Surgery', notes: 'Knee replacement consultation', room: '410' },
  { id: '5', patientName: 'Robert Brown', patientId: 'P004', doctorName: 'Dr. Lisa Kim', doctorId: '5', specialty: 'Dermatology', date: '2026-10-17', time: '3:00 PM', status: 'cancelled', type: 'Check-up', notes: 'Skin screening', room: '102' },
  { id: '6', patientName: 'Sarah Johnson', patientId: 'P001', doctorName: 'Dr. Sarah Patel', doctorId: '3', specialty: 'Orthopedics', date: '2026-09-28', time: '11:30 AM', status: 'completed', type: 'Follow-up', notes: 'Physical therapy review', room: '410' },
  { id: '7', patientName: 'Emily White', patientId: 'P005', doctorName: 'Dr. James Rodriguez', doctorId: '4', specialty: 'Pediatrics', date: '2026-10-19', time: '10:00 AM', status: 'confirmed', type: 'Vaccination', notes: 'Scheduled vaccinations', room: '108' },
  { id: '8', patientName: 'Thomas Lee', patientId: 'P006', doctorName: 'Dr. Robert Taylor', doctorId: '6', specialty: 'General Surgery', date: '2026-10-20', time: '8:00 AM', status: 'pending', type: 'Pre-op', notes: 'Pre-operative assessment', room: '501' },
];

// ===================== PATIENTS =====================
export const mockPatients = [
  { id: 'P001', name: 'Sarah Johnson', age: 34, gender: 'Female', blood: 'A+', phone: '+1 (555) 123-4567', email: 'sarah.j@email.com', address: '123 Oak Street, Springfield', insurance: 'BlueCross Gold', emergencyContact: 'Mark Johnson - +1 (555) 111-2222', allergies: ['Penicillin', 'Latex'], conditions: ['Hypertension'], lastVisit: '2026-09-28', registeredDate: '2024-03-15' },
  { id: 'P002', name: 'John Davis', age: 58, gender: 'Male', blood: 'O-', phone: '+1 (555) 234-5678', email: 'john.d@email.com', address: '456 Elm Avenue, Springfield', insurance: 'Aetna Premium', emergencyContact: 'Mary Davis - +1 (555) 222-3333', allergies: ['Aspirin'], conditions: ['Diabetes Type 2', 'Heart Disease'], lastVisit: '2026-10-01', registeredDate: '2023-06-20' },
  { id: 'P003', name: 'Maria Garcia', age: 45, gender: 'Female', blood: 'B+', phone: '+1 (555) 345-6789', email: 'maria.g@email.com', address: '789 Pine Road, Springfield', insurance: 'United Health', emergencyContact: 'Carlos Garcia - +1 (555) 333-4444', allergies: [], conditions: ['Arthritis'], lastVisit: '2026-09-25', registeredDate: '2024-01-10' },
  { id: 'P004', name: 'Robert Brown', age: 29, gender: 'Male', blood: 'AB+', phone: '+1 (555) 456-7890', email: 'robert.b@email.com', address: '321 Maple Lane, Springfield', insurance: 'Cigna Select', emergencyContact: 'Linda Brown - +1 (555) 444-5555', allergies: ['Sulfa drugs'], conditions: [], lastVisit: '2026-09-20', registeredDate: '2025-02-28' },
  { id: 'P005', name: 'Emily White', age: 8, gender: 'Female', blood: 'A-', phone: '+1 (555) 567-8901', email: 'parent.white@email.com', address: '654 Cedar Blvd, Springfield', insurance: 'Kaiser Permanente', emergencyContact: 'Rachel White - +1 (555) 555-6666', allergies: ['Eggs'], conditions: ['Asthma'], lastVisit: '2026-10-02', registeredDate: '2024-08-05' },
  { id: 'P006', name: 'Thomas Lee', age: 67, gender: 'Male', blood: 'O+', phone: '+1 (555) 678-9012', email: 'thomas.l@email.com', address: '987 Birch Court, Springfield', insurance: 'Medicare', emergencyContact: 'Susan Lee - +1 (555) 666-7777', allergies: [], conditions: ['COPD', 'Hypertension'], lastVisit: '2026-10-03', registeredDate: '2022-11-15' },
];

// ===================== MEDICAL RECORDS =====================
export const mockMedicalRecords = [
  { id: 'R001', patientId: 'P001', patientName: 'Sarah Johnson', type: 'Lab Results', title: 'Complete Blood Count', date: '2026-09-28', doctor: 'Dr. Michael Chen', status: 'Final', summary: 'All values within normal range. Hemoglobin 13.5 g/dL, WBC 7,200/μL, Platelets 250,000/μL.', attachments: 1 },
  { id: 'R002', patientId: 'P001', patientName: 'Sarah Johnson', type: 'Prescription', title: 'Lisinopril 10mg', date: '2026-09-28', doctor: 'Dr. Michael Chen', status: 'Active', summary: 'For blood pressure management. Take once daily in the morning.', attachments: 0 },
  { id: 'R003', patientId: 'P001', patientName: 'Sarah Johnson', type: 'Imaging', title: 'Chest X-Ray', date: '2026-08-15', doctor: 'Dr. Emily Watson', status: 'Final', summary: 'No abnormalities detected. Lung fields are clear.', attachments: 2 },
  { id: 'R004', patientId: 'P002', patientName: 'John Davis', type: 'Lab Results', title: 'Lipid Panel', date: '2026-10-01', doctor: 'Dr. Michael Chen', status: 'Final', summary: 'Total Cholesterol: 245 mg/dL (High). LDL: 160 mg/dL. HDL: 42 mg/dL.', attachments: 1 },
  { id: 'R005', patientId: 'P002', patientName: 'John Davis', type: 'Procedure', title: 'Cardiac Catheterization', date: '2026-09-15', doctor: 'Dr. Michael Chen', status: 'Final', summary: 'Successful diagnostic catheterization. Mild stenosis in LAD artery.', attachments: 3 },
  { id: 'R006', patientId: 'P003', patientName: 'Maria Garcia', type: 'Prescription', title: 'Methotrexate 15mg', date: '2026-09-25', doctor: 'Dr. Sarah Patel', status: 'Active', summary: 'For rheumatoid arthritis management. Weekly dosage.', attachments: 0 },
];

// ===================== QUEUE =====================
export const mockQueue = [
  { id: 'Q001', patientId: 'P001', patientName: 'Sarah Johnson', doctorId: '1', doctorName: 'Dr. Michael Chen', position: 1, status: 'in-progress', estimatedTime: '10:00 AM', department: 'Cardiology', checkInTime: '9:45 AM', type: 'Check-up' },
  { id: 'Q002', patientId: 'P002', patientName: 'John Davis', doctorId: '1', doctorName: 'Dr. Michael Chen', position: 2, status: 'waiting', estimatedTime: '10:30 AM', department: 'Cardiology', checkInTime: '10:05 AM', type: 'Follow-up' },
  { id: 'Q003', patientId: 'P003', patientName: 'Maria Garcia', doctorId: '3', doctorName: 'Dr. Sarah Patel', position: 1, status: 'in-progress', estimatedTime: '9:00 AM', department: 'Orthopedics', checkInTime: '8:50 AM', type: 'Consultation' },
  { id: 'Q004', patientId: 'P005', patientName: 'Emily White', doctorId: '4', doctorName: 'Dr. James Rodriguez', position: 1, status: 'waiting', estimatedTime: '10:30 AM', department: 'Pediatrics', checkInTime: '10:15 AM', type: 'Vaccination' },
  { id: 'Q005', patientId: 'P004', patientName: 'Robert Brown', doctorId: '5', doctorName: 'Dr. Lisa Kim', position: 1, status: 'waiting', estimatedTime: '3:00 PM', department: 'Dermatology', checkInTime: '2:45 PM', type: 'Check-up' },
  { id: 'Q006', patientId: 'P006', patientName: 'Thomas Lee', doctorId: '1', doctorName: 'Dr. Michael Chen', position: 3, status: 'waiting', estimatedTime: '11:00 AM', department: 'Cardiology', checkInTime: '10:30 AM', type: 'Consultation' },
];

// ===================== DOCUMENTS =====================
export const mockDocuments = [
  { id: 'D001', name: 'Insurance_Claim_Form.pdf', type: 'PDF', size: '245 KB', uploadedBy: 'Sarah Johnson', uploadDate: '2026-09-28', category: 'Insurance', status: 'Verified' },
  { id: 'D002', name: 'Lab_Results_CBC.pdf', type: 'PDF', size: '180 KB', uploadedBy: 'System', uploadDate: '2026-09-28', category: 'Lab Results', status: 'Final' },
  { id: 'D003', name: 'Chest_XRay_Report.pdf', type: 'PDF', size: '1.2 MB', uploadedBy: 'Dr. Emily Watson', uploadDate: '2026-08-15', category: 'Imaging', status: 'Final' },
  { id: 'D004', name: 'Prescription_Lisinopril.pdf', type: 'PDF', size: '95 KB', uploadedBy: 'Dr. Michael Chen', uploadDate: '2026-09-28', category: 'Prescription', status: 'Active' },
  { id: 'D005', name: 'Medical_History_Summary.pdf', type: 'PDF', size: '320 KB', uploadedBy: 'System', uploadDate: '2026-09-01', category: 'Records', status: 'Current' },
  { id: 'D006', name: 'Consent_Form_Surgery.pdf', type: 'PDF', size: '150 KB', uploadedBy: 'Maria Garcia', uploadDate: '2026-09-20', category: 'Consent', status: 'Signed' },
];

// ===================== PRESCRIPTIONS =====================
export const mockPrescriptions = [
  { id: 'RX001', patientId: 'P001', patientName: 'Sarah Johnson', medication: 'Lisinopril 10mg', dosage: 'Once daily, morning', duration: '90 days', prescribedBy: 'Dr. Michael Chen', prescribedDate: '2026-09-28', status: 'Active', refills: 2, pharmacy: 'CVS Pharmacy - Springfield' },
  { id: 'RX002', patientId: 'P001', patientName: 'Sarah Johnson', medication: 'Atorvastatin 20mg', dosage: 'Once daily, evening', duration: '90 days', prescribedBy: 'Dr. Michael Chen', prescribedDate: '2026-09-28', status: 'Active', refills: 2, pharmacy: 'CVS Pharmacy - Springfield' },
  { id: 'RX003', patientId: 'P002', patientName: 'John Davis', medication: 'Metformin 500mg', dosage: 'Twice daily with meals', duration: '180 days', prescribedBy: 'Dr. Michael Chen', prescribedDate: '2026-10-01', status: 'Active', refills: 5, pharmacy: 'Walgreens - Downtown' },
  { id: 'RX004', patientId: 'P003', patientName: 'Maria Garcia', medication: 'Methotrexate 15mg', dosage: 'Once weekly', duration: '120 days', prescribedBy: 'Dr. Sarah Patel', prescribedDate: '2026-09-25', status: 'Active', refills: 3, pharmacy: 'Rite Aid - Main St' },
  { id: 'RX005', patientId: 'P002', patientName: 'John Davis', medication: 'Aspirin 81mg', dosage: 'Once daily', duration: '365 days', prescribedBy: 'Dr. Michael Chen', prescribedDate: '2026-09-15', status: 'Active', refills: 11, pharmacy: 'Walgreens - Downtown' },
];

// ===================== STAFF =====================
export const mockStaff = [
  { id: 'S001', name: 'Emily Rodriguez', role: 'Receptionist', department: 'Front Desk', phone: '+1 (555) 345-6789', email: 'emily.r@medflow.com', shift: 'Morning (7AM - 3PM)', status: 'Active', joinDate: '2023-05-10' },
  { id: 'S002', name: 'David Kim', role: 'Nurse', department: 'Cardiology', phone: '+1 (555) 890-1234', email: 'david.k@medflow.com', shift: 'Morning (7AM - 3PM)', status: 'Active', joinDate: '2022-08-15' },
  { id: 'S003', name: 'Lisa Thompson', role: 'Lab Technician', department: 'Laboratory', phone: '+1 (555) 901-2345', email: 'lisa.t@medflow.com', shift: 'Day (8AM - 4PM)', status: 'Active', joinDate: '2024-01-20' },
  { id: 'S004', name: 'Mark Anderson', role: 'Pharmacist', department: 'Pharmacy', phone: '+1 (555) 012-3456', email: 'mark.a@medflow.com', shift: 'Day (9AM - 5PM)', status: 'Active', joinDate: '2023-03-01' },
  { id: 'S005', name: 'Anna Martinez', role: 'Nurse', department: 'Emergency', phone: '+1 (555) 123-4567', email: 'anna.m@medflow.com', shift: 'Night (11PM - 7AM)', status: 'On Leave', joinDate: '2022-11-10' },
];

// ===================== ANALYTICS DATA =====================
export const analyticsData = {
  patientVisits: [
    { month: 'Jan', visits: 1200, newPatients: 180 },
    { month: 'Feb', visits: 1350, newPatients: 210 },
    { month: 'Mar', visits: 1450, newPatients: 195 },
    { month: 'Apr', visits: 1280, newPatients: 170 },
    { month: 'May', visits: 1520, newPatients: 230 },
    { month: 'Jun', visits: 1680, newPatients: 255 },
    { month: 'Jul', visits: 1590, newPatients: 240 },
    { month: 'Aug', visits: 1720, newPatients: 260 },
    { month: 'Sep', visits: 1850, newPatients: 280 },
    { month: 'Oct', visits: 1650, newPatients: 245 },
  ],
  departmentLoad: [
    { name: 'Cardiology', value: 320, color: '#3B82F6' },
    { name: 'Neurology', value: 240, color: '#8B5CF6' },
    { name: 'Orthopedics', value: 280, color: '#14B8A6' },
    { name: 'Pediatrics', value: 350, color: '#F59E0B' },
    { name: 'Dermatology', value: 190, color: '#EF4444' },
    { name: 'Surgery', value: 220, color: '#10B981' },
  ],
  revenue: [
    { month: 'Jan', revenue: 285000, expenses: 195000 },
    { month: 'Feb', revenue: 310000, expenses: 205000 },
    { month: 'Mar', revenue: 340000, expenses: 210000 },
    { month: 'Apr', revenue: 295000, expenses: 200000 },
    { month: 'May', revenue: 365000, expenses: 220000 },
    { month: 'Jun', revenue: 390000, expenses: 235000 },
    { month: 'Jul', revenue: 375000, expenses: 228000 },
    { month: 'Aug', revenue: 410000, expenses: 240000 },
    { month: 'Sep', revenue: 435000, expenses: 250000 },
    { month: 'Oct', revenue: 400000, expenses: 242000 },
  ],
  satisfaction: [
    { category: 'Wait Time', score: 4.2 },
    { category: 'Staff', score: 4.7 },
    { category: 'Facilities', score: 4.5 },
    { category: 'Communication', score: 4.3 },
    { category: 'Overall', score: 4.5 },
  ],
};

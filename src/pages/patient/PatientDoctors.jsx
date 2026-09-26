import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Star, MapPin, Clock, DollarSign, Filter } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { mockDoctors } from '../../data/mockData';

const PatientDoctors = () => {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const specialties = ['all', ...new Set(mockDoctors.map((d) => d.specialty))];

  const filtered = mockDoctors.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    const matchSpecialty = specialty === 'all' || d.specialty === specialty;
    return matchSearch && matchSpecialty;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Find a Doctor</h1>
        <p className="text-sm text-surface-500 mt-1">Browse and connect with our healthcare specialists</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or specialty..."
            className="w-full pl-10 pr-4 py-2.5 text-sm border border-surface-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          />
        </div>
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="px-4 py-2.5 text-sm border border-surface-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
        >
          {specialties.map((s) => (
            <option key={s} value={s}>{s === 'all' ? 'All Specialties' : s}</option>
          ))}
        </select>
      </div>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((doctor, i) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card hover className="cursor-pointer" onClick={() => setSelectedDoctor(doctor)}>
              <div className="flex items-start gap-4">
                <Avatar name={doctor.name} size="lg" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-semibold text-surface-900 truncate">{doctor.name}</h3>
                  <p className="text-sm text-primary-600">{doctor.specialty}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-medium text-surface-700">{doctor.rating}</span>
                    <span className="text-xs text-surface-400">· {doctor.patients} patients</span>
                  </div>
                </div>
                <Badge variant={doctor.available ? 'success' : 'danger'} dot>
                  {doctor.available ? 'Available' : 'Busy'}
                </Badge>
              </div>
              <div className="mt-4 flex items-center gap-4 text-xs text-surface-500">
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{doctor.experience}</span>
                <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />${doctor.fee}/visit</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Doctor Detail Modal */}
      <Modal
        isOpen={!!selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        title="Doctor Profile"
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setSelectedDoctor(null)}>Close</Button>
            <Button>Book Appointment</Button>
          </>
        }
      >
        {selectedDoctor && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar name={selectedDoctor.name} size="xl" />
              <div>
                <h3 className="text-xl font-bold text-surface-900">{selectedDoctor.name}</h3>
                <p className="text-primary-600 font-medium">{selectedDoctor.specialty}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-semibold">{selectedDoctor.rating}</span>
                  </div>
                  <span className="text-sm text-surface-400">· {selectedDoctor.experience} experience</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-surface-800 mb-1">About</h4>
              <p className="text-sm text-surface-600 leading-relaxed">{selectedDoctor.bio}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-surface-800 mb-1">Education</h4>
              <p className="text-sm text-surface-600">{selectedDoctor.education}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-surface-800 mb-2">Schedule</h4>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(selectedDoctor.schedule).map(([day, time]) => (
                  <div key={day} className="flex justify-between px-3 py-2 rounded-lg bg-surface-50 text-sm">
                    <span className="font-medium text-surface-700 capitalize">{day}</span>
                    <span className="text-surface-500">{time}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-6 pt-2">
              <div><span className="text-sm text-surface-500">Consultation Fee</span><p className="text-lg font-bold text-surface-900">${selectedDoctor.fee}</p></div>
              <div><span className="text-sm text-surface-500">Total Patients</span><p className="text-lg font-bold text-surface-900">{selectedDoctor.patients.toLocaleString()}</p></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PatientDoctors;

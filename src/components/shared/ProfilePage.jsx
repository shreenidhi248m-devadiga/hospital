import { useState } from 'react';
import { User, Mail, Phone, MapPin, Shield, Camera, Save } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Avatar from '../ui/Avatar';

const ProfilePage = () => {
  const { user } = useAuthStore();
  const [editing, setEditing] = useState(false);

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">Profile</h1>
        <p className="text-sm text-surface-500 mt-1">Manage your personal information and settings</p>
      </div>

      {/* Avatar Card */}
      <Card>
        <div className="flex items-center gap-5">
          <div className="relative">
            <Avatar name={user?.name} size="2xl" />
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white shadow-md hover:bg-primary-700 transition-colors cursor-pointer">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-surface-900">{user?.name}</h2>
            <p className="text-sm text-surface-500">{user?.email}</p>
            <p className="text-sm text-primary-600 font-medium capitalize mt-0.5">{user?.role}</p>
          </div>
        </div>
      </Card>

      {/* Personal Info */}
      <Card>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-surface-900">Personal Information</h2>
          <Button variant={editing ? 'primary' : 'outline'} size="sm" icon={editing ? Save : User} onClick={() => setEditing(!editing)}>
            {editing ? 'Save Changes' : 'Edit'}
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Full Name" icon={User} defaultValue={user?.name} disabled={!editing} />
          <Input label="Email" icon={Mail} type="email" defaultValue={user?.email} disabled={!editing} />
          <Input label="Phone" icon={Phone} defaultValue={user?.phone || '+1 (555) 123-4567'} disabled={!editing} />
          <Input label="Address" icon={MapPin} defaultValue="123 Oak Street, Springfield" disabled={!editing} />
        </div>
      </Card>

      {/* Security */}
      <Card>
        <h2 className="text-lg font-semibold text-surface-900 mb-5">Security</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl bg-surface-50">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-surface-500" />
              <div>
                <p className="text-sm font-medium text-surface-900">Password</p>
                <p className="text-xs text-surface-500">Last changed 30 days ago</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-surface-50">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-surface-500" />
              <div>
                <p className="text-sm font-medium text-surface-900">Two-Factor Authentication</p>
                <p className="text-xs text-surface-500">Add an extra layer of security</p>
              </div>
            </div>
            <Button variant="outline" size="sm">Enable</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;

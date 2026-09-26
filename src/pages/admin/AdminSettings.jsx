import { Save, Globe, Bell, Database, Mail, Shield } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const AdminSettings = () => {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-surface-900">System Settings</h1>
        <p className="text-sm text-surface-500 mt-1">Configure system-wide settings</p>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center"><Globe className="w-5 h-5 text-primary-600" /></div>
          <h2 className="text-lg font-semibold text-surface-900">General</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Hospital Name" defaultValue="MedFlow General Hospital" />
          <Input label="Contact Email" type="email" defaultValue="admin@medflow.com" />
          <Input label="Phone" defaultValue="+1 (555) 000-0000" />
          <Input label="Address" defaultValue="123 Healthcare Blvd, Springfield" />
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center"><Bell className="w-5 h-5 text-amber-600" /></div>
          <h2 className="text-lg font-semibold text-surface-900">Notifications</h2>
        </div>
        <div className="space-y-4">
          {['Email notifications for new appointments', 'SMS reminders to patients', 'Staff shift change alerts', 'System maintenance notifications'].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-surface-50">
              <span className="text-sm text-surface-700">{item}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={i < 2} className="sr-only peer" />
                <div className="w-9 h-5 bg-surface-300 peer-focus:ring-2 peer-focus:ring-primary-500/20 rounded-full peer peer-checked:bg-primary-600 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-lg bg-secondary-50 flex items-center justify-center"><Database className="w-5 h-5 text-secondary-600" /></div>
          <h2 className="text-lg font-semibold text-surface-900">System</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface-50">
            <div><p className="text-sm font-medium text-surface-900">Automatic Backups</p><p className="text-xs text-surface-500">Daily backups at 2:00 AM</p></div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface-50">
            <div><p className="text-sm font-medium text-surface-900">API Rate Limiting</p><p className="text-xs text-surface-500">100 requests per minute</p></div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-surface-50">
            <div><p className="text-sm font-medium text-surface-900">Session Timeout</p><p className="text-xs text-surface-500">30 minutes of inactivity</p></div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button icon={Save} size="lg">Save Settings</Button>
      </div>
    </div>
  );
};

export default AdminSettings;

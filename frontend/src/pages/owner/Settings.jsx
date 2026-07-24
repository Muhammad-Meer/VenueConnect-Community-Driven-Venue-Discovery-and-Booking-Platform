import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import Switch from '../../components/ui/Switch';
import Select from '../../components/ui/Select';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { selectOwnerSettings, updateOwnerSettings } from '../../store/slices/ownerSlice';
import { useToast } from '../../components/ui/Toast';
import { useState } from 'react';

export default function OwnerSettings() {
  const settings = useSelector(selectOwnerSettings);
  const dispatch = useDispatch();
  const toast = useToast();
  const [form, setForm] = useState(settings);

  return (
    <div>
      <PageHeader title="Settings" description="Notifications, booking preferences, and account defaults." />
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Owner preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Switch
            label="Auto-accept bookings"
            description="Skip manual approval for verified customers"
            checked={form.autoAccept}
            onChange={(e) => setForm((f) => ({ ...f, autoAccept: e.target.checked }))}
          />
          <Switch
            label="Email notifications"
            checked={form.notifyEmail}
            onChange={(e) => setForm((f) => ({ ...f, notifyEmail: e.target.checked }))}
          />
          <Switch
            label="SMS notifications"
            checked={form.notifySms}
            onChange={(e) => setForm((f) => ({ ...f, notifySms: e.target.checked }))}
          />
          <Select
            label="Currency"
            value={form.currency}
            onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
            options={['USD', 'EUR', 'GBP', 'CAD']}
            placeholder={null}
          />
          <Input
            label="Timezone"
            value={form.timezone}
            onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}
          />
          <Button
            onClick={() => {
              dispatch(updateOwnerSettings(form));
              toast.success('Settings saved');
            }}
          >
            Save settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

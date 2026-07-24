import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/common/PageHeader';
import Input from '../../components/ui/Input';
import Switch from '../../components/ui/Switch';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { selectAdminSettings, updateAdminSettings } from '../../store/slices/adminSlice';
import { useToast } from '../../components/ui/Toast';

export default function AdminSettings() {
  const settings = useSelector(selectAdminSettings);
  const [form, setForm] = useState(settings);
  const dispatch = useDispatch();
  const toast = useToast();

  return (
    <div>
      <PageHeader title="Platform settings" description="Control commission, approvals, and maintenance mode." />
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Platform name"
            value={form.platformName}
            onChange={(e) => setForm((f) => ({ ...f, platformName: e.target.value }))}
          />
          <Input
            label="Commission rate (%)"
            type="number"
            value={form.commissionRate}
            onChange={(e) => setForm((f) => ({ ...f, commissionRate: Number(e.target.value) }))}
          />
          <Input
            label="Support email"
            value={form.supportEmail}
            onChange={(e) => setForm((f) => ({ ...f, supportEmail: e.target.value }))}
          />
          <Switch
            label="Require venue approval"
            checked={form.requireVenueApproval}
            onChange={(e) => setForm((f) => ({ ...f, requireVenueApproval: e.target.checked }))}
          />
          <Switch
            label="Require owner verification"
            checked={form.requireOwnerVerification}
            onChange={(e) => setForm((f) => ({ ...f, requireOwnerVerification: e.target.checked }))}
          />
          <Switch
            label="Maintenance mode"
            checked={form.maintenanceMode}
            onChange={(e) => setForm((f) => ({ ...f, maintenanceMode: e.target.checked }))}
          />
          <Button
            onClick={() => {
              dispatch(updateAdminSettings(form));
              toast.success('Platform settings saved');
            }}
          >
            Save settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

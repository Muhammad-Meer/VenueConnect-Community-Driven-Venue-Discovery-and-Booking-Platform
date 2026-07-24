import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PageHeader from '../../components/common/PageHeader';
import Table from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { teamMemberSchema } from '../../schemas/booking';
import {
  addTeamMember,
  assignSeat,
  removeTeamMember,
  selectTeam,
} from '../../store/slices/userSlice';
import { selectSeats } from '../../store/slices/ownerSlice';
import { useToast } from '../../components/ui/Toast';
import { cn } from '../../lib/cn';

export default function Team() {
  const dispatch = useDispatch();
  const toast = useToast();
  const team = useSelector(selectTeam);
  const seats = useSelector(selectSeats);
  const [open, setOpen] = useState(false);
  const form = useForm({
    resolver: zodResolver(teamMemberSchema),
    defaultValues: { name: '', email: '', role: 'Member' },
  });

  return (
    <div>
      <PageHeader
        title="Team members"
        description="Invite teammates and assign seats for your next booking."
        actions={
          <Button onClick={() => setOpen(true)}>Add member</Button>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Table
          columns={[
            { key: 'name', header: 'Name' },
            { key: 'email', header: 'Email' },
            { key: 'role', header: 'Role' },
            {
              key: 'seat',
              header: 'Seat',
              render: (seat, row) => (
                <Select
                  value={seat || ''}
                  onChange={(e) => {
                    dispatch(assignSeat({ memberId: row.id, seat: e.target.value }));
                    toast.success('Seat updated');
                  }}
                  options={seats.map((s) => ({ value: s.id, label: s.id }))}
                  placeholder="Unassigned"
                  className="min-w-[120px]"
                />
              ),
            },
            {
              key: 'id',
              header: '',
              render: (id) => (
                <Button size="sm" variant="ghost" onClick={() => dispatch(removeTeamMember(id))}>
                  Remove
                </Button>
              ),
            },
          ]}
          data={team}
          empty="No team members yet"
        />

        <Card>
          <CardHeader>
            <CardTitle>Seat map</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-2">
              {seats.map((seat) => {
                const assigned = team.find((m) => m.seat === seat.id);
                return (
                  <div
                    key={seat.id}
                    className={cn(
                      'rounded-lg border px-2 py-3 text-center text-xs font-medium',
                      assigned
                        ? 'border-brand-300 bg-brand-50 text-brand-700 dark:bg-brand-950'
                        : seat.status === 'occupied'
                          ? 'border-danger/30 bg-danger-soft text-danger'
                          : 'border-border bg-surface-muted text-content-muted'
                    )}
                    title={assigned?.name || seat.status}
                  >
                    {seat.id}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Add team member"
        footer={
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit((values) => {
                dispatch(addTeamMember(values));
                toast.success('Member added');
                form.reset();
                setOpen(false);
              })}
            >
              Add
            </Button>
          </div>
        }
      >
        <div className="space-y-3">
          <Input label="Name" error={form.formState.errors.name?.message} {...form.register('name')} />
          <Input label="Email" error={form.formState.errors.email?.message} {...form.register('email')} />
          <Input label="Role" error={form.formState.errors.role?.message} {...form.register('role')} />
        </div>
      </Modal>
    </div>
  );
}

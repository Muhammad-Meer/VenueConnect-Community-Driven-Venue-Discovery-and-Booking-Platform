import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PageHeader from '../../components/common/PageHeader';
import ProfileCard from '../../components/cards/ProfileCard';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Button from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { profileSchema } from '../../schemas/auth';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/ui/Toast';

export default function Profile() {
  const { user, updateProfile, loading } = useAuth();
  const toast = useToast();
  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      bio: '',
      avatar: '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        company: user.company || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
      });
    }
  }, [user, form]);

  const onSubmit = async (values) => {
    const result = await updateProfile(values);
    if (result.meta.requestStatus === 'fulfilled') toast.success('Profile updated');
    else toast.error('Update failed', result.payload);
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Profile" description="Manage your personal details and preferences." />
      <ProfileCard user={user} />
      <Card>
        <CardHeader>
          <CardTitle>Edit profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={form.handleSubmit(onSubmit)}>
            <Input label="Name" error={form.formState.errors.name?.message} {...form.register('name')} />
            <Input label="Email" error={form.formState.errors.email?.message} {...form.register('email')} />
            <Input label="Phone" {...form.register('phone')} />
            <Input label="Company" {...form.register('company')} />
            <div className="md:col-span-2">
              <Textarea label="Bio" rows={4} {...form.register('bio')} />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" loading={loading}>
                Save changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

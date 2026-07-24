import { useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '../../schemas/auth';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/ui/Toast';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Checkbox from '../../components/ui/Checkbox';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

export default function Register() {
  const [params] = useSearchParams();
  const defaultRole = params.get('role') === 'owner' ? 'venue_owner' : 'customer';
  const { register: registerUser, loading, error, isAuthenticated, homePath, clearError } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: defaultRole,
      phone: '',
      acceptTerms: false,
    },
  });

  useEffect(() => {
    if (isAuthenticated) navigate(homePath, { replace: true });
  }, [isAuthenticated, homePath, navigate]);

  useEffect(() => () => clearError(), [clearError]);

  const onSubmit = async (values) => {
    const result = await registerUser(values);
    if (result?.meta?.requestStatus === 'fulfilled') {
      toast.success('Account created', 'Welcome to VenueHub.');
      navigate('/email-confirmation');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-content">Create your account</h1>
      <p className="mt-1 text-sm text-content-muted">Start booking or listing venues in minutes.</p>

      {error && (
        <Alert tone="danger" className="mt-4" title="Registration failed">
          {error}
        </Alert>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Full name" error={errors.name?.message} {...register('name')} />
        <Input label="Email" type="email" error={errors.email?.message} {...register('email')} />
        <Input label="Phone" error={errors.phone?.message} {...register('phone')} />
        <Select
          label="I am a"
          options={[
            { value: 'customer', label: 'Customer / Team' },
            { value: 'venue_owner', label: 'Venue Owner' },
          ]}
          placeholder={null}
          error={errors.role?.message}
          {...register('role')}
        />
        <Input label="Password" type="password" error={errors.password?.message} {...register('password')} />
        <Input
          label="Confirm password"
          type="password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Checkbox
          label="I agree to the Terms and Privacy Policy"
          error={errors.acceptTerms?.message}
          {...register('acceptTerms')}
        />
        <Button type="submit" fullWidth loading={loading}>
          Create account
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-content-muted">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-brand-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}

import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../schemas/auth';
import { useAuth } from '../../hooks/useAuth';
import { useToast } from '../../components/ui/Toast';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';
import { Mail, Lock } from 'lucide-react';

export default function Login() {
  const { login, loading, error, isAuthenticated, homePath, clearError } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'customer@venuehub.app', password: 'demo1234' },
  });

  useEffect(() => {
    if (isAuthenticated) navigate(from || homePath, { replace: true });
  }, [isAuthenticated, homePath, navigate, from]);

  useEffect(() => () => clearError(), [clearError]);

  const onSubmit = async (values) => {
    const result = await login(values);
    if (result?.meta?.requestStatus === 'fulfilled') {
      toast.success('Welcome back', 'You are signed in.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-content">Sign in</h1>
      <p className="mt-1 text-sm text-content-muted">Access your VenueHub workspace.</p>

      <div className="mt-4 rounded-xl border border-border bg-surface-muted p-3 text-xs text-content-secondary">
        <p className="font-semibold text-content">Demo accounts</p>
        <p>customer@venuehub.app · owner@venuehub.app · admin@venuehub.app</p>
        <p>Password: any 6+ characters</p>
      </div>

      {error && (
        <Alert tone="danger" className="mt-4" title="Sign in failed">
          {error}
        </Alert>
      )}

      <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          leftIcon={<Lock className="h-4 w-4" />}
          error={errors.password?.message}
          {...register('password')}
        />
        <div className="flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="text-brand-600 hover:underline">
            Forgot password?
          </Link>
        </div>
        <Button type="submit" fullWidth loading={loading}>
          Sign in
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-content-muted">
        New here?{' '}
        <Link to="/register" className="font-medium text-brand-600 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}

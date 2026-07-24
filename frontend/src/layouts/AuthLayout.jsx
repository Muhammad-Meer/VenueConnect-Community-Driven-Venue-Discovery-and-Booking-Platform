import { Outlet, Link } from 'react-router-dom';
import Logo from '../components/common/Logo';

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-brand-700 lg:flex lg:flex-col lg:justify-between p-10 text-white">
        <Logo className="text-white [&_span:last-child]:text-white" to="/" />
        <div>
          <h1 className="max-w-md font-display text-4xl font-bold leading-tight">
            Book premium workspaces with confidence.
          </h1>
          <p className="mt-4 max-w-md text-brand-100">
            VenueHub connects teams with verified venues, transparent pricing, and seamless booking.
          </p>
        </div>
        <p className="text-sm text-brand-100">Trusted by hybrid teams worldwide.</p>
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-500/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-brand-400/20 blur-3xl" />
      </div>
      <div className="flex flex-col justify-center px-6 py-10 sm:px-10">
        <div className="mb-8 lg:hidden">
          <Logo to="/" />
        </div>
        <div className="mx-auto w-full max-w-md">
          <Outlet />
          <p className="mt-8 text-center text-sm text-content-muted">
            <Link to="/" className="text-brand-600 hover:underline">
              Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

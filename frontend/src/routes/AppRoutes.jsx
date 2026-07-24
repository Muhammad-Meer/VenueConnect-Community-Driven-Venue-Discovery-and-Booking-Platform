import { Navigate, Route, Routes } from 'react-router-dom';
import { ROLES } from '@/constants/roles';
import { ROUTES } from '@/constants/routes';

import MainLayout from '@/layouts/MainLayout';
import AuthLayout from '@/layouts/AuthLayout';
import DashboardLayout from '@/layouts/DashboardLayout';

import ProtectedRoute from '@/routes/ProtectedRoute';
import GuestRoute from '@/routes/GuestRoute';

import Home from '@/pages/public/Home';
import Search from '@/pages/public/Search';
import VenueDetails from '@/pages/public/VenueDetails';

import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import EmailConfirmation from '@/pages/auth/EmailConfirmation';

import CustomerDashboard from '@/pages/customer/Dashboard';
import Bookings from '@/pages/customer/Bookings';
import Checkout from '@/pages/customer/Checkout';
import BookingSuccess from '@/pages/customer/BookingSuccess';
import Favorites from '@/pages/customer/Favorites';
import Team from '@/pages/customer/Team';
import Messages from '@/pages/customer/Messages';
import Notifications from '@/pages/customer/Notifications';
import Profile from '@/pages/customer/Profile';

import OwnerDashboard from '@/pages/owner/Dashboard';
import OwnerVenues from '@/pages/owner/Venues';
import VenueForm from '@/pages/owner/VenueForm';
import OwnerBookings from '@/pages/owner/Bookings';
import OwnerRequests from '@/pages/owner/Requests';
import OwnerSeats from '@/pages/owner/Seats';
import OwnerRevenue from '@/pages/owner/Revenue';
import OwnerCustomers from '@/pages/owner/Customers';
import OwnerMessages from '@/pages/owner/Messages';
import OwnerSettings from '@/pages/owner/Settings';

import AdminDashboard from '@/pages/admin/Dashboard';
import AdminUsers from '@/pages/admin/Users';
import AdminVenues from '@/pages/admin/Venues';
import AdminVerification from '@/pages/admin/Verification';
import AdminReviews from '@/pages/admin/Reviews';
import AdminReports from '@/pages/admin/Reports';
import AdminAnalytics from '@/pages/admin/Analytics';
import AdminSettings from '@/pages/admin/Settings';

import NotFound from '@/pages/system/NotFound';
import Unauthorized from '@/pages/system/Unauthorized';

function CustomerLayout() {
  return <DashboardLayout basePath={ROUTES.CUSTOMER.ROOT} />;
}

function OwnerLayout() {
  return <DashboardLayout basePath={ROUTES.OWNER.ROOT} />;
}

function AdminLayout() {
  return <DashboardLayout basePath={ROUTES.ADMIN.ROOT} />;
}

/**
 * Application route tree.
 * - Public marketing/search pages
 * - Guest-only auth pages
 * - Role-protected customer / owner / admin areas
 * - Unauthorized + global 404
 */
export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="venues/:id" element={<VenueDetails />} />
        <Route path="email-confirmation" element={<EmailConfirmation />} />
        <Route path="unauthorized" element={<Unauthorized />} />
      </Route>

      {/* Guest-only auth */}
      <Route element={<GuestRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>
      </Route>

      {/* Customer (authenticated) */}
      <Route
        element={
          <ProtectedRoute roles={[ROLES.CUSTOMER, ROLES.OWNER, ROLES.ADMIN]} />
        }
      >
        <Route path="app" element={<CustomerLayout />}>
          <Route index element={<CustomerDashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookings/checkout" element={<Checkout />} />
          <Route path="bookings/success" element={<BookingSuccess />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="team" element={<Team />} />
          <Route path="messages" element={<Messages />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      {/* Owner */}
      <Route element={<ProtectedRoute roles={[ROLES.OWNER]} />}>
        <Route path="owner" element={<OwnerLayout />}>
          <Route index element={<OwnerDashboard />} />
          <Route path="venues" element={<OwnerVenues />} />
          <Route path="venues/new" element={<VenueForm />} />
          <Route path="venues/:id/edit" element={<VenueForm />} />
          <Route path="bookings" element={<OwnerBookings />} />
          <Route path="requests" element={<OwnerRequests />} />
          <Route path="seats" element={<OwnerSeats />} />
          <Route path="revenue" element={<OwnerRevenue />} />
          <Route path="customers" element={<OwnerCustomers />} />
          <Route path="messages" element={<OwnerMessages />} />
          <Route path="settings" element={<OwnerSettings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      {/* Admin */}
      <Route element={<ProtectedRoute roles={[ROLES.ADMIN]} />}>
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="venues" element={<AdminVenues />} />
          <Route path="verification" element={<AdminVerification />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="reports" element={<AdminReports />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>

      {/* Legacy redirect */}
      <Route path="dashboard" element={<Navigate to={ROUTES.CUSTOMER.ROOT} replace />} />

      {/* Global 404 */}
      <Route path="*" element={<MainLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

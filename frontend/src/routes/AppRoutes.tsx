import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Home from '@/pages/Home'
import Search from '@/pages/Search'
import VenueDetails from '@/pages/VenueDetails'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Profile from '@/pages/Profile'
import MyBookings from '@/pages/MyBookings'
import OwnerDashboard from '@/pages/OwnerDashboard'
import MyVenues from '@/pages/MyVenues'
import AddVenue from '@/pages/AddVenue'
import EditVenue from '@/pages/EditVenue'
import AdminDashboard from '@/pages/AdminDashboard'
import Users from '@/pages/Users'
import Reports from '@/pages/Reports'
import NotFound from '@/pages/NotFound'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/venues/:id" element={<VenueDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/owner" element={<OwnerDashboard />} />
          <Route path="/owner/venues" element={<MyVenues />} />
          <Route path="/owner/venues/new" element={<AddVenue />} />
          <Route path="/owner/venues/:id/edit" element={<EditVenue />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<Users />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}

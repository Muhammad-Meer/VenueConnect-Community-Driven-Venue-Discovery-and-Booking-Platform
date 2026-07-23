import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import ForgotPassword from '../pages/Auth/ForgotPassword'
import VenueList from '../pages/Venues/VenueList'
import VenueDetail from '../pages/Venues/VenueDetail'
import Search from '../pages/Venues/Search'
import BookingPage from '../pages/Booking/BookingPage'
import Checkout from '../pages/Booking/Checkout'
import Success from '../pages/Booking/Success'
import NotFound from '../pages/NotFound'
import DesignSystem from '../pages/DesignSystem/DesignSystem'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/design-system" element={<DesignSystem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/venues" element={<VenueList />} />
        <Route path="/venues/:id" element={<VenueDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes

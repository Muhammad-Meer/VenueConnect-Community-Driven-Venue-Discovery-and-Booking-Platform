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

function AppRoutes() {
  return (
    <div>
      {/* Wire up react-router routes here */}
      <Home />
    </div>
  )
}

export default AppRoutes

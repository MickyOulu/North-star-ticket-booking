import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Theatre from "./pages/Theatre";
import Events from "./pages/Events";
import SeatSelection from "./pages/SeatSelection";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminStaff from "./pages/AdminStaff";
import AdminShows from "./pages/AdminShows";
import CustomerLogin from "./pages/CustomerLogin";
import MyBookings from "./pages/MyBookings";
import CustomerRegister from "./pages/CustomerRegister";







function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/theatre" element={<Theatre />} />
      <Route path="/events" element={<Events />} />
      <Route path="/movie/:id/seats" element={<SeatSelection />} />
      <Route path="/payment" element={<Payment />} />
      <Route path="/ticket" element={<Ticket />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/staff" element={<AdminStaff />} />
      <Route path="/admin/shows" element={<AdminShows />} />
      <Route path="/login" element={<CustomerLogin />} />
<Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/register" element={<CustomerRegister />} /> 




     

    </Routes>
  );
}

export default App;

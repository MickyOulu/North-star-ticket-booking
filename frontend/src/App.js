import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Theatre from "./pages/Theatre";
import Events from "./pages/Events";
import SeatSelection from "./pages/SeatSelection";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie/:id" element={<MovieDetails />} />
      <Route path="/theatre" element={<Theatre />} />
      <Route path="/events" element={<Events />} />
      <Route path="/movie/:id/seats" element={<SeatSelection />} />
     

    </Routes>
  );
}

export default App;

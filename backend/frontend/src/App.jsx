import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import Itinerary from "./pages/Itinerary";
// import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/my-itineraries" element={<ItineraryList />} />
        <Route path="/my-itinerary" element={<Itinerary />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
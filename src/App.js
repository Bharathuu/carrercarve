import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MentorList from './components/MentorList';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<BookingForm />} />
          <Route path="/mentors" element={<MentorList />} />
          <Route path="/confirmation" element={<BookingConfirmation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

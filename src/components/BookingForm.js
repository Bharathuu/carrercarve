import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BookingForm() {
  const [name, setName] = useState('');
  const [availability, setAvailability] = useState('');
  const [areaOfInterest, setAreaOfInterest] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save student data or fetch mentors
    navigate(`/mentors?interest=${areaOfInterest}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Availability:</label>
        <input type="text" value={availability} onChange={(e) => setAvailability(e.target.value)} required />
      </div>
      <div>
        <label>Area of Interest:</label>
        <input type="text" value={areaOfInterest} onChange={(e) => setAreaOfInterest(e.target.value)} required />
      </div>
      <button type="submit">Find Mentors</button>
    </form>
  );
}

export default BookingForm;

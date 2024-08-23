import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MentorList() {
  const [mentors, setMentors] = useState([]);
  const [searchParams] = useSearchParams();
  const interest = searchParams.get('interest');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/mentors?area_of_interest=${interest}`)
      .then(response => {
        setMentors(response.data);
      })
      .catch(error => console.error(error));
  }, [interest]);

  const handleBooking = (mentorId) => {
    const studentId = 1;  // Replace with actual student ID from your state
    const scheduledTime = "2023-08-22 10:00:00";  // Example time, replace with actual selection
    const status = "confirmed";

    axios.post('http://localhost:3001/bookings', {
      student_id: studentId,
      mentor_id: mentorId,
      scheduled_time: scheduledTime,
      status: status
    })
    .then(response => {
      navigate('/confirmation');
    })
    .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Available Mentors</h2>
      <ul>
        {mentors.map(mentor => (
          <li key={mentor.id}>
            {mentor.name} - {mentor.areas_of_expertise}
            <button onClick={() => handleBooking(mentor.id)}>Book Session</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MentorList;

// src/components/Event.jsx
import React, { useState } from 'react';

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li>
      <h3>{event.title}</h3>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'Hide Details' : 'Show Details'}
      </button>
      {showDetails && (
        <div className="event-details">
          <p><strong>Location:</strong> {event.location}</p>
          {event.description && <p>{event.description}</p>}
          <a href={event.htmlLink} target="_blank" rel="noopener noreferrer">
            View on Google Calendar
          </a>
        </div>
      )}
    </li>
  );
};

export default Event;

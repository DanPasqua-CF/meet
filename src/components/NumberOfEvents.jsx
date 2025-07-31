import React, { useState } from "react";

const NumberOfEvents = ({ numberOfEvents, setNumberOfEvents, setErrorAlert }) => {
  const [number, setNumber] = useState(numberOfEvents);
  
  const handleInputChanged = (event) => {
    const value = event.target.value;
    setNumber(value);

    if (isNaN(value) || value <= 0 || value > 32) {
      setErrorAlert("Enter a valid number between 1 and 32")
    }
    else {
      setErrorAlert("");
      setNumberOfEvents(value);
    }
  }

  return (
    <div id="number-of-events">
      <label>Number of Events:
        <input
          type="text"
          value={number}
          onChange={handleInputChanged}
          data-testid="numberOfEventsInput"
        />
      </label>
    </div>
  );
};

export default NumberOfEvents;

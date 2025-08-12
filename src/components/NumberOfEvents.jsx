import React, { useState } from "react";

const NumberOfEvents = ({ numberOfEvents, setNumberOfEvents, setErrorAlert }) => {
  const [number, setNumber] = useState(numberOfEvents);
  
  const handleInputChanged = (event) => {
  const value = event.target.value;
  setNumber(value);

  const parsedValue = parseInt(value, 10);

  if (isNaN(parsedValue) || parsedValue <= 0 || parsedValue > 32) {
    setErrorAlert("Enter a valid number between 1 and 32");
  } else {
    setErrorAlert("");
    setNumberOfEvents(parsedValue);
  }
};

  return (
    <div id="number-of-events">
      <label>Number of Events:
        <input
          type="number"
          value={number}
          onChange={handleInputChanged}
          data-testid="numberOfEventsInput"
        />
      </label>
    </div>
  );
};

export default NumberOfEvents;

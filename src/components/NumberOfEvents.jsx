import React, { useEffect, useState } from "react";

const NumberOfEvents = ({ numberOfEvents = 32, setNumberOfEvents, setErrorAlert }) => {
  const [number, setNumber] = useState(numberOfEvents);

  useEffect(() => {
    setNumber(numberOfEvents);
  }, [numberOfEvents]);
  
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
          id="numberOfEventsInput"
          type="number"
          value={number || ''}
          onChange={handleInputChanged}
          data-testid="numberOfEventsInput"
          role="spinbutton"
          min="1"
          max="32"
        />
      </label>
    </div>
  );
};

export default NumberOfEvents;

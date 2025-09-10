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
    <div id="number-of-events" className="input-group">
      <div className="input-row">
        <label htmlFor="numberOfEventsInput">Number of Events:</label>
        <input
          id="numberOfEventsInput"
          type="number"
          className="input-field"
          value={number || ''}
          onChange={handleInputChanged}
          data-testid="numberOfEventsInput"
          role="spinbutton"
          min="1"
          max="32"
        />
      </div>
    </div>
  );
};

export default NumberOfEvents;

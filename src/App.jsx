import React from 'react';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import './App.css';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { InfoAlert, ErrorAlert } from './components/Alert';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNumberOfEvents, setCurrentNumberOfEvents] = useState(17);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

  useEffect(() => {
    fetchData();
  }, [currentCity, currentNumberOfEvents]);

  const fetchData = async () => {
    const allEvents = await getEvents() || [];
    const filteredEvents = currentCity === 'See all cities' ? allEvents : allEvents.filter((event) => event.location === currentCity);
    
    setEvents(filteredEvents.slice(0, currentNumberOfEvents));
    setAllLocations(extractLocations(allEvents));
  };

  return (
    <div className="App">
      <div className="alerts-container">
        {infoAlert && <InfoAlert text={infoAlert} />}
        {errorAlert && <ErrorAlert text={errorAlert} />}
      </div>

      <div className="form-row">
        <CitySearch 
          allLocations={allLocations} 
          setCurrentCity={setCurrentCity}
          setInfoAlert={setInfoAlert}
        />
        <NumberOfEvents
          numberOfEvents={currentNumberOfEvents} 
          setNumberOfEvents={setCurrentNumberOfEvents} 
          setErrorAlert={setErrorAlert} 
        />
      </div>

      <EventList events={events} />
    </div>
  );
};

export default App;

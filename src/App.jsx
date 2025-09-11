import React from 'react';
import { useEffect, useState } from 'react';
import { extractLocations, getEvents } from './api';
import './App.css';
import CityEventsChart from './components/CityEventsChart';
import CitySearch from './components/CitySearch';
import EventGenresChart from './components/EventGenresChart';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNumberOfEvents, setCurrentNumberOfEvents] = useState(17);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert("");
    }
    else {
      setWarningAlert("You are using the Meet application offline");
    }

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
        {infoAlert.length ? <InfoAlert text={infoAlert} /> : null}
        {errorAlert.length ? <ErrorAlert text={errorAlert} /> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert} /> : null}
      </div>
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
      <div className="charts-container">
        <div className="chart">
          <EventGenresChart events={events} />
        </div>
        <div className="chart">
          <CityEventsChart allLocations={allLocations} events={events} />
        </div>
      </div>
      <EventList events={events} />
    </div>
  );
};

export default App;

import React from 'react';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';
import mockData from '../mock-data';
jest.mock('../api');


describe('<App /> component', () => {
  let AppDOM;
  
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  });

  test('renders list of events', () => {
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render NumberOfEvents', () => {
    expect(AppDOM.querySelector('#number-of-events')).toBeInTheDocument();
  });
});

describe('<App /> integration', () => {
  beforeEach(() => {
    getEvents.mockResolvedValue(mockData);
  });

  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');

    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);

    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');  

    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );

    expect(allRenderedEventItems.length).toBe(berlinEvents.length);
  });

  test('renders the number of events specified by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    // Wait for events to render
    await waitFor(() => {
      const eventList = AppDOM.querySelector('#event-list');
      expect(eventList).toBeInTheDocument();
    });

    const NumberOfEventsDOM = AppDOM.querySelector('#number-of-events');
    const input = within(NumberOfEventsDOM).getByTestId('numberOfEventsInput');

    // Change the number of events to 5
    await user.clear(input);
    await user.type(input, '5');

    // Mock again since App refetches events on number change
    getEvents.mockResolvedValueOnce(mockData);

    // Wait for the correct number of events to appear
    await waitFor(() => {
      const eventList = AppDOM.querySelector('#event-list');
      const renderedEvents = within(eventList).getAllByRole('listitem');
      expect(renderedEvents.length).toBe(5);
    });
  });
});

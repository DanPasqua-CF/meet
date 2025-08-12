import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('User should be able to specify the number of events that are displayed', ({ given, when, then }) => {
    let AppComponent;
    let EventListItems;
    given('user wanted to see a specific number of events;', () => {
      AppComponent = render(<App />);
    });

    when('the user types a number in the Number of Events text field;', async () => {
      const numberOfEventsInput = screen.getByRole('spinbutton');
      await userEvent.type(numberOfEventsInput, '{backspace}{backspace}5');
    });

    then('the specified number of events will be returned.', async () => {
      await waitFor(() => {
        const eventItems = screen.getAllByRole('listitem');
        expect(eventItems.length).toBe(5);
      });
    });
  });
});

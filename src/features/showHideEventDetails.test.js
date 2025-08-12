import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const feature = loadFeature('./src/features/showHideEventDetails.feature');

defineFeature(feature, test => {
  test('User should be able to see event details', ({ given, when, then }) => {
    let AppComponent;
    let EventListItems;

    given('user wanted to see the selected event details', () => {
      AppComponent = render(<App />);
    });

    when('the user clicks on the Show Details button;', async () => {
      const user = userEvent.setup();
      const EventListDOM = AppComponent.container.querySelector('#event-list');

      // Wait for list items to render
      await waitFor(() => {
        EventListItems = within(EventListDOM).getAllByRole('listitem');
      });

      const detailsButton = within(EventListItems[0]).getByText('show details');
      await user.click(detailsButton);
    });

    then('the details for the selected event will be displayed.', async () => {
      await waitFor(() => {
        const details = EventListItems[0].querySelector('.details');
        expect(details).toBeInTheDocument();
      });
    });
  });

  test('User should be able to hide event details', ({ given, when, then }) => {
    let AppComponent;
    let EventListItems;
    let detailsButton;

    given('user didn\'t want to see the selected event details', async () => {
      AppComponent = render(<App />);
      const user = userEvent.setup();
      const EventListDOM = AppComponent.container.querySelector('#event-list');

      await waitFor(() => {
        EventListItems = within(EventListDOM).getAllByRole('listitem');
      });

      detailsButton = within(EventListItems[0]).getByText('show details');
      await user.click(detailsButton);

      await waitFor(() => {
        expect(EventListItems[0].querySelector('.details')).toBeInTheDocument();
      });
    });

    when('the user clicks on the Hide Details button;', async () => {
      const user = userEvent.setup();
      const hideButton = within(EventListItems[0]).getByText('hide details');
      await user.click(hideButton);
    });

    then('the details for the selected event will not be displayed.', async () => {
      await waitFor(() => {
        expect(EventListItems[0].querySelector('.details')).not.toBeInTheDocument();
      });
    });
  });
});

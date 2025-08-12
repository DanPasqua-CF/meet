import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { getEvents } from '../api';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('User should be able to specify the number of events that are displayed', ({ given, when, then }) => {
    given('user wanted to see a specific number of events;', () => {

    });

    when('the user types a number in the Number of Events text field;', () => {

    });

    then('the specified number of events will be returned.', () => {

    });
  });
});

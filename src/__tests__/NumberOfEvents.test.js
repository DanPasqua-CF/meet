import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;

  beforeEach(() => {
    NumberOfEventsComponent = render(
      <NumberOfEvents
        numberOfEvents={32}
        setNumberOfEvents={() => {}}
        setErrorAlert={() => {}}
      />
    );
  });

  test('component contains textbox', () => {
    const input = NumberOfEventsComponent.queryByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  test('renders input with default value of 32', () => {
    const input = NumberOfEventsComponent.queryByRole("textbox");
    expect(input).toHaveValue("32");
  });

  test('updates input value when user types a valid number', async () => {
    const input = NumberOfEventsComponent.getByTestId("numberOfEventsInput");
    const user = userEvent.setup();

    await user.type(input, '{backspace}{backspace}10');

    expect(input).toHaveValue("10");
  });
});

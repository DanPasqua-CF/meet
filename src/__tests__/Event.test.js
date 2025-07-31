// src/__tests__/Event.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";
import mockData from "../mock-data";

describe("<Event /> component", () => {
  let event;
  let getByText, queryByText, getByRole;

  beforeEach(() => {
    event = { ...mockData[0], title: mockData[0].summary };
    ({ getByText, queryByText, getByRole } = render(<Event event={event} />));
  });

  test("renders the event title", () => {
    expect(getByText(event.title)).toBeInTheDocument();
  });

  test("renders the event location", async () => {
    render(<Event event={event} />);

    const showDetailsButton = screen.getAllByText(/show details/i)[0];
    await userEvent.click(showDetailsButton);

    expect(screen.getByText(/London, UK/i)).toBeInTheDocument();
  });

  test("renders the 'Show Details' button", () => {
    expect(screen.getAllByText(/show details/i)[0]).toBeInTheDocument();
  });

  test("hides details by default", () => {
    expect(queryByText(event.description)).not.toBeInTheDocument();
  });

  test("shows details when 'Show Details' is clicked", async () => {
    const { container, getAllByText } = render(<Event event={event} />);
    const user = userEvent.setup();

    const buttons = getAllByText(/show details/i);
    await user.click(buttons[0]); // pick the first one

    const details = await screen.findByText((content, element) => {
      return element.tagName.toLowerCase() === 'strong' && content.includes('Location:');
    });
    
    expect(details).toBeInTheDocument();
  });

  test("hides details again when 'Hide Details' is clicked", async () => {
    const user = userEvent.setup();
    await user.click(getByText("Show Details"));
    await user.click(getByText("Hide Details"));
    expect(queryByText(event.description)).not.toBeInTheDocument();
  });
});

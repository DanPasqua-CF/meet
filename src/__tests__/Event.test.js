// src/__tests__/Event.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Event from "../components/Event";
import mockData from "../mock-data";

describe("<Event /> component", () => {
  let event;

  beforeEach(() => {
    event = { ...mockData[0], title: mockData[0].summary };
    render(<Event event={event} />);
  });

  test("renders the event title", () => {
    expect(screen.getByText(event.title)).toBeInTheDocument();
  });

  test("renders the event location", () => {
    expect(screen.getByText(event.location)).toBeInTheDocument();
  });

  test("renders the 'Show Details' button", () => {
    expect(screen.getByRole("button", { name: /show details/i })).toBeInTheDocument();
  });

  test("hides details by default", () => {
    expect(screen.queryByText(/have you wondered how you can ask google/i)).not.toBeInTheDocument();
  });

  test("shows details when 'Show Details' is clicked", async () => {
    const user = userEvent.setup();
    const showDetailsBtn = screen.getByRole("button", { name: /show details/i });
    await user.click(showDetailsBtn);

    // Use a partial text match from the description
    expect(
      screen.getByText(/have you wondered how you can ask google/i)
    ).toBeInTheDocument();
  });

  test("hides details again when 'Hide Details' is clicked", async () => {
    const user = userEvent.setup();
    const showDetailsBtn = screen.getByRole("button", { name: /show details/i });
    await user.click(showDetailsBtn);

    const hideDetailsBtn = screen.getByRole("button", { name: /hide details/i });
    await user.click(hideDetailsBtn);

    expect(screen.queryByText(/have you wondered how you can ask google/i)).not.toBeInTheDocument();
  });
});

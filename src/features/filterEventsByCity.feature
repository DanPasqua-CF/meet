Feature: Filter Events by City

  Scenario: When user hasn’t searched for a specific city, show upcoming events from all cities
    Given the user hasn’t searched for any city;
    When the user opens the application;
    Then the user should see a list of upcoming events.

  Scenario: User should see a list of suggestions when they search for a city
    Given the main page is open;
    When user starts typing in the City textbox;
    Then the user should receive a list of cities (suggestions) that match what they’ve typed.

  Scenario: User should be able to select a city from the suggested list
    Given user was typing in the City textbox
    And the list of suggested cities is showing;
    When the user selects a city from the list;
    Then their city should be changed to that city
    And the user should receive a list of upcoming events in the selected city.

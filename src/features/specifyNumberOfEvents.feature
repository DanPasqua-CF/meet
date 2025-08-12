Feature: Specify Number of Events
  
  Scenario: User should be able to specify the number of events that are displayed
    Given user wanted to see a specific number of events;
    When the user types a number in the Number of Events text field;
    Then the specified number of events will be returned.

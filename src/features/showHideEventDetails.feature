Feature: Show/Hide Event Details

  Scenario: User should be able to see event details
    Given user wanted to see the selected event details
    When the user clicks on the Show Details button;
    Then the details for the selected event will be displayed.

  Scenario: User should be able to hide event details
    Given user didn't want to see the selected event details
    When the user clicks on the Hide Details button;
    Then the details for the selected event will not be displayed.

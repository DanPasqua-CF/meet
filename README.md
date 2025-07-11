# **Key application features**

## User stories

### 1. Filter Events by City  
**As a** user,  
**I should be able to** filter events by city  
**So that** I can easily find events happening in a specific location that interests me.  

```gherkin
Feature: Filter Events by City
  Scenario: When user hasn’t searched for a specific city, show upcoming events from all cities
    Given the user hasn’t searched for any city;
    When the user opens the application;
    Then the user should see a list of upcoming events.
```  

```gherkin
Feature: Filter Events by City
  Scenario: User should see a list of suggestions when they search for a city
    Given the main page is open;
    When user starts typing in the City textbox;
    Then the user should receive a list of cities (suggestions) that match what they’ve typed.
```

```gherkin
Feature: Filter Events by City
  Scenario: User should be able to select a city from the suggested list
    Given user was typing in the City textbox, and the list of suggested cities is showing;
    When the user selects a city from the list;
    Then their city should be changed to that city, and the user should receive a list of upcoming events in the selected city.
```

### 2. Show/Hide Event Details 
  
**As a** user,  
**I should be able to** show or hide event details  
**So that** I can view more or less information depending on my selection.

```gherkin
Feature: Show/Hide Event Details
  Scenario: User should be able to see event details
    Given user wanted to see the selected event details
    When the user clicks on the Show Details button;
    Then the details for the selected event will be displayed.
```

```gherkin
Feature: Show/Hide Event Details
  Scenario: User should be able to hide event details
    Given user didn't want to see the selected event details
    When the user clicks on the Hide Details button;
    Then the details for the selected event will not be displayed.
```
  

### 3. Specify Number of Events  
  
**As a** user,  
**I should be able to** specify the number of events to display  
**So that** I can control how much content is shown.

```gherkin
Feature: Specify Number of Events
  Scenario: User should be able to specify the number of events that are displayed
    Given user wanted to see a specific number of events;
    When the user types a number in the Number of Events text field;
    Then the specified number of events will be returned.
```


### 4. Use the App When Offline 
  
**As a** user,  
**I should be able to** use the app when offline  
**So that** I can view events without an internet connection.

```gherkin
Feature: Use the App When Offline
  Scenario: User should be able to successfully use the application when they're offline
    Give user wanted to use the application offline;
    When the user opens the application;
    Then the application will work as expected.
```

### 5. Add an App Shortcut to the Home Screen

**As a** user,  
**I should be able to** add an app shortcut to my device's home screen  
**So that** I can quickly open the app like a native application.

```gherkin
Feature: Add an App Shortcut to the Home Screen
  Scenario: User should be able to have a shortcut on their Home screen
    Given user wanted to quickly access the application;
    When the user is on their Home screen;
    Then the shortcut will be visible on their Home screen.
```

```gherkin
Feature: Add an App Shortcut to the Home Screen
  Scenario: User should be able to launch the application from the shortcut on their Home screen
    Given user wanted to launch their application from their Home screen;
    When the user clicks on the application shortcut;
    Then the application will successfully launch.
```

### 6. Display Charts Visualizing Event Details

**As a** user,  
**I should be able to** view charts that visualize event details  
**So that** I can better understand trends and summaries of events.

```gherkin
Feature: Display Charts Visualizing Event Details
  Scenario: User should be able to view a chart for event details
    Given user wanted a visualization of event details;
    When the user clicks on the View Chart button;
    Then the event details will be presented in a chart format.
```

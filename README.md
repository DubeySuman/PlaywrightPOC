# PlaywrightDemo

This project is a demonstration of using Playwright for end-to-end testing of a web application. It includes tests for login, ticket management, and timesheet functionalities.

Project Structure

PlaywrightDemo/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── pages/
│   ├── pyramidcore-login.js
│   ├── pyramidcore-home.js
│   ├── pyramidcore-assigntickets.js
│   ├── pyramidcore-timesheet.js
├── tests/
│   ├── ticket.spec.js
│   ├── timesheet.spec.js
├── testdata/
│   ├── loginCreds.json
│   ├── ticketData.json
│   ├── timesheetData.json
├── package.json
├── package-lock.json
└── README.md

Usage

Test Data
-----------

1. loginCreds.json: Contains login credentials.
2. ticketData.json: Contains data for creating tickets.
3. timesheetData.json: Contains data for filling timesheets.

Running Tests
-------------
To run the tests, use the following command:
>> npx playwright test





















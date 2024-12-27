import { test, expect } from '@playwright/test';
import { PyramidCoreLoginPage } from '../pages/pyramidcore-login';
import { PyramidCoreHomePage } from '../pages/pyramidcore-home';
import { PyramidCoreTicketPage } from '../pages/pyramidcore-assigntickets';

// Initialize variables
let page;
let pyramidCoreLoginPage;
let pyramidCoreHomePage;
let pyramidCoreTicketPage;

// Load test data
const loginCredentials = require('../testdata/logincreds.json');
const assignTicketData = require('../testdata/ticketFieldInputs.json');

test.describe('Ticket Page Tests', () => {

    // Setup before all tests
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        pyramidCoreLoginPage = new PyramidCoreLoginPage(page);
        pyramidCoreHomePage = new PyramidCoreHomePage(page);
        pyramidCoreTicketPage = new PyramidCoreTicketPage(page);
    });

    // Cleanup after all tests
    test.afterAll(async () => {
        await page.close();
    });

    // Test case to verify ticket page functionality
    test('Verify ticket page functionality', async () => {
        // Launch Application
        await pyramidCoreLoginPage.navigateToPyramidCore();

        // Validate URL of Application
        await expect(page).toHaveURL('https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx');

        // Perform login
        await pyramidCoreLoginPage.navigateToHomePage(loginCredentials.username, loginCredentials.password);

        // Validate Home Page is displayed with below fields
        await expect(pyramidCoreHomePage.topBarBanner).toBeVisiblse();
        await expect(pyramidCoreHomePage.dashboardText).toBeVisible();
        await expect(pyramidCoreHomePage.sideMenu).toBeVisible();
        await expect(pyramidCoreHomePage.changePasswordLink).toBeVisible();
        await expect(pyramidCoreHomePage.logoutLink).toBeVisible();

        // Navigate to Tickets Page
        await pyramidCoreHomePage.navigateToTicketsPage();

        // Validate Tickets Page is displayed
        await expect(pyramidCoreTicketPage.assignTicketHeading).toBeVisible();

        // Fill the details and create a ticket
        await pyramidCoreTicketPage.createTicket(
            ticketFieldInputs.masterProject,
            ticketFieldInputs.project,
            ticketFieldInputs.feature,
            ticketFieldInputs.ticketId,
            ticketFieldInputs.ticketDescription,
            ticketFieldInputs.complexity,
            ticketFieldInputs.priority,
            ticketFieldInputs.assignedUser,
            ticketFieldInputs.dueDateYear,
            ticketFieldInputs.dueDateMonth,
            ticketFieldInputs.dueDate
        );

        // Add assertions as needed to verify the functionality
        // Example: await expect(pyramidCoreTicketPage.someElement).toBeVisible();
    });
});
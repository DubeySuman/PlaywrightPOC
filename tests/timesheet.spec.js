import { test, expect } from '@playwright/test';
import { PyramidCoreLoginPage } from '../pages/pyramidcore-login';
import { PyramidCoreTimeSheetPage } from '../pages/pyramidcore-timesheet';
import { PyramidCoreHomePage } from '../pages/pyramidcore-home';

// Initialize variables
let page;
let pyramidCoreLoginPage;
let pyramidCoreTimeSheetPage;
let pyramidCoreHomePage;

// Load test data
const loginCredentials = require('../testdata/logincreds.json');
const timesheetTestData = require('../testdata/timeSheetData.json');

test.describe('Timesheet Page Tests', () => {

    // Setup before all tests
    test.beforeAll(async ({ browser }) => {
        const context = await browser.newContext();
        page = await context.newPage();
        pyramidCoreLoginPage = new PyramidCoreLoginPage(page);
        pyramidCoreHomePage = new PyramidCoreHomePage(page);
        pyramidCoreTimeSheetPage = new PyramidCoreTimeSheetPage(page);
    });

    // Cleanup after all tests
    test.afterAll(async () => {
        await page.close();
    });

    // Test case to verify timesheet page functionality
    test('Verify timesheet page functionality', async () => {
        // Launch Application
        await pyramidCoreLoginPage.navigateToPyramidCore();

        // Validate URL of Application
        await expect(page).toHaveURL('https://pyramidcore.pyramidci.com/security/PCILoginNew.aspx');

        // Perform login
        await pyramidCoreLoginPage.navigateToHomePage(loginCredentials.username, loginCredentials.password);

        // Validate Home Page is displayed with below fields
        await expect(pyramidCoreHomePage.topBarBanner).toBeVisible();
        await expect(pyramidCoreHomePage.dashboardText).toBeVisible();
        await expect(pyramidCoreHomePage.sideMenu).toBeVisible();
        await expect(pyramidCoreHomePage.changePasswordLink).toBeVisible();
        await expect(pyramidCoreHomePage.logoutLink).toBeVisible();

        // Navigate to Timesheet Page
        await pyramidCoreTimeSheetPage.navigateToTimeSheetPage();

        // Validate Timesheet Page is displayed with below fields
        await expect(pyramidCoreTimeSheetPage.projectHeader).toBeVisible();
        await expect(pyramidCoreTimeSheetPage.featureHeader).toBeVisible();
        await expect(pyramidCoreTimeSheetPage.ticketNumberHeader).toBeVisible();
        await expect(pyramidCoreTimeSheetPage.groupHeader).toBeVisible();
        await expect(pyramidCoreTimeSheetPage.activityHeader).toBeVisible();

        // Fill and save timesheet details
        await pyramidCoreTimeSheetPage.fillAndSaveTimeSheetDetails(
            timesheetTestData.group,
            timesheetTestData.activity
        );

        // Validate that the timesheet was saved successfully
        await expect(pyramidCoreTimeSheetPage.saveSuccessNotification).toBeVisible();
    });
});
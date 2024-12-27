export class PyramidCoreTimesheetPage {

    constructor(page) {
        // Reference to the page object
        this.browserPage = page;

        // Locators for Time Tracker Page components
        this.reusePreviousWeekCheckbox = page.locator('frame[name="main"]').contentFrame().locator('div').filter({ hasText: /^Copy from last week$/ });
        this.projectHeader = page.locator('frame[name="main"]').contentFrame().getByText('Project', { exact: true });
        this.featureHeader = page.locator('frame[name="main"]').contentFrame().getByText('Feature');
        this.ticketNumberHeader = page.locator('frame[name="main"]').contentFrame().getByText('Ticket No*');
        this.groupHeader = page.locator('frame[name="main"]').contentFrame().getByText('Group*');
        this.activityHeader = page.locator('frame[name="main"]').contentFrame().getByText('Activity*');

        // Navigation links
        this.timesheetNavigationLink = page.locator('frame[name="contents"]').contentFrame().getByRole('link', { name: 'Timesheet', exact: true });
        this.myTimesheetNavigationLink = page.locator('frame[name="contents"]').contentFrame().getByRole('link', { name: 'My Timesheet' });

        // Form elements
        this.ticketNumberInput = page.locator('frame[name="main"]').contentFrame().getByRole('textbox', { name: 'Click to view ticket options' });
        this.ticketPopupOption = page.locator('frame[name="main"]').contentFrame().locator('.ag-cell-value > div').first();
        this.groupDropdownSelector = page.locator('frame[name="main"]').contentFrame().locator('#selectedGroup').nth(2);
        this.activityDropdownSelector = page.locator('frame[name="main"]').contentFrame().locator('#selectedActivity').nth(2);

        // Time slot dropdowns for each weekday
        this.mondayHourDropdown = page.locator('frame[name="main"]').contentFrame().locator('div:nth-child(6) > .maincontnet1 > .ticketnumber > div > div > #selectedHour').first();
        this.tuesdayHourDropdown = page.locator('frame[name="main"]').contentFrame().locator('div:nth-child(6) > .maincontnet1 > .ticketnumber > div:nth-child(2) > div > #selectedHour');
        this.wednesdayHourDropdown = page.locator('frame[name="main"]').contentFrame().locator('div:nth-child(6) > .maincontnet1 > .ticketnumber > div:nth-child(3) > div > #selectedHour');
        this.thursdayHourDropdown = page.locator('frame[name="main"]').contentFrame().locator('div:nth-child(6) > .maincontnet1 > .ticketnumber > div:nth-child(4) > div > #selectedHour');
        this.fridayHourDropdown = page.locator('frame[name="main"]').contentFrame().locator('div:nth-child(6) > .maincontnet1 > .ticketnumber > div:nth-child(5) > div > #selectedHour');

        // Save and notification components
        this.submitButton = page.locator('frame[name="main"]').contentFrame().getByRole('button', { name: 'Save' });
        this.successNotificationPopup = page.locator('frame[name="main"]').contentFrame().locator('notifier-notification');
    }

    // Function to navigate to the Timesheet page
    async openTimeTrackerPage() {
        // Click on "Timesheet" link in the navigation menu
        await this.timesheetNavigationLink.click();

        // Click on "My Timesheet" link to access the page
        await this.myTimesheetNavigationLink.click();
    }

    // Function to fill and save timesheet details
    async populateAndSubmitTimesheet(groupValue, activityValue) {
        // Open the ticket number input field and select the first option from the ticket popup
        await this.ticketNumberInput.click();
        await this.ticketPopupOption.click();

        // Select values for "Group" and "Activity" from dropdowns
        await this.groupDropdownSelector.selectOption(groupValue);
        await this.activityDropdownSelector.selectOption(activityValue);

        // Populate hours for each weekday
        await this.mondayHourDropdown.selectOption('8');
        await this.tuesdayHourDropdown.selectOption('8');
        await this.wednesdayHourDropdown.selectOption('8');
        await this.thursdayHourDropdown.selectOption('8');
        await this.fridayHourDropdown.selectOption('8');

        // Click the "Save" button to submit the timesheet
        await this.submitButton.click();
    }
}

// Class representing the PyramidCore Ticket Page
export class PyramidCoreTicketPage {

    constructor(page) {
        this.page = page;

        // Locators for navigation links in the contents frame
        this.projectManagementLink = page.locator('frame[name="contents"]').contentFrame().getByRole('link', { name: 'Project Mgmt', exact: true });
        this.ticketsLink = page.locator('frame[name="contents"]').contentFrame().getByRole('link', { name: 'Tickets', exact: true });
        this.assignTicketsLink = page.locator('frame[name="contents"]').contentFrame().getByRole('link', { name: 'Assign' });

        // Locator for the main frame
        this.mainFrame = page.locator('frame[name="main"]');

        // Locators for elements within the main frame
        this.assignTicketHeading = this.mainFrame.contentFrame().locator('form#frmAssignedDetail').getByRole('cell', { name: 'Assign Ticket' });
        this.masterProjectSelect = this.mainFrame.contentFrame().locator('form#frmAssignedDetail').locator('select#ddlMasterProject');
        this.projectSelect = this.mainFrame.contentFrame().locator('form#frmAssignedDetail').locator('select#ddlProject');
        this.featureSelect = this.mainFrame.contentFrame().locator('form#frmAssignedDetail').locator('select#ddlFeatures');
        this.ticketIdInput = this.mainFrame.contentFrame().locator('form#frmAssignedDetail').locator('#txtTicketId');
        this.ticketDescriptionInput = this.mainFrame.contentFrame().locator('form#frmAssignedDetail').locator('#txtTicketDcpn');
        this.complexitySelect = this.mainFrame.contentFrame().locator('form#frmAssignedDetail').locator('select#ddlComplexity');
        this.prioritySelect = this.mainFrame.contentFrame().locator('form#frmAssignedDetail').locator('select#ddlPriority');
        this.assignedUserSelect = this.mainFrame.contentFrame().locator('form#frmAssignedDetail').locator('select#ddlAssigneduser');
        this.dueDateCalendarButton = this.mainFrame.contentFrame().locator('form#frmAssignedDetail').getByRole('img', { name: 'Select from date' });

        // Function to select a specific due date
        this.selectDueDate = (dateValue) => this.mainFrame.contentFrame().locator('form#frmAssignedDetail').getByRole('link', { name: dateValue }).click();

        // Locators for the due date year and month dropdowns
        this.dueYearSelect = this.mainFrame.contentFrame().locator('form#frmAssignedDetail').locator('#ui-datepicker-div').locator('select.ui-datepicker-year');
        this.dueMonthSelect = this.mainFrame.contentFrame().locator('form#frmAssignedDetail').locator('#ui-datepicker-div').locator('select.ui-datepicker-month');

        // Locator for the save button
        this.saveButton = this.mainFrame.contentFrame().locator('form#frmAssignedDetail').getByRole('button', { name: 'Save' });
    }

    // Method to navigate to the tickets page
    async navigateToTicketsPage() {
        await this.projectManagementLink.click();
        await this.ticketsLink.click();
        await this.assignTicketsLink.click();
    }

    // Method to create a ticket with the provided details
    async createTicket(masterProject, project, feature, ticketId, ticketDescription, complexity, priority, assignedUser, dueDateYear, dueDateMonth, dueDate) {
        // this.page.pause(); // Uncomment for debugging
        await this.masterProjectSelect.selectOption(masterProject);
        await this.projectSelect.selectOption(project);
        await this.featureSelect.selectOption(feature);
        await this.ticketIdInput.fill(ticketId);
        await this.ticketDescriptionInput.fill(ticketDescription);
        await this.complexitySelect.selectOption(complexity);
        await this.prioritySelect.selectOption(priority);
        await this.assignedUserSelect.selectOption(assignedUser);
        await this.dueDateCalendarButton.click();
        await this.dueYearSelect.selectOption(dueDateYear);
        await this.dueMonthSelect.selectOption(dueDateMonth);
        await this.selectDueDate(dueDate);
        await this.saveButton.click();
    }
}
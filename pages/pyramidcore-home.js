// Class representing the PyramidCore Home Page
export class PyramidCoreHomePage {

    constructor(page) {
        this.page = page;

        // Locators for elements on the home page
        this.topBarBanner = page.frameLocator('frame[name="top"]').locator('role=banner');
        this.dashboardText = page.frameLocator('frame[name="contents"]').locator('text=E-learning Dashboard Org');
        this.sideMenu = page.frameLocator('frame[name="main"]').locator('.slide');
        this.changePasswordLink = page.frameLocator('frame[name="top"]').locator('role=link[name="Change Password"]');
        this.logoutLink = page.frameLocator('frame[name="top"]').locator('role=link[name="Logout"]');
        
    }

    // Add methods to interact with the home page as needed
}
// Class representing the PyramidCore Login Page
export class PyramidCoreLoginPage {

    constructor(page) {
        this.page = page;

        // Locators for elements on the login page
        this.headingImage = page.locator('.logortbck');
        this.emailInput = page.getByPlaceholder('User Id / Official Email Id');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.locator('#pydLogin_btnLogin');
        this.ssoLoginButton = page.locator('#pydLogin_lnkBtnSSOLogin');
        this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot Password' });
    }

    // Method to navigate to the PyramidCore login page
    async navigateToPyramidCore() {
        await this.page.goto('https://pyramidcore.pyramidci.com/');
    }

    // Method to log in and navigate to the home page
    async navigateToHomePage(userId, password) {
        await this.emailInput.fill(userId);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
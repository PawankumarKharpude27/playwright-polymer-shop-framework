import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  // Selectors for login page
  private usernameInput = 'input#username';
  private passwordInput = 'input#password';
  private loginButton = 'button#submit';
  private successMessage = 'h1';
  private errorMessage = 'div#error';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to the login page
   */
  async navigateToLoginPage() {
    await this.open('');
    await this.page.goto('https://practicetestautomation.com/practice-test-login/');
    await this.verifyLoaded();
  }

  /**
   * Enter username in the username field
   */
  async enterUsername(username: string) {
    await this.page.fill(this.usernameInput, username);
  }

  /**
   * Enter password in the password field
   */
  async enterPassword(password: string) {
    await this.page.fill(this.passwordInput, password);
  }

  /**
   * Click the login button
   */
  async clickLoginButton() {
    await this.page.click(this.loginButton);
    await this.waits.waitForStableDom();
  }

  /**
   * Perform complete login with provided credentials
   */
  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Verify login was successful by checking for success message
   */
  async verifyLoginSuccess() {
    const successHeading = this.page.getByRole('heading', {
      name: 'Logged In Successfully',
    });
    await successHeading.waitFor({ state: 'visible', timeout: 10000 });
    return true;
  }

  /**
   * Verify login failed by checking for error message
   */
  async verifyLoginError() {
    const errorElement = await this.page.$(this.errorMessage);
    return errorElement !== null;
  }

  /**
   * Get the error message text
   */
  async getErrorMessage(): Promise<string | null> {
    return await this.page.textContent(this.errorMessage);
  }

  /**
   * Verify page title contains 'login'
   */
  async verifyPageTitle() {
    const title = await this.page.title();
    return title.toLowerCase().includes('login');
  }
}

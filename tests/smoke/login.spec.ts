import { test, expect } from '../../fixtures/base';

test.describe('Login Tests', () => {
  test.beforeEach(async ({ loginPage }) => {
    // Navigate to the login page before each test
    await loginPage.navigateToLoginPage();
  });

  test('should successfully login with valid credentials', async ({ loginPage }) => {
    // Arrange
    const validUsername = 'student';
    const validPassword = 'Password123';

    // Act
    await loginPage.login(validUsername, validPassword);

    // Assert
    const isLoginSuccessful = await loginPage.verifyLoginSuccess();
    expect(isLoginSuccessful).toBeTruthy();
  });

  test('should display success message after valid login', async ({ loginPage, page }) => {
    // Arrange
    const validUsername = 'student';
    const validPassword = 'Password123';

    // Act
    await loginPage.login(validUsername, validPassword);
    await page.getByRole('heading', { name: 'Logged In Successfully' }).waitFor();

    // Assert
    await expect(
      page.getByRole('heading', { name: 'Logged In Successfully' }),
    ).toBeVisible();
  });

  test('should display error message with invalid credentials', async ({ loginPage }) => {
    // Arrange
    const invalidUsername = 'invaliduser';
    const invalidPassword = 'wrongpassword';

    // Act
    await loginPage.login(invalidUsername, invalidPassword);

    // Assert
    const hasError = await loginPage.verifyLoginError();
    expect(hasError).toBeTruthy();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage).toBeTruthy();
  });

  test('should remain on login page with invalid username', async ({ loginPage, page }) => {
    // Arrange
    const invalidUsername = 'wronguser';
    const validPassword = 'Password123';

    // Act
    await loginPage.login(invalidUsername, validPassword);

    // Assert
    const pageTitle = await loginPage.verifyPageTitle();
    expect(pageTitle).toBeTruthy();
    
    const currentUrl = page.url();
    expect(currentUrl).toContain('practice-test-login');
  });

  test('should remain on login page with invalid password', async ({ loginPage, page }) => {
    // Arrange
    const validUsername = 'student';
    const invalidPassword = 'wrongpassword';

    // Act
    await loginPage.login(validUsername, invalidPassword);

    // Assert
    const pageTitle = await loginPage.verifyPageTitle();
    expect(pageTitle).toBeTruthy();
    
    const currentUrl = page.url();
    expect(currentUrl).toContain('practice-test-login');
  });

  test('should be able to login after failed attempt', async ({ loginPage }) => {
    // Arrange
    const invalidUsername = 'wronguser';
    const invalidPassword = 'wrongpassword';
    const validUsername = 'student';
    const validPassword = 'Password123';

    // Act - First attempt with invalid credentials
    await loginPage.login(invalidUsername, invalidPassword);
    const firstAttemptError = await loginPage.verifyLoginError();
    expect(firstAttemptError).toBeTruthy();

    // Clear and attempt again with valid credentials
    await loginPage.navigateToLoginPage();
    await loginPage.login(validUsername, validPassword);

    // Assert
    const isLoginSuccessful = await loginPage.verifyLoginSuccess();
    expect(isLoginSuccessful).toBeTruthy();
  });
});

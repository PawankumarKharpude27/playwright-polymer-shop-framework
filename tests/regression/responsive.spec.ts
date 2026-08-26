import { test, expect } from '../../fixtures/base';

test.describe('Regression suite', () => {
  test('supports mobile viewport navigation and preserves key navigation', async ({
    homePage,
    headerComponent,
    footerComponent,
  }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-chromium', 'Responsive regression runs on the mobile project.');
    await homePage.open();
    await homePage.verifyLoaded();
    await headerComponent.verifyVisible();
    await footerComponent.verifyVisible();

    await expect(homePage.page.locator('body')).toBeVisible();
    await expect(homePage.page.locator('shop-app')).toBeVisible();
    await expect(homePage.page.locator('shop-app').locator('shop-home')).toBeVisible();
  });
});

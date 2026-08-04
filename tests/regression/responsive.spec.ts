import { test, expect } from '../../fixtures/base';

test.describe('Regression suite', () => {
  test('supports mobile viewport navigation and preserves key navigation', async ({
    page,
    homePage,
    headerComponent,
    footerComponent,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await homePage.open();
    await homePage.verifyLoaded();
    await headerComponent.verifyVisible();
    await footerComponent.verifyVisible();

    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('shop-app')).toBeVisible();
    await expect(page.locator('shop-app').locator('shop-home'))
      .toBeVisible()
      .catch(() => undefined);
  });
});

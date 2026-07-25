import { test, expect } from '../fixtures/base';

test.describe('Polymer Shop smoke suite', () => {
  test('loads the home page and exposes the main navigation', async ({ homePage, headerComponent, footerComponent }) => {
    await homePage.open();
    await homePage.verifyLoaded();

    await headerComponent.verifyVisible();
    await footerComponent.verifyVisible();

    await expect(homePage.page).toHaveTitle(/SHOP/i);
  });
});

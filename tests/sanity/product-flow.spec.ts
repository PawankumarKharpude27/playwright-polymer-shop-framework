import { test, expect } from '../../fixtures/base';
import { ROUTES } from '../../constants/routes';

test.describe('Sanity suite', () => {
  test('adds a randomly selected product to cart from the category flow', async ({ homePage, headerComponent, categoryPage, productPage, cartPage }) => {
    await homePage.open();
    await homePage.verifyLoaded();

    const selectedCategory = await headerComponent.openRandomCategory();
    await categoryPage.verifyLoaded();
    await expect(categoryPage.heading).toContainText(new RegExp(selectedCategory.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
    await categoryPage.selectRandomProduct();

    await productPage.verifyLoaded();
    await productPage.selectPreferredSize('M');
    await productPage.selectQuantity('2');
    await productPage.addToCart();

    await expect(cartPage.cartBadge).toBeVisible();
    await expect(cartPage.cartBadge).toContainText(/2|1/);
    await expect(homePage.page).toHaveURL(new RegExp(`${ROUTES.detail.replace('/', '')}`));

    await cartPage.open();
    await cartPage.verifyLoaded();
    await cartPage.proceedToCheckoutIfSupported();
  });
});

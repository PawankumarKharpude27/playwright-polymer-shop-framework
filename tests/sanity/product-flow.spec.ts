import { test, expect } from '../../fixtures/base';
import { ROUTES } from '../../constants/routes';
import products from '../../data/products.json';

test.describe('Sanity suite', () => {
  test('adds the configured product to cart with the requested quantity', async ({
    homePage,
    headerComponent,
    categoryPage,
    productPage,
    cartPage,
  }) => {
    await homePage.open();
    await homePage.verifyLoaded();

    const selectedProduct = products.categories[0];
    await headerComponent.openCategory(selectedProduct.name);
    await categoryPage.verifyLoaded();
    await expect(categoryPage.heading).toHaveText(selectedProduct.name);
    await categoryPage.openProduct(selectedProduct.item.route);

    await productPage.verifyLoaded();
    await productPage.selectPreferredSize('M');
    await productPage.selectQuantity('2');
    await productPage.addToCart();

    await expect(cartPage.cartBadge).toHaveText('2');
    await expect(homePage.page).toHaveURL(new RegExp(`${ROUTES.detail.replace('/', '')}`));

    await cartPage.open();
    await cartPage.verifyLoaded();
    await expect(cartPage.cartBadge).toHaveText('2');
  });
});

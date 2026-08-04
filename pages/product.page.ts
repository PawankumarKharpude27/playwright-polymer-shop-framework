import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { SELECTORS } from '../constants/selectors';

export class ProductPage extends BasePage {
  readonly title: Locator;
  readonly price: Locator;
  readonly addToCartButton: Locator;
  readonly sizeSelect: Locator;
  readonly quantitySelect: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator(SELECTORS.productTitle);
    this.price = page.locator('.price');
    this.addToCartButton = page.locator(SELECTORS.addToCartButton);
    this.sizeSelect = page.locator(SELECTORS.sizeSelect);
    this.quantitySelect = page.locator(SELECTORS.quantitySelect);
  }

  async verifyLoaded() {
    await super.verifyLoaded();
    await this.addToCartButton.waitFor({ state: 'visible' });
  }

  async selectSize(size: string) {
    if (await this.sizeSelect.count()) {
      await this.sizeSelect.selectOption(size);
    }
    await this.waits.pauseForObservation();
  }

  async selectPreferredSize(preferredSize: string = 'M') {
    if (await this.sizeSelect.count()) {
      const availableSizes = await this.sizeSelect
        .locator('option')
        .evaluateAll((options) => options.map((option) => option.textContent?.trim() ?? ''));
      const normalizedSizes = availableSizes.filter(Boolean);
      const matchedSize =
        normalizedSizes.find((size) => size.toLowerCase() === preferredSize.toLowerCase()) ??
        normalizedSizes[0];
      if (matchedSize) {
        await this.selectSize(matchedSize);
      }
    }
  }

  async selectQuantity(quantity: string) {
    if (await this.quantitySelect.count()) {
      await this.quantitySelect.selectOption(quantity);
    }
    await this.waits.pauseForObservation();
  }

  async addToCart() {
    await this.addToCartButton.click();
    await this.waits.pauseForObservation();
  }
}

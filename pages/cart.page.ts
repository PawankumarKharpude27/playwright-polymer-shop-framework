import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { SELECTORS } from '../constants/selectors';

import { ROUTES } from '../constants/routes';

export class CartPage extends BasePage {
  readonly cartBadge: Locator;

  constructor(page: Page) {
    super(page);
    this.cartBadge = page.locator(SELECTORS.cartBadge);
  }

  async open() {
    await this.page.goto(ROUTES.cart);
    await this.waits.waitForStableDom();
  }

  async verifyLoaded() {
    await super.verifyLoaded();
    await this.cartBadge.waitFor({ state: 'visible' });
  }

  async getCartItemCount() {
    const text = await this.cartBadge.textContent();
    return Number(text?.trim() || '0');
  }

}

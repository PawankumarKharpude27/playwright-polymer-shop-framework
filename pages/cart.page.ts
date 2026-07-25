import { Locator, Page } from '@playwright/test';
import { BasePage } from './base.page';
import { SELECTORS } from '../constants/selectors';

import { ROUTES } from '../constants/routes';
import { environment } from '../config/environment';

export class CartPage extends BasePage {
  readonly cartBadge: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.cartBadge = page.locator(SELECTORS.cartBadge);
    this.checkoutButton = page.locator('a, button').filter({ hasText: /checkout/i });
  }

  async open() {
    await this.page.goto(`${environment.baseUrl}${ROUTES.cart}`);
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

  async proceedToCheckoutIfSupported() {
    const visibleCheckout = await this.checkoutButton.first().isVisible().catch(() => false);
    if (!visibleCheckout) {
      return false;
    }
    await this.checkoutButton.first().click();
    await this.waits.pauseForObservation();
    return true;
  }
}
